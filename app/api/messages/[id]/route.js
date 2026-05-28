import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/lib/mongoose'
import Message from '@/models/Message'
import { pusherServer } from '@/lib/pusher'

const DELETE_WINDOW_MS = 5 * 60 * 1000 // 5 minutes

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()
    const message = await Message.findById(params.id)
    if (!message) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const senderId = message.sender?.toString()
    if (senderId !== session.user.id) {
      return NextResponse.json({ error: 'You can only delete your own messages' }, { status: 403 })
    }

    const age = Date.now() - new Date(message.createdAt).getTime()
    if (age > DELETE_WINDOW_MS) {
      return NextResponse.json(
        { error: 'Messages can only be deleted within 5 minutes of sending' },
        { status: 403 }
      )
    }

    message.deleted = true
    message.content = ''
    await message.save()

    await pusherServer.trigger(
      `conversation-${message.conversationId}`,
      'message-deleted',
      { messageId: message._id.toString() }
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
