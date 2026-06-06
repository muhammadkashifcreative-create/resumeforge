import { NextResponse } from "next/server";
import { z } from "zod";
import { enforceAiLimit, runResumeAi } from "@/app/api/ai/utils";

const schema = z.object({
  text: z.string().min(1),
  type: z.string().min(1),
  tone: z.string().min(1),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const limit = await enforceAiLimit();
  if (!limit.allowed) return limit.response ?? NextResponse.json({ error: "AI request blocked." }, { status: 403 });

  const result = await runResumeAi(
    "You are an expert resume writer. Rewrite the provided text to be more impactful and professional. Return ONLY the rewritten text, nothing else.",
    `Type: ${parsed.data.type}\nTone: ${parsed.data.tone}\nText:\n${parsed.data.text}`,
  );

  return NextResponse.json({ text: result.text.trim() });
}
