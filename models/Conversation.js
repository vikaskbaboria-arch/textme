import mongoose from 'mongoose'

const ConversationSchema = new mongoose.Schema(
  {
    // For group conversations
    name: {
      type: String,
      trim: true,
      maxlength: [100, 'Conversation name cannot exceed 100 characters'],
      default: null,
    },
    // Direct message (2 users) or group (3+)
    type: {
      type: String,
      enum: ['direct', 'group'],
      default: 'direct',
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    // Last message for sidebar preview
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      default: null,
    },
    lastMessageAt: {
      type: Date,
      default: null,
    },
    // Group avatar (optional)
    avatar: {
      type: String,
      default: null,
    },
    // Admin for group conversations
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    settings: {
      onlyAdminCanMessage: { type: Boolean, default: false },
      encrypted: { type: Boolean, default: false },
      disappearingMessages: { type: Boolean, default: false },
      disappearAfterMs: { type: Number, default: null },
    },
    // Track unread counts per user
    unreadCounts: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        count: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

// Compound index: quickly find conversations by participant
ConversationSchema.index({ participants: 1, lastMessageAt: -1 })

export default mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema)
