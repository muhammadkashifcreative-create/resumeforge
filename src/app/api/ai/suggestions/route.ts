import { NextResponse } from "next/server";
import { z } from "zod";
import { enforceAiLimit, runResumeAi } from "@/app/api/ai/utils";

const schema = z.object({
  sectionType: z.string().min(1),
  context: z.string().min(1),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const limit = await enforceAiLimit();
  if (!limit.allowed) return limit.response ?? NextResponse.json({ error: "AI request blocked." }, { status: 403 });

  const result = await runResumeAi(
    "You are an expert resume writer. Generate 5 strong, ATS-optimised bullet points using action verbs and quantified achievements. Return ONLY a JSON array of 5 strings, no other text.",
    `Section: ${parsed.data.sectionType}\nContext:\n${parsed.data.context}`,
  );

  try {
    const suggestions = z.array(z.string()).length(5).parse(JSON.parse(result.text));
    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ error: "AI returned an invalid response." }, { status: 502 });
  }
}
