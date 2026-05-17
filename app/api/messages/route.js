import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/lib/mongoose'
import Message from '@/models/Message'
import Conversation from '@/models/Conversation'
import { pusherServer } from '@/lib/pusher'

// GET /api/messages?conversationId=xxx
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()
    const { searchParams } = new URL(req.url)
    const conversationId = searchParams.get('conversationId')
    const cursor = searchParams.get('cursor') // for pagination
    const limit = 40

    if (!conversationId) return NextResponse.json({ error: 'conversationId required' }, { status: 400 })

    // Verify user is participant
    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: session.user.id,
    })
    if (!conversation) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const query = { conversationId, deleted: false }
    if (cursor) query._id = { $lt: cursor }

    const messages = await Message.find(query)
      .populate('sender', 'name avatar email')
      .sort({ createdAt: -1 })
      .limit(limit + 1)

    const hasMore = messages.length > limit
    if (hasMore) messages.pop()

    return NextResponse.json({
      messages: messages.reverse(),
      hasMore,
      nextCursor: hasMore ? messages[0]._id : null,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// POST /api/messages — send a message
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()
    const { conversationId, content, type = 'text' } = await req.json()

    if (!conversationId || !content?.trim()) {
      return NextResponse.json({ error: 'conversationId and content required' }, { status: 400 })
    }

    // Verify user is participant
    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: session.user.id,
    })
    if (!conversation) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    // Create message
    const message = await Message.create({
      conversationId,
      sender: session.user.id,
      content: content.trim(),
      type,
      readBy: [{ user: session.user.id }],
    })

    const populated = await message.populate('sender', 'name avatar email')

    // Update conversation's lastMessage
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: message._id,
      lastMessageAt: message.createdAt,
    })

    // Trigger Pusher event on the conversation channel
    await pusherServer.trigger(
      `conversation-${conversationId}`,
      'new-message',
      {
        message: populated,
      }
    )

    // Also trigger sidebar update for all participants
    for (const participantId of conversation.participants) {
      await pusherServer.trigger(
        `user-${participantId}`,
        'conversation-updated',
        { conversationId }
      )
    }

    return NextResponse.json(populated, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
