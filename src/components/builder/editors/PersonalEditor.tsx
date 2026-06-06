"use client";

import { z } from "zod";
import { Field } from "@/components/builder/editors/fields";
import { useResumeStore } from "@/store/resumeStore";

const personalSchema = z.object({
  fullName: z.string().min(1),
  jobTitle: z.string().min(1),
  email: z.string().email().or(z.literal("")),
});

export function PersonalEditor() {
  const personal = useResumeStore((state) => state.resumeData.personal);
  const updatePersonal = useResumeStore((state) => state.updatePersonal);
  const validation = personalSchema.safeParse(personal);

  return (
    <div className="space-y-3">
      {!validation.success ? <p className="rounded-md border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-100">Name, title, and a valid email strengthen your resume header.</p> : null}
      <Field label="Full name" value={personal.fullName} onChange={(fullName) => updatePersonal({ fullName })} />
      <Field label="Job title" value={personal.jobTitle} onChange={(jobTitle) => updatePersonal({ jobTitle })} />
      <Field label="Email" value={personal.email} onChange={(email) => updatePersonal({ email })} type="email" />
      <Field label="Phone" value={personal.phone} onChange={(phone) => updatePersonal({ phone })} />
      <Field label="Location" value={personal.location} onChange={(location) => updatePersonal({ location })} />
      <Field label="Website" value={personal.website} onChange={(website) => updatePersonal({ website })} />
      <Field label="LinkedIn" value={personal.linkedin} onChange={(linkedin) => updatePersonal({ linkedin })} />
      <Field label="GitHub" value={personal.github} onChange={(github) => updatePersonal({ github })} />
      <Field label="Photo URL" value={personal.photoUrl} onChange={(photoUrl) => updatePersonal({ photoUrl })} placeholder="Supabase Storage public URL" />
      <Field label="Summary" value={personal.summary} onChange={(summary) => updatePersonal({ summary })} textarea />
    </div>
  );
}
