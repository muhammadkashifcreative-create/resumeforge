import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { ArrowRight, Bot, CheckCircle2, Download, FileText, Layers3, Lock, SearchCheck, Sparkles, Zap, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { templates } from "@/lib/templates/registry";

const features: Array<[string, string, LucideIcon]> = [
  ["100+ Free Templates", "Every template free, forever", Layers3],
  ["AI Writing Assistant", "GPT-4o powered suggestions", Bot],
  ["ATS Score Checker", "Know your resume beats the bots", SearchCheck],
  ["Instant PDF Export", "Download in one click", Download],
  ["Live Preview", "See changes in real time", Zap],
  ["No Account Required", "Start building immediately", Lock],
];

const faqs = [
  ["Is it really free?", "Yes. ResumeForge is built as a permanently free CV builder with no premium template lockups."],
  ["How many templates?", "The registry includes 100 professional templates across classic, modern, creative, and minimal styles."],
  ["Is my data safe?", "Authenticated resumes are protected with Supabase row-level security so each user can access only their own data."],
  ["Can I make multiple CVs?", "Yes. The database model supports multiple resumes per account."],
  ["What file formats?", "PDF export is implemented with @react-pdf/renderer. More formats can be added later."],
  ["Does it pass ATS?", "Templates prioritize readable text hierarchy and the AI keyword endpoint provides ATS analysis."],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f1a] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="relative mx-auto grid min-h-[92vh] max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-[1fr_0.85fr]">
          <div>
            <Link className="mb-10 inline-flex items-center gap-2 text-lg font-black" href="/">
              <FileText className="size-6 text-blue-400" /> ResumeForge
            </Link>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] md:text-7xl">Build Your Dream CV in Minutes — Free, Forever</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              100+ professional templates. AI-powered writing. Instant PDF download. No credit card. No catch.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="inline-flex h-12 items-center gap-2 rounded-md bg-blue-500 px-5 font-bold text-white hover:bg-blue-400" href="/builder/new">
                Start Building Free <ArrowRight className="size-4" />
              </Link>
              <Link className="inline-flex h-12 items-center rounded-md border border-white/20 px-5 font-bold text-white hover:bg-white/10" href="/templates">Browse Templates</Link>
            </div>
          </div>
          <div className="relative hidden h-[620px] md:block">
            {templates.slice(0, 5).map((template, index) => (
              <div
                key={template.id}
                className="absolute right-0 aspect-[3/4] w-72 rounded-md border border-white/15 bg-white p-5 text-slate-950 shadow-2xl transition-transform"
                style={{ top: index * 54, right: index * 28, transform: `rotate(${(index - 2) * 3}deg)` }}
              >
                <div className="h-8 w-40 rounded bg-slate-900" />
                <div className="mt-4 h-2 w-32 rounded bg-blue-500" />
                <div className="mt-8 grid grid-cols-[0.65fr_1fr] gap-4">
                  <div className="space-y-2">{Array.from({ length: 8 }, (_, line) => <div key={line} className="h-2 rounded bg-blue-100" />)}</div>
                  <div className="space-y-3">{Array.from({ length: 6 }, (_, line) => <div key={line} className="h-2 rounded bg-slate-200" />)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="templates" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-black md:text-5xl">100+ Professional Templates</h2>
          <Link className="font-bold text-blue-300" href="/templates">View All Templates →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {templates.slice(0, 12).map((template, index) => (
            <div className="rounded-md border border-white/10 bg-white/[0.03] p-3" key={template.id} style={{ marginTop: `${index % 3 * 18}px` }}>
              <div className="aspect-[3/4] rounded bg-gradient-to-br from-white to-blue-100" />
              <p className="mt-3 text-sm font-black">{template.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(([title, text, Icon]) => (
            <div className="rounded-md border border-blue-400/30 bg-white/[0.035] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.08)]" key={String(title)}>
              <Icon className="mb-5 size-8 text-blue-300" />
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-20 md:grid-cols-3">
        {["Pick a template", "Fill in your details", "Download your PDF"].map((step, index) => (
          <div className="rounded-md bg-white/[0.04] p-6" key={step}>
            <CheckCircle2 className="mb-5 size-8 text-blue-300" />
            <p className="text-sm font-bold text-blue-200">Step {index + 1}</p>
            <h3 className="mt-2 text-2xl font-black">{step}</h3>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-20 md:grid-cols-4">
        {["Maya Chen", "Jordan Ellis", "Priya Raman", "Noah Brooks"].map((name) => (
          <blockquote className="rounded-md border border-white/10 bg-white/[0.035] p-5" key={name}>
            <div className="mb-4 size-10 rounded-full bg-blue-400/30" />
            <p className="text-sm leading-6 text-slate-300">“ResumeForge helped me create a polished CV in one sitting and tailor it for the role I wanted.”</p>
            <footer className="mt-4 text-sm font-black">{name}<br /><span className="font-medium text-slate-400">Product Manager</span></footer>
          </blockquote>
        ))}
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="mb-8 text-4xl font-black">FAQ</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map(([question, answer]) => (
            <AccordionItem className="rounded-md border border-white/10 px-4" value={question} key={question}>
              <AccordionTrigger className="flex w-full items-center justify-between py-4 text-left font-bold">{question}</AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-6 text-slate-300">{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="bg-[#080811] px-5 py-20 text-center">
        <Sparkles className="mx-auto mb-5 size-10 text-blue-300" />
        <h2 className="text-4xl font-black">Ready to Land Your Dream Job?</h2>
        <Link className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-blue-500 px-5 font-bold" href="/builder/new">Create My CV Now →</Link>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-slate-400">
        <p><strong className="text-white">ResumeForge</strong> · Free CV building, forever.</p>
        <nav className="flex gap-4">
          <Link href="/templates">Templates</Link><a href="#features">Features</a><a href="#faq">FAQ</a><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link>
        </nav>
      </footer>
    </main>
  );
}
