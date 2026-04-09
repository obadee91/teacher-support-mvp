import { GenerateRequest, GenerateResponse } from "./types";

export async function generateSupportResponse(
  data: GenerateRequest
): Promise<GenerateResponse> {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to generate response");
  }

  return response.json();
}
