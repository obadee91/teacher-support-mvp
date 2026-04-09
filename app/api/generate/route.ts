import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { concern, observations, teacherNotes, studentName, gradeLevel, subject } =
    await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "your_key_here") {
    return NextResponse.json(
      { error: "OpenAI API key not configured" },
      { status: 500 }
    );
  }

  const prompt = `You are an experienced education consultant helping a teacher with a classroom concern.

Concern type: ${concern}
Observations: ${observations.join(", ")}
${studentName ? `Student: ${studentName}` : ""}
${gradeLevel ? `Grade level: ${gradeLevel}` : ""}
${subject ? `Subject: ${subject}` : ""}
${teacherNotes ? `Teacher's additional notes: ${teacherNotes}` : ""}

Provide a JSON response with exactly these fields:
- "response": A warm, professional paragraph addressing the teacher's concern with specific, actionable advice.
- "strategies": An array of 3-5 concrete strategies the teacher can implement immediately.
- "followUp": A brief follow-up plan describing next steps and timeline for checking progress.

Respond ONLY with valid JSON.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json(
      { error: "OpenAI API error", details: err },
      { status: 500 }
    );
  }

  const data = await res.json();
  const content = data.choices[0].message.content;

  try {
    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(
      { error: "Failed to parse AI response" },
      { status: 500 }
    );
  }
}
