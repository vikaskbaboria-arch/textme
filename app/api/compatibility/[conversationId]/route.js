// app/api/compatibility/[conversationId]/route.js

import { NextResponse } from "next/server";

import dbConnect from "@/lib/mongoose";
import Conversation from "@/models/Conversation";
import authOptions from "@/app/api/auth/[...nextauth]/route.js";
import Message from "@/models/Message";
import Compatibility from "@/models/Compatibility";
import { getServerSession } from "next-auth/next";
import  {analyzeChat}  from "@/lib/analyzeChat.js";

export async function GET(req, { params }) {

  try {

await dbConnect();

  const session = await getServerSession(authOptions);
  const { conversationId } = params;
  if(!conversationId){
    return NextResponse.json(
      {
        success: false,
        message: "Invalid conversation ID",
      },
      {
        status: 400,
      }
    );
  }
    // Fetch latest messages
    const messages = await Message.find({
      conversationId,
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    if (!messages.length) {
      return NextResponse.json({
        success: false,
        message: "No messages found",
      })
    }
  
  // console.log("Fetched Messages:", messages);
    // Reverse messages so AI reads naturally
    const orderedMessages = messages.reverse();

    // AI Analysis
    const aiResult = await analyzeChat(
      orderedMessages
    );
console.log("AI Analysis Result:", aiResult);
    // Save or update compatibility
 const senderId =
  orderedMessages[0].sender?._id ||
  orderedMessages[0].sender;

const UsersId = await Conversation.findById(
  conversationId
).select("participants");

const receiverId = UsersId.participants.find(
  (id) => id.toString() !== senderId.toString()
);
console.log("Sender ID:", senderId);
console.log("Receiver ID:", receiverId);
const compatibility =
  await Compatibility.findOneAndUpdate(

    {
      conversationId,
    },

    {
      $set: {

        compatibilityScore:
          aiResult.compatibilityScore,

        mood: aiResult.mood,

        relationshipType:
          aiResult.relationshipType,

        futurePrediction:
          aiResult.futurePrediction,

        engagementLevel:
          aiResult.engagementLevel,

        aiSuggestions: [
          aiResult.suggestedReply,
        ],

        analytics: {
          positivity:
            aiResult.analysis.positivity,

          dryness:
            aiResult.analysis.dryness,

          emotionalConnection:
            aiResult.analysis
              .emotionalConnection,
        },
      },
    },

    {
      upsert: true,
      new: true,
    }
  );
    return NextResponse.json({
      success: true,
      data: compatibility,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}