import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/lib/mongoose'
import User from '@/models/User'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    await dbConnect()
    const user = await User.findById(session.user.id).select('-password')
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    return NextResponse.json(user)
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    await dbConnect()
    const { name, bio, avatar, status } = await req.json()
    const updates = {}
    if (name !== undefined && name.trim()) updates.name = name.trim()
    if (bio !== undefined) updates.bio = bio.slice(0, 160)
    if (avatar !== undefined) updates.avatar = avatar || null
    if (status !== undefined) updates.status = status
    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password')
    return NextResponse.json(user)
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
