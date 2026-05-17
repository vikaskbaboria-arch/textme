import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/lib/mongoose'
import Conversation from '@/models/Conversation'
import User from '@/models/User'

// GET /api/conversations — get all conversations for current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()

    const conversations = await Conversation.find({ participants: session.user.id })
      .populate('participants', 'name email avatar status lastSeen')
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

// POST /api/conversations — create or find existing direct conversation
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()
    const { participantId, type = 'direct', name } = await req.json()

    if (type === 'direct') {
      // Check if direct conversation already exists
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

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
