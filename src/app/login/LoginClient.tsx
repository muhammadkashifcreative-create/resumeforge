"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
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
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5 text-white">
      <section className="w-full max-w-md rounded-md border border-white/10 bg-white/[0.04] p-6">
        <h1 className="text-3xl font-black">Sign in to ResumeForge</h1>
        <p className="mt-2 text-sm leading-6 text-slate-300">Use Google OAuth or a password-free email magic link.</p>
        <div className="mt-6 space-y-3">
          <Button className="w-full" type="button" onClick={signInWithGoogle} disabled={loading}>Continue with Google</Button>
          <div className="grid gap-2">
            <label className="text-xs font-bold text-slate-300" htmlFor="email">Email magic link</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 size-4 text-slate-400" />
              <input id="email" className="h-11 w-full rounded-md border border-white/10 bg-white/5 pl-10 pr-3 text-sm outline-none focus:border-blue-400" value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
            </div>
            <Button variant="outline" type="button" onClick={signInWithEmail} disabled={loading || !email}>Send Magic Link</Button>
          </div>
          {message ? <p className="rounded-md bg-white/10 p-3 text-sm">{message}</p> : null}
        </div>
      </section>
    </main>
  );
}
