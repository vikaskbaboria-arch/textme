import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/lib/mongoose'
import User from '@/models/User'

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()
    const { status } = await req.json()

    if (!['online', 'offline', 'away'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $set: { status, lastSeen: new Date() } },
      { new: true }
    ).select('name email avatar status lastSeen')

    return NextResponse.json(user)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
