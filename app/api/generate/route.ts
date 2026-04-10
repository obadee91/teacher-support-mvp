import { NextRequest, NextResponse } from "next/server";
import { generateSupportResponse } from "@/lib/openai";
import { GenerateRequest } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === "your_key_here") {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Add your key to .env.local." },
        { status: 500 }
      );
    }

    const result = await generateSupportResponse(body);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
