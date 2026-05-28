import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/lib/mongoose'
import Conversation from '@/models/Conversation'
import Message from '@/models/Message'
import { pusherServer } from '@/lib/pusher'

// GET /api/conversations/[id] — get single conversation
export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()

    const conv = await Conversation.findOne({ _id: params.id, participants: session.user.id })
      .populate('participants', 'name email avatar status lastSeen')
      .populate('admin', 'name email avatar')

    if (!conv) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(conv)
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// PATCH /api/conversations/[id] — update group name/avatar, add/remove members, transfer admin
export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()

    const conv = await Conversation.findOne({ _id: params.id, participants: session.user.id })
    if (!conv) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (conv.type !== 'group') return NextResponse.json({ error: 'Not a group' }, { status: 400 })

    const isAdmin = conv.admin?.toString() === session.user.id
    const body = await req.json()
    const { action, userId, name, avatar, newAdminId, settings } = body

    let sysContent = null

    // ── Add member ──────────────────────────────────────────────────────────
    if (action === 'add_member') {
      if (!isAdmin) return NextResponse.json({ error: 'Admin only' }, { status: 403 })
      if (conv.participants.map(p => p.toString()).includes(userId)) {
        return NextResponse.json({ error: 'Already a member' }, { status: 400 })
      }
      conv.participants.push(userId)
      sysContent = `A new member was added to the group`
    }

    // ── Remove member ────────────────────────────────────────────────────────
    else if (action === 'remove_member') {
      if (!isAdmin && userId !== session.user.id) {
        return NextResponse.json({ error: 'Admin only' }, { status: 403 })
      }
      if (conv.admin?.toString() === userId) {
        return NextResponse.json({ error: 'Cannot remove admin. Transfer admin first.' }, { status: 400 })
      }
      conv.participants = conv.participants.filter(p => p.toString() !== userId)
      sysContent = userId === session.user.id
        ? `A member left the group`
        : `A member was removed from the group`
    }

    // ── Transfer admin ───────────────────────────────────────────────────────
    else if (action === 'transfer_admin') {
      if (!isAdmin) return NextResponse.json({ error: 'Admin only' }, { status: 403 })
      if (!conv.participants.map(p => p.toString()).includes(newAdminId)) {
        return NextResponse.json({ error: 'User is not a member' }, { status: 400 })
      }
      conv.admin = newAdminId
      sysContent = `Group admin was transferred`
    }

    // ── Update name / avatar ─────────────────────────────────────────────────
    else if (action === 'update_info') {
      if (!isAdmin) return NextResponse.json({ error: 'Admin only' }, { status: 403 })
      if (name?.trim()) { conv.name = name.trim(); sysContent = `Group was renamed to "${name.trim()}"` }
      if (avatar !== undefined) conv.avatar = avatar
    }

    else if (action === 'update_settings') {
      if (!isAdmin) return NextResponse.json({ error: 'Admin only' }, { status: 403 })
      conv.settings = {
        onlyAdminCanMessage: Boolean(settings?.onlyAdminCanMessage),
        encrypted: Boolean(settings?.encrypted),
        disappearingMessages: Boolean(settings?.disappearingMessages),
        disappearAfterMs: settings?.disappearAfterMs ?? null,
      }
      sysContent = 'Group settings were updated'
    }

    else {
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
    }

    await conv.save()

    // System message
    if (sysContent) {
      const sysMsg = await Message.create({
        conversationId: conv._id,
        sender: session.user.id,
        content: sysContent,
        type: 'system',
      })
      await Conversation.findByIdAndUpdate(conv._id, {
        lastMessage: sysMsg._id,
        lastMessageAt: sysMsg.createdAt,
      })

      // Broadcast to all participants
      await pusherServer.trigger(`conversation-${conv._id}`, 'new-message', { message: sysMsg })
    }

    // Notify all current participants of the change
    for (const pid of conv.participants) {
      await pusherServer.trigger(`user-${pid}`, 'conversation-updated', { conversationId: conv._id })
    }

    const updated = await Conversation.findById(conv._id)
      .populate('participants', 'name email avatar status lastSeen')
      .populate('admin', 'name email avatar')

    return NextResponse.json(updated)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// DELETE /api/conversations/[id] — admin deletes the group
export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()

    const conv = await Conversation.findOne({ _id: params.id })
    if (!conv) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (conv.admin?.toString() !== session.user.id) {
      return NextResponse.json({ error: 'Admin only' }, { status: 403 })
    }

    // Notify before deletion
    for (const pid of conv.participants) {
      await pusherServer.trigger(`user-${pid}`, 'conversation-deleted', { conversationId: conv._id })
    }

    await Message.deleteMany({ conversationId: conv._id })
    await Conversation.findByIdAndDelete(conv._id)

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
