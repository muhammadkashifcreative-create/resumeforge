"use client";

import { useState } from "react";
import { ArrowRight, Mail, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function LoginClient({ returnTo }: { returnTo: string }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    setMessage("");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}${returnTo}` },
      });
      if (error) throw error;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to start Google sign-in.");
      setLoading(false);
    }
  };

  const signInWithEmail = async () => {
    setLoading(true);
    setMessage("");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}${returnTo}` },
      });
      if (error) throw error;
      setMessage("Check your email for a magic link.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to send magic link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="rf-mesh grid min-h-screen place-items-center px-5 py-10 text-white">
      <div className="w-full max-w-6xl">
        <Link className="rf-heading mb-10 inline-flex items-center gap-3 text-xl font-black" href="/">
          <span className="size-8 rotate-45 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-300 shadow-[0_0_28px_rgba(99,102,241,.45)]" />
          ResumeForge
        </Link>
        <section className="grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="mb-5 inline-flex rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-indigo-100">
              Password-free access
            </p>
            <h1 className="rf-heading text-4xl font-black leading-none sm:text-5xl">Sign in and keep building your perfect CV.</h1>
            <p className="mt-4 text-base leading-7 text-zinc-300">
              Use Google OAuth or a secure magic link. Your resumes stay protected by Supabase authentication and row-level security.
            </p>
            <div className="mt-8 space-y-3">
              <Button className="h-12 w-full rounded-md bg-indigo-500 text-base font-black text-white shadow-[0_0_28px_rgba(99,102,241,.35)] hover:bg-indigo-400" type="button" onClick={signInWithGoogle} disabled={loading}>
                Continue with Google <ArrowRight className="size-4" />
              </Button>
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400" htmlFor="email">Email magic link</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 size-4 text-zinc-500" />
                  <input
                    id="email"
                    className="h-12 w-full rounded-md border border-white/10 bg-white/[0.06] pl-10 pr-3 text-sm font-semibold text-white outline-none placeholder:text-zinc-500 focus:border-indigo-400"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
                <Button className="h-12 rounded-md border border-indigo-400/40 bg-transparent text-base font-black text-white hover:bg-indigo-500/15" variant="outline" type="button" onClick={signInWithEmail} disabled={loading || !email}>
                  Send Magic Link
                </Button>
              </div>
              {message ? <p className="rounded-md border border-white/10 bg-white/10 p-3 text-sm text-zinc-200">{message}</p> : null}
            </div>
          </div>
          <aside className="relative hidden border-l border-white/10 bg-[#0d0d1f]/70 p-10 lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,.18),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(99,102,241,.22),transparent_36%)]" />
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <div className="mb-5 flex items-center gap-3">
                  <Sparkles className="size-6 text-cyan-200" />
                  <div>
                    <h2 className="rf-heading text-2xl font-black">Free forever</h2>
                    <p className="text-sm text-zinc-400">No template paywalls. No PDF locks.</p>
                  </div>
                </div>
                {["20 premium templates", "AI bullet suggestions", "ATS keyword checker", "Instant PDF export"].map((item) => (
                  <div className="flex items-center gap-3 border-t border-white/10 py-4 text-sm font-bold text-zinc-200" key={item}>
                    <ShieldCheck className="size-4 text-emerald-300" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
