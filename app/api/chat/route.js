// app/api/chat/route.js
import { createGroq } from '@ai-sdk/groq';
// Import 'generateText' instead of 'generateObject'
import { generateText } from 'ai'; 

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  const { messages, persona } = await req.json();

  const systemPrompt = persona === 'troll'
    ? "You are an internet troll. You use sarcasm and logical fallacies. Your output MUST be ONLY a JSON object with keys: 'reply', 'score', and 'reason'. Do not include any other text, markdown, or explanation."
    : "You are a rigid Professor. You use facts and data. Your output MUST be ONLY a JSON object with keys: 'reply', 'score', and 'reason'. Do not include any other text, markdown, or explanation.";

  // 1. Use generateText to get the raw JSON string
  const result = await generateText({
    model: groq('llama-3.3-70b-versatile'),
    system: systemPrompt + " IMPORTANT: Evaluate the user's last argument logic (0-100) and reply. Example: {\"reply\": \"Your argument is weak...\", \"score\": 25, \"reason\": \"Lack of evidence\"}",
    messages: messages,
  });

  // 2. Extract the raw JSON text
  const jsonString = result.text.trim();

  try {
    // 3. Manually parse the JSON string
    const data = JSON.parse(jsonString);
    
    // 4. Send the structured data back to frontend
    return Response.json(data);
  } catch (e) {
    // Log the raw text that failed to parse for debugging
    console.error("AI returned invalid JSON:", jsonString, e);
    // Return a 500 error to the client with a generic message
    return new Response(JSON.stringify({ error: "Failed to parse AI response. Try a simpler prompt." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}