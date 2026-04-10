import OpenAI from "openai";
import { GenerateRequest, GenerateResponse } from "./types";

const SYSTEM_PROMPT =
  "You are an educational support assistant helping teachers respond to pupil needs in a practical, supportive, and non-clinical way. Do not diagnose. Provide concise, classroom-friendly strategies and example scripts teachers can use immediately. Always include a disclaimer that your suggestions are classroom support ideas, not clinical assessments.";

function buildUserPrompt(data: GenerateRequest): string {
  return `A teacher needs support for a pupil.
Concern: ${data.concern}
Observed behaviours: ${data.observations.join(", ")}
Teacher notes: ${data.teacherNotes || "None provided"}
Age group: ${data.ageGroup || "Not specified"}
Setting: ${data.setting || "Not specified"}
Frequency: ${data.frequency || "Not specified"}

Please provide your response in this exact JSON format:
{
  "interpretation": "string",
  "strategies": ["string"],
  "scripts": ["string"],
  "nextSteps": ["string"],
  "escalation": "string",
  "disclaimer": "string"
}`;
}

export function createOpenAIClient(): OpenAI {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function generateSupportResponse(
  data: GenerateRequest
): Promise<GenerateResponse> {
  const client = createOpenAIClient();

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(data) },
    ],
  });

  const content = completion.choices[0].message.content;
  if (!content) {
    throw new Error("No response content from OpenAI");
  }

  return JSON.parse(content) as GenerateResponse;
}
