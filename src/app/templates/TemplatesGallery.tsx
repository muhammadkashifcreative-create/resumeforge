"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { templates } from "@/lib/templates/registry";
import type { Template } from "@/types/resume";

const categories: Array<"All" | Template["category"]> = ["All", "Classic", "Modern", "Creative", "Minimal"];

export function TemplatesGallery() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");

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
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link className="text-lg font-black" href="/">ResumeForge</Link>
        <div className="mt-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-black md:text-6xl">Template Gallery</h1>
            <p className="mt-3 max-w-2xl text-slate-300">Browse 100 free professional resume templates built for live preview and PDF export.</p>
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

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {filtered.map((template) => (
            <article className="group overflow-hidden rounded-md border border-white/10 bg-white/[0.035]" key={template.id}>
              <div className="relative aspect-[3/4] bg-gradient-to-br from-white via-slate-100 to-blue-100 p-3 transition-transform duration-300 group-hover:scale-[1.03]">
                <div className="h-5 w-24 rounded bg-slate-900" />
                <div className="mt-3 h-1.5 w-20 rounded bg-blue-500" />
                <div className="mt-6 space-y-2">{Array.from({ length: 9 }, (_, index) => <div className="h-1.5 rounded bg-slate-300" key={index} />)}</div>
                <div className="absolute inset-0 grid place-items-center bg-slate-950/75 opacity-0 transition-opacity group-hover:opacity-100">
                  <Link className="rounded-md bg-blue-500 px-4 py-2 text-sm font-black" href={`/builder/new?template=${template.id}`}>Use Template</Link>
                </div>
              </div>
              <div className="p-3">
                <h2 className="text-sm font-black">{template.name}</h2>
                <span className="mt-2 inline-flex rounded bg-blue-400/15 px-2 py-1 text-[10px] font-bold uppercase text-blue-200">{template.category}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
