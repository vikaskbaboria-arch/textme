import mongoose,{Schema} from "mongoose";
const CompatibilitySchema = new mongoose.Schema({
  conversationId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Conversation",
  unique: true,
},

  compatibilityScore: {
    type: Number,
    default: 0,
  },

  relationshipType: {
    type: String,
    enum: ["friendship", "romantic", "casual", "unknown"],
    default: "unknown",
  },

  mood: {
    type: String,
    default: "neutral",
  },

  engagementLevel: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },

  futurePrediction: {
    type: String,
    default: "",
  },

  aiSuggestions: [
    {
      type: String,
    },
  ],

  analytics: {
    positiveMessages: {
      type: Number,
      default: 0,
    },

    dryMessages: {
      type: Number,
      default: 0,
    },

    averageReplyTime: {
      type: Number,
      default: 0,
    },

    emojiUsage: {
      type: Number,
      default: 0,
    },
  },
},
{
  timestamps: true,
});

export default mongoose.models.Compatibility || mongoose.model("Compatibility", CompatibilitySchema);