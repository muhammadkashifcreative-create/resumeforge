import { NextResponse } from "next/server";
import { z } from "zod";
import { enforceAiLimit, runResumeAi } from "@/app/api/ai/utils";

const schema = z.object({
  resumeText: z.string().min(1),
  jobDescription: z.string().min(1),
});

const responseSchema = z.object({
  score: z.number().min(0).max(100),
  present: z.array(z.string()),
  missing: z.array(z.string()),
  suggestions: z.array(z.string()),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const limit = await enforceAiLimit();
  if (!limit.allowed) return limit.response ?? NextResponse.json({ error: "AI request blocked." }, { status: 403 });

  const result = await runResumeAi(
    "Analyse this resume against the job description. Return ONLY a JSON object with: score (0-100), present (array of matched keywords), missing (array of important missing keywords), suggestions (array of improvement tips).",
    `Resume:\n${parsed.data.resumeText}\n\nJob description:\n${parsed.data.jobDescription}`,
  );

  try {
    return NextResponse.json(responseSchema.parse(JSON.parse(result.text)));
  } catch {
    return NextResponse.json({ error: "AI returned an invalid response." }, { status: 502 });
  }
}
