import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function analyzeChat(messages) {

  const formattedChat = messages
    .slice(-20)
    .map((msg) => `${msg.sender}: ${msg.content}`)
    .join("\n");
   console.log("Formatted Chat for AI:", formattedChat);
  //  console.log("Raw Messages for AI:", messages);
const prompt = `
You are an AI conversation analyzer.

Analyze this chat and return ONLY valid JSON.

Conversation:
${formattedChat}
JSON format:
{
  "mood": "",
  "compatibilityScore": 0,
  "relationshipType": "",
  "futurePrediction": "",
  "engagementLevel": "",
  "suggestedReply": "",
  "theme": "",
  "analysis": {
    "positivity": 0,
    "dryness": 0,
    "emotionalConnection": 0
  }
}
`

  try {

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.7,
      });

    const content =
      completion.choices[0].message.content;
     const cleanedContent = content
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();
  
    return JSON.parse(cleanedContent);

  } catch (error) {

    console.log(error);

    return {
      mood: "neutral",
      compatibilityScore: 50,
      relationshipType: "casual",
      futurePrediction:
        "Unable to analyze conversation.",
      engagementLevel: "medium",
      suggestedReply:
        "Tell me more 😄",
      theme: "default",
    };
  }
}