import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function enforceAiLimit() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { allowed: false, response: NextResponse.json({ error: "Authentication required." }, { status: 401 }) };
  }

  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("ai_usage")
    .select("count")
    .eq("user_id", user.id)
    .eq("usage_date", today)
    .maybeSingle<{ count: number }>();

  if (error) {
    return { allowed: false, response: NextResponse.json({ error: "Unable to check AI usage." }, { status: 500 }) };
  }

  if ((data?.count ?? 0) >= 20) {
    return { allowed: false, response: NextResponse.json({ error: "Daily AI limit reached." }, { status: 429 }) };
  }

  const { error: upsertError } = await supabase.from("ai_usage").upsert(
    {
      user_id: user.id,
      usage_date: today,
      count: (data?.count ?? 0) + 1,
    },
    { onConflict: "user_id,usage_date" },
  );

  if (upsertError) {
    return { allowed: false, response: NextResponse.json({ error: "Unable to update AI usage." }, { status: 500 }) };
  }

  return { allowed: true, response: null };
}

export async function runResumeAi(system: string, prompt: string) {
  return generateText({
    model: openai("gpt-4o"),
    system,
    prompt,
  });
}
