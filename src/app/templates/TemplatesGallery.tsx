"use client";

import { useMemo, useState } from "react";
import { Eye, Search, X } from "lucide-react";
import Link from "next/link";
import { defaultTheme } from "@/lib/sample-resume";
import { templates } from "@/lib/templates/registry";
import { sampleResume } from "@/lib/sample-resume";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import type { Template } from "@/types/resume";

const categories: Array<"All" | Template["category"]> = ["All", "Classic", "Modern", "Creative", "Minimal"];

export function TemplatesGallery() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState<Template | null>(null);

  const filtered = useMemo(
    () =>
      templates.filter((template) => {
        const categoryMatch = category === "All" || template.category === category;
        const text = `${template.name} ${template.category} ${template.tags.join(" ")}`.toLowerCase();
        return categoryMatch && text.includes(query.toLowerCase());
      }),
    [category, query],
  );

  return (
    <main className="min-h-screen bg-[#0b1020] px-5 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link className="inline-flex items-center gap-2 text-lg font-black" href="/">
          <span className="grid size-9 place-items-center rounded-md bg-blue-500 text-white">R</span>
          ResumeForge
        </Link>
        <div className="mt-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.28em] text-cyan-200">20 live resume previews</p>
            <h1 className="text-4xl font-black md:text-6xl">Premium Template Gallery</h1>
            <p className="mt-3 max-w-2xl text-slate-300">Choose from 20 curated free templates tuned for engineering, executive, creative, graduate, healthcare, legal, finance, and ATS-first roles.</p>
          </div>
          <label className="relative block md:w-80">
            <Search className="absolute left-3 top-3 size-4 text-slate-400" />
            <input className="h-11 w-full rounded-md border border-white/10 bg-white/5 pl-10 pr-3 text-sm outline-none focus:border-blue-400" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search templates" />
          </label>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button className={`rounded-md px-4 py-2 text-sm font-bold ${category === item ? "bg-blue-500" : "bg-white/10 hover:bg-white/15"}`} type="button" key={item} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((template) => (
            <article className="group overflow-hidden rounded-md border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20" key={template.id}>
              <div className="relative bg-slate-900 p-4">
                <TemplatePreview template={template} className="mx-auto max-w-[230px] shadow-xl shadow-black/30 transition-transform duration-300 group-hover:scale-[1.025]" />
                <div className="absolute inset-0 flex items-end justify-center gap-2 bg-slate-950/0 p-5 opacity-0 transition group-hover:bg-slate-950/45 group-hover:opacity-100">
                  <button className="inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-sm font-black text-slate-950" type="button" onClick={() => setPreview(template)}>
                    <Eye className="size-4" /> Preview
                  </button>
                  <Link className="inline-flex h-10 items-center rounded-md bg-blue-500 px-4 text-sm font-black text-white" href={`/builder/new?template=${template.id}`}>Use</Link>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-black">{template.name}</h2>
                    <p className="mt-1 text-sm text-slate-300">{template.specialty}</p>
                  </div>
                  <span className="rounded bg-cyan-400/15 px-2 py-1 text-[10px] font-bold uppercase text-cyan-200">{template.category}</span>
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-400">{template.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {template.tags.slice(0, 4).map((tag) => (
                    <span className="rounded bg-white/10 px-2 py-1 text-[9px] font-black uppercase text-slate-300" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      {preview ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/85 p-4">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-auto rounded-md bg-slate-100 p-4 text-slate-950 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div>
                <h2 className="text-xl font-black">{preview.name}</h2>
                <p className="text-sm text-slate-500">{preview.specialty} · {preview.category}</p>
              </div>
              <Link className="ml-auto rounded-md bg-blue-600 px-4 py-2 text-sm font-black text-white" href={`/builder/new?template=${preview.id}`}>Use Template</Link>
              <button className="rounded-md border border-slate-300 p-2" type="button" onClick={() => setPreview(null)} aria-label="Close preview">
                <X className="size-5" />
              </button>
            </div>
            <div className="mx-auto w-[816px]">
              {(() => {
                const PreviewComponent = preview.component;
                return <PreviewComponent data={sampleResume} theme={defaultTheme} />;
              })()}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
