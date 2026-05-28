import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/lib/mongoose'
import Message from '@/models/Message'
import Conversation from '@/models/Conversation'
import SharedMessage from '@/models/SharedMessage'

// POST /api/share — create a share token for a message
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()
    const { messageId } = await req.json()
    if (!messageId) return NextResponse.json({ error: 'messageId required' }, { status: 400 })

    // Verify message exists and user is a participant
    const message = await Message.findById(messageId).populate('sender', 'name avatar')
    if (!message) return NextResponse.json({ error: 'Message not found' }, { status: 404 })

    const conv = await Conversation.findOne({
      _id: message.conversationId,
      participants: session.user.id,
    })
    if (!conv) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    // Reuse existing share token if already created for this message
    const existing = await SharedMessage.findOne({ messageId })
    if (existing) {
      return NextResponse.json({ token: existing.token, messageId })
    }

    // Create new share record
    const shared = await SharedMessage.create({
      messageId,
      sharedBy: session.user.id,
      senderName: message.sender?.name || 'Someone',
      content: message.content,
      type: message.type,
      mediaUrl: message.mediaUrl || null,
      mediaType: message.mediaType || null,
      createdAt: message.createdAt,
    })

    return NextResponse.json({ token: shared.token, messageId })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// GET /api/share?token=xxx — fetch shared message data (public, no auth)
export async function GET(req) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    if (!token) return NextResponse.json({ error: 'Token required' }, { status: 400 })

    const shared = await SharedMessage.findOne({ token })
    if (!shared) return NextResponse.json({ error: 'Not found or expired' }, { status: 404 })

    // Increment view count
    await SharedMessage.findByIdAndUpdate(shared._id, { $inc: { views: 1 } })

    return NextResponse.json({
      senderName: shared.senderName,
      content: shared.content,
      type: shared.type,
      mediaUrl: shared.mediaUrl,
      mediaType: shared.mediaType,
      createdAt: shared.createdAt,
      views: shared.views + 1,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
