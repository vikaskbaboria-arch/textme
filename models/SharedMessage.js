import mongoose from 'mongoose'
import crypto from 'crypto'

const SharedMessageSchema = new mongoose.Schema(
  {
    // Random URL-safe token
    token: {
      type: String,
      unique: true,
      default: () => crypto.randomBytes(10).toString('base64url'),
      index: true,
    },
    messageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      required: true,
    },
    sharedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Snapshot of the message at share time
    senderName: { type: String, default: 'Someone' },
    content:    { type: String, default: '' },
    type:       { type: String, enum: ['text', 'image', 'video'], default: 'text' },
    mediaUrl:   { type: String, default: null },
    mediaType:  { type: String, default: null },
    // Stats
    views: { type: Number, default: 0 },
    // Auto-expire after 30 days (optional — remove if you want permanent links)
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      index: { expireAfterSeconds: 0 },
    },
  },
  { timestamps: true }
)

export default mongoose.models.SharedMessage ||
  mongoose.model('SharedMessage', SharedMessageSchema)
