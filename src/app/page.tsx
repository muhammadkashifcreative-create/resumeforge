import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  Layers3,
  Lock,
  SearchCheck,
  Sparkles,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import { templates } from "@/lib/templates/registry";

const featuredTemplates = ["modern-02", "creative-03", "classic-04", "minimal-01"]
  .map((id) => templates.find((template) => template.id === id))
  .filter((template) => template !== undefined);

const features: Array<[string, string, LucideIcon]> = [
  ["Specialized Templates", "Engineering, executive, creative, graduate, legal, healthcare, finance, and ATS-first layouts.", Layers3],
  ["AI Writing Assistant", "Generate stronger bullets, rewrite weak text, and align your story to the role.", Bot],
  ["ATS Keyword Checker", "Compare your resume against a job description before you apply.", SearchCheck],
  ["Live Preview", "Every edit updates the selected design instantly, including colors and spacing.", Zap],
  ["Instant PDF Export", "Download a clean A4 PDF without upgrade prompts or locked templates.", Download],
  ["Private by Design", "Supabase row-level security keeps each signed-in user’s resumes separated.", Lock],
];

const roles = ["Software Engineer", "Product Manager", "UX Designer", "Executive", "Nurse", "Teacher", "Lawyer", "Graduate", "Data Analyst", "Marketing Lead"];

const faqs = [
  ["Is it really free?", "Yes. The product is designed around permanently free templates, AI help, live preview, and PDF export."],
  ["Can I preview templates first?", "Yes. The gallery shows live rendered previews and a larger preview before you use a template."],
  ["Are templates specialized?", "Yes. Templates are tagged by role and use case, including modern tech resumes, creative portfolios, academic CVs, ATS layouts, and executive formats."],
  ["Is my data safe?", "The Supabase schema uses row-level security so users can only access their own resumes and sections."],
  ["What file formats are available?", "PDF export is included now through @react-pdf/renderer."],
  ["Does it help with ATS?", "Yes. The AI keyword route scores a resume against a job description and returns matched and missing keywords."],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="relative mx-auto grid min-h-[88vh] max-w-7xl gap-12 px-5 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <nav className="mb-14 flex items-center justify-between gap-4">
              <Link className="inline-flex items-center gap-3 text-lg font-black" href="/">
                <span className="grid size-10 place-items-center rounded-md bg-blue-500 text-white shadow-lg shadow-blue-950/40">R</span>
                ResumeForge
              </Link>
              <Link className="hidden rounded-md border border-white/15 px-4 py-2 text-sm font-bold text-slate-200 hover:bg-white/10 sm:inline-flex" href="/templates">
                Browse templates
              </Link>
            </nav>
            <p className="mb-5 inline-flex rounded-md border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">
              Free resume builder for serious applications
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] md:text-7xl">Build a resume that looks tailored, not templated.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Pick a specialized template, write with AI help, preview every change live, and export a polished PDF. No credit card. No template paywall.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="inline-flex h-12 items-center gap-2 rounded-md bg-blue-500 px-5 font-black text-white shadow-lg shadow-blue-950/40 hover:bg-blue-400" href="/builder/new">
                Start Building Free <ArrowRight className="size-4" />
              </Link>
              <Link className="inline-flex h-12 items-center rounded-md border border-white/20 px-5 font-black text-white hover:bg-white/10" href="/templates">Preview Templates</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {roles.slice(0, 6).map((role) => (
                <span className="rounded-md bg-white/8 px-3 py-2 text-xs font-bold text-slate-200" key={role}>{role}</span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[620px]">
            <div className="absolute left-0 top-8 hidden w-56 rounded-md border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-50 shadow-2xl shadow-black/30 md:block">
              <Target className="mb-3 size-5" />
              <strong>ATS score: 86</strong>
              <p className="mt-1 text-emerald-100/80">12 matched keywords · 4 missing</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-10 sm:gap-5">
              {featuredTemplates.map((template, index) => (
                <Link
                  className="group rounded-md border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/30 transition-transform hover:-translate-y-1"
                  href={`/builder/new?template=${template.id}`}
                  key={template.id}
                  style={{ marginTop: index % 2 ? 46 : 0 }}
                >
                  <TemplatePreview template={template} className="shadow-xl shadow-black/30" />
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-black">{template.name}</p>
                      <p className="text-xs text-slate-300">{template.specialty}</p>
                    </div>
                    <ArrowRight className="size-4 text-cyan-200 opacity-0 transition group-hover:opacity-100" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-white/[0.025]">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 md:grid-cols-4">
          {["100 free templates", "Live full-page preview", "AI resume writing", "One-click PDF"].map((stat) => (
            <div className="flex items-center gap-3" key={stat}>
              <CheckCircle2 className="size-5 text-emerald-300" />
              <span className="text-sm font-black text-slate-100">{stat}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="templates" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-8 grid gap-4 md:grid-cols-[0.85fr_1fr] md:items-end">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-cyan-200">Pick by role</p>
            <h2 className="text-4xl font-black md:text-5xl">Modern, specialized templates with real previews.</h2>
          </div>
          <p className="text-slate-300 md:text-right">The gallery now renders the actual resume component in each thumbnail, so what you preview is what opens in the builder.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTemplates.map((template) => (
            <article className="rounded-md border border-white/10 bg-white/[0.045] p-4" key={template.id}>
              <TemplatePreview template={template} className="shadow-xl shadow-black/25" />
              <h3 className="mt-4 text-lg font-black">{template.name}</h3>
              <p className="mt-1 text-sm text-cyan-100">{template.specialty}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{template.description}</p>
            </article>
          ))}
        </div>
        <Link className="mt-8 inline-flex h-11 items-center gap-2 rounded-md border border-white/15 px-4 font-black hover:bg-white/10" href="/templates">
          View all specialized templates <ArrowRight className="size-4" />
        </Link>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-4xl font-black md:text-5xl">Everything needed to ship the resume.</h2>
          <BriefcaseBusiness className="hidden size-10 text-cyan-200 md:block" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(([title, text, Icon]) => (
            <div className="rounded-md border border-white/10 bg-[#0d1b2f] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.08)]" key={title}>
              <Icon className="mb-5 size-8 text-cyan-200" />
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-emerald-200">Simple workflow</p>
          <h2 className="text-4xl font-black md:text-5xl">From blank page to polished PDF in three moves.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {["Choose a role-ready design", "Fill sections with AI help", "Preview and download PDF"].map((step, index) => (
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-5" key={step}>
              <p className="text-sm font-black text-cyan-200">0{index + 1}</p>
              <h3 className="mt-4 text-xl font-black">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-20 md:grid-cols-4">
        {["Maya Chen", "Jordan Ellis", "Priya Raman", "Noah Brooks"].map((name, index) => (
          <blockquote className="rounded-md border border-white/10 bg-white/[0.035] p-5" key={name}>
            <div className="mb-4 grid size-10 place-items-center rounded-md bg-blue-500/20 text-sm font-black text-blue-100">{name.split(" ").map((part) => part[0]).join("")}</div>
            <p className="text-sm leading-6 text-slate-300">“The live previews made template choice obvious. I could pick a design for my role and export a polished resume fast.”</p>
            <footer className="mt-4 text-sm font-black">{name}<br /><span className="font-medium text-slate-400">{["Product Manager", "Frontend Engineer", "Data Analyst", "Designer"][index]}</span></footer>
          </blockquote>
        ))}
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="mb-8 text-4xl font-black">FAQ</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map(([question, answer]) => (
            <AccordionItem className="rounded-md border border-white/10 bg-white/[0.025] px-4" value={question} key={question}>
              <AccordionTrigger className="flex w-full items-center justify-between py-4 text-left font-bold">{question}</AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-6 text-slate-300">{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="bg-[#050a13] px-5 py-20 text-center">
        <Sparkles className="mx-auto mb-5 size-10 text-cyan-200" />
        <h2 className="text-4xl font-black">Ready to build a resume that fits the role?</h2>
        <Link className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-blue-500 px-5 font-black" href="/builder/new">Create My CV Now <ArrowRight className="size-4" /></Link>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-slate-400">
        <p><strong className="text-white">ResumeForge</strong> · Specialized resumes, free forever.</p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/templates">Templates</Link><a href="#features">Features</a><a href="#faq">FAQ</a><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link>
        </nav>
      </footer>
    </main>
  );
}
