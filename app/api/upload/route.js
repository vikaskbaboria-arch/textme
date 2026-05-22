import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import cloudinary from '@/lib/cloudinary'

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData = await req.formData()
    const file = formData.get('file')
    const folder = formData.get('folder') || 'textme/media'

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const mimeType = file.type
    const dataURI = `data:${mimeType};base64,${base64}`

    const isVideo = mimeType.startsWith('video/')
    const resourceType = isVideo ? 'video' : 'image'

    const result = await cloudinary.uploader.upload(dataURI, {
      folder,
      resource_type: resourceType,
      ...(resourceType === 'image' && {
        transformation: [{ quality: 'auto', fetch_format: 'auto', width: 1200, crop: 'limit' }],
      }),
    })

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      resourceType,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      duration: result.duration || null,
    })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
