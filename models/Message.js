import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      default: '',
      maxlength: [4000, 'Message cannot exceed 4000 characters'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['text', 'image', 'video', 'file', 'system'],
      default: 'text',
    },
    // Media fields
    mediaUrl:      { type: String, default: null },
    mediaType:     { type: String, default: null },
    mediaWidth:    { type: Number, default: null },
    mediaHeight:   { type: Number, default: null },
    mediaDuration: { type: Number, default: null },
    readBy: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        readAt: { type: Date, default: Date.now },
      },
    ],
    edited:   { type: Boolean, default: false },
    editedAt: { type: Date, default: null },
    deleted:  { type: Boolean, default: false },
    replyTo:  { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null },
  },
  { timestamps: true }
)

MessageSchema.index({ conversationId: 1, createdAt: -1 })

export default mongoose.models.Message || mongoose.model('Message', MessageSchema)
