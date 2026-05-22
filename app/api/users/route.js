import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/mongoose'
import User from '@/models/User'

// POST /api/users/register
export async function POST(req) {
  try {
    await dbConnect()
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const trimmedName = String(name).trim()
    if (trimmedName.length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters' }, { status: 400 })
    }

    if (/\d/.test(trimmedName)) {
      return NextResponse.json({ error: 'Name cannot contain numbers' }, { status: 400 })
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 12)
    const user = await User.create({ name, email: email.toLowerCase(), password: hashed })

    return NextResponse.json(
      { id: user._id, name: user.name, email: user.email },
      { status: 201 }
    )
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// GET /api/users?search=query — search users by name or email
export async function GET(req) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('search') || ''

    if (!q || q.length < 2) return NextResponse.json([])

    const users = await User.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
      ],
    })
      .select('name email avatar status lastSeen')
      .limit(10)

    return NextResponse.json(users)
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
