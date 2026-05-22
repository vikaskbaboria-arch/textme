import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/lib/mongoose'
import Conversation from '@/models/Conversation'
import Message from '@/models/Message'
import { pusherServer } from '@/lib/pusher'

// GET /api/conversations — get all conversations for current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()

    const conversations = await Conversation.find({ participants: session.user.id })
      .populate('participants', 'name email avatar status lastSeen')
      .populate('admin', 'name email avatar')
      .populate({
        path: 'lastMessage',
        populate: { path: 'sender', select: 'name avatar' },
      })
      .sort({ lastMessageAt: -1 })

    return NextResponse.json(conversations)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// POST /api/conversations — create direct or group conversation
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()
    const { participantId, type = 'direct', name, participantIds, avatar } = await req.json()

    if (type === 'direct') {
      const existing = await Conversation.findOne({
        type: 'direct',
        participants: { $all: [session.user.id, participantId], $size: 2 },
      }).populate('participants', 'name email avatar status lastSeen')

      if (existing) return NextResponse.json(existing)

      const conversation = await Conversation.create({
        type: 'direct',
        participants: [session.user.id, participantId],
      })

      const populated = await conversation.populate('participants', 'name email avatar status lastSeen')
      return NextResponse.json(populated, { status: 201 })
    }

    if (type === 'group') {
      if (!name?.trim()) return NextResponse.json({ error: 'Group name is required' }, { status: 400 })
      if (!participantIds?.length) return NextResponse.json({ error: 'Add at least one member' }, { status: 400 })

      // Deduplicate and always include creator
      const allParticipants = [...new Set([session.user.id, ...participantIds])]

      const conversation = await Conversation.create({
        type: 'group',
        name: name.trim(),
        avatar: avatar || null,
        participants: allParticipants,
        admin: session.user.id,
      })

      const populated = await Conversation.findById(conversation._id)
        .populate('participants', 'name email avatar status lastSeen')
        .populate('admin', 'name email avatar')

      // System message: group created
      const sysMsg = await Message.create({
        conversationId: conversation._id,
        sender: session.user.id,
        content: `Group "${name.trim()}" was created`,
        type: 'system',
      })

      await Conversation.findByIdAndUpdate(conversation._id, {
        lastMessage: sysMsg._id,
        lastMessageAt: sysMsg.createdAt,
      })

      // Notify all members via Pusher
      for (const pid of allParticipants) {
        await pusherServer.trigger(`user-${pid}`, 'conversation-updated', { conversationId: conversation._id })
      }

      return NextResponse.json(populated, { status: 201 })
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
