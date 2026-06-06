"use client";

import type { ChangeEventHandler, ReactNode } from "react";

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  textarea?: boolean;
  type?: string;
}

export function Field({ label, value, onChange, placeholder, textarea, type = "text" }: FieldProps) {
  const handler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => onChange(event.target.value);
  return (
    <label className="grid gap-1.5 text-xs font-semibold text-slate-600">
      {label}
      {textarea ? (
        <textarea
          className="min-h-24 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-950 outline-none focus:border-blue-500"
          value={value}
          onChange={handler}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-normal text-slate-950 outline-none focus:border-blue-500"
          value={value}
          onChange={handler}
          placeholder={placeholder}
          type={type}
        />
      )}
    </label>
  );
}

export function EditorBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3 border-b border-slate-200 pb-5 last:border-0">
      <h3 className="text-sm font-black text-slate-950">{title}</h3>
      {children}
    </section>
  );
}
