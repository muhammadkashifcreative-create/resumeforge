"use client";

import { useMemo, useState } from "react";
import { Eye, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import { defaultTheme, sampleResume } from "@/lib/sample-resume";
import { templates } from "@/lib/templates/registry";
import type { Template } from "@/types/resume";

const categories: Array<"All" | Template["category"]> = ["All", "Classic", "Modern", "Creative", "Minimal"];

export function TemplatesGallery() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState<Template | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = useMemo(
    () =>
      templates.filter((template) => {
        const categoryMatch = category === "All" || template.category === category;
        const text = `${template.name} ${template.category} ${template.specialty} ${template.tags.join(" ")}`.toLowerCase();
        return categoryMatch && text.includes(query.toLowerCase());
      }),
    [category, query],
  );

  return (
    <main className="rf-mesh min-h-screen text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080810]/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
          <Link className="rf-heading inline-flex items-center gap-3 text-xl font-black" href="/">
            <span className="size-8 rotate-45 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-300 shadow-[0_0_28px_rgba(99,102,241,.45)]" />
            ResumeForge
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-bold text-zinc-300 md:flex">
            <Link href="/">Home</Link>
            <a href="#templates">Templates</a>
            <Link href="/builder/new">Builder</Link>
          </nav>
          <div className="hidden items-center gap-2 sm:flex">
            <Link className="rounded-md border border-indigo-400/40 px-4 py-2 text-sm font-black hover:bg-indigo-500/15" href="/login">Log In</Link>
            <Link className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-black shadow-[0_0_28px_rgba(99,102,241,.35)] hover:bg-indigo-400" href="/builder/new">Build Free →</Link>
          </div>
          <button className="rounded-md border border-white/10 p-2 md:hidden" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <Menu className="size-5" />
          </button>
        </div>
        {menuOpen ? (
          <div className="grid gap-3 border-t border-white/10 px-5 py-4 text-sm font-bold text-zinc-300 md:hidden">
            <Link href="/">Home</Link>
            <a href="#templates">Templates</a>
            <Link href="/login">Log In</Link>
            <Link href="/builder/new">Build Free →</Link>
          </div>
        ) : null}
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12 md:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-indigo-100 shadow-[0_0_28px_rgba(99,102,241,.2)]">
              20 premium live previews
            </p>
            <h1 className="rf-heading max-w-3xl text-5xl font-black leading-none md:text-7xl">Choose a CV template that feels expensive.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
              Every card renders a complete resume preview with real sample information, role-specific structure, and premium styling.
            </p>
          </div>
          <div className="rf-glass rounded-2xl p-4">
            <label className="relative block">
              <Search className="absolute left-4 top-3.5 size-5 text-zinc-500" />
              <input
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] pl-12 pr-4 text-sm font-semibold text-white outline-none placeholder:text-zinc-500 focus:border-indigo-400"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by role, style, category, or skill"
              />
            </label>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${category === item ? "bg-indigo-500 text-white shadow-[0_0_24px_rgba(99,102,241,.35)]" : "border border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]"}`}
                  type="button"
                  key={item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="templates" className="mx-auto max-w-7xl px-5 pb-16">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-400">{filtered.length} templates shown</p>
          <p className="text-sm text-zinc-400">Preview, inspect, then open directly in the builder.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((template, index) => (
            <article
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/70 hover:shadow-[0_0_42px_rgba(99,102,241,.2)]"
              key={template.id}
              style={{ rotate: index % 2 ? "0.35deg" : "-0.35deg" }}
            >
              <div className="relative bg-[#0d0d1f] p-4">
                <TemplatePreview template={template} className="shadow-xl shadow-black/30 transition-transform duration-300 group-hover:scale-[1.025]" />
                <div className="absolute inset-0 flex items-end justify-center gap-2 bg-slate-950/0 p-5 opacity-0 transition group-hover:bg-slate-950/55 group-hover:opacity-100">
                  <button className="inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-sm font-black text-slate-950" type="button" onClick={() => setPreview(template)}>
                    <Eye className="size-4" /> Preview
                  </button>
                  <Link className="inline-flex h-10 items-center rounded-md bg-indigo-500 px-4 text-sm font-black text-white" href={`/builder/new?template=${template.id}`}>Use →</Link>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="rf-heading text-xl font-black">{template.name}</h2>
                    <p className="mt-1 text-sm font-semibold text-cyan-100">{template.specialty}</p>
                  </div>
                  <span className="rounded bg-cyan-400/15 px-2 py-1 text-[10px] font-bold uppercase text-cyan-200">{template.category}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{template.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {template.tags.slice(0, 4).map((tag) => (
                    <span className="rounded bg-white/10 px-2 py-1 text-[9px] font-black uppercase text-zinc-300" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {preview ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#080810]/90 p-3 backdrop-blur-xl">
          <div className="max-h-[94vh] w-full max-w-6xl overflow-auto rounded-2xl border border-white/10 bg-[#10101f] p-4 text-white shadow-2xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div>
                <h2 className="rf-heading text-2xl font-black">{preview.name}</h2>
                <p className="text-sm text-zinc-400">{preview.specialty} · {preview.category}</p>
              </div>
              <Link className="ml-auto rounded-md bg-indigo-500 px-4 py-2 text-sm font-black text-white" href={`/builder/new?template=${preview.id}`}>Use Template</Link>
              <button className="rounded-md border border-white/10 p-2" type="button" onClick={() => setPreview(null)} aria-label="Close preview">
                <X className="size-5" />
              </button>
            </div>
            <div className="overflow-x-auto rounded-xl bg-zinc-200 p-3">
              <div className="mx-auto w-[816px]">
                {(() => {
                  const PreviewComponent = preview.component;
                  return <PreviewComponent data={sampleResume} theme={defaultTheme} />;
                })()}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
