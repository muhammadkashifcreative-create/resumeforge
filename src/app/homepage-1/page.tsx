import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Download,
  FileText,
  Layers3,
  Lock,
  Mail,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import { templates } from "@/lib/templates/registry";

const showcaseTemplates = templates.slice(0, 8);

const features: Array<[string, string, LucideIcon]> = [
  ["20 Premium Free Templates", "A curated library of specialized layouts for tech, executive, legal, finance, academic, creative, and ATS-first resumes.", Layers3],
  ["Live Template Preview", "Every template card renders a real resume preview, including header, contact details, experience, education, skills, and projects.", Zap],
  ["AI Writing Assistant", "Generate bullet suggestions, rewrite weak text, and improve tone without leaving the builder.", Bot],
  ["ATS Keyword Checker", "Compare your resume against a job description and see present keywords, missing keywords, and improvement tips.", SearchCheck],
  ["Instant PDF Export", "Download an A4 resume PDF from the builder with one click.", Download],
  ["Protected Accounts", "Google OAuth, email magic links, and Supabase row-level security keep user resumes separated.", Lock],
];

const steps = [
  ["Choose a premium template", "Preview 20 complete designs by role, style, and specialty before opening the builder."],
  ["Write with structure", "Fill guided sections for summary, work, education, skills, projects, certifications, languages, and custom content."],
  ["Polish and export", "Use theme controls, AI suggestions, live preview, and PDF export to finish confidently."],
];

const faqs = [
  ["How many templates are included?", "ResumeForge now has 20 curated templates. Each one is named, specialized, previewable, and free."],
  ["Are the previews real?", "Yes. Template cards render the actual template component using complete sample resume information."],
  ["Is it free?", "Yes. Templates, AI routes, live preview, and PDF export are built as free features."],
  ["Can I use it without a password?", "Yes. The auth flow supports Google OAuth and email magic links."],
  ["Does it support ATS resumes?", "Yes. Several templates are ATS-focused, and the keyword endpoint analyzes a resume against a job description."],
  ["What do I need to deploy it?", "Set the Supabase and OpenAI environment variables from .env.example, run the Supabase migration, and deploy the Next.js app."],
];

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <Link className="inline-flex items-center gap-3 text-lg font-black text-slate-950" href="/">
          <span className="grid size-10 place-items-center rounded-md bg-slate-950 text-white">R</span>
          ResumeForge
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 md:flex">
          <a href="#templates">Templates</a>
          <a href="#features">Features</a>
          <a href="#workflow">How it works</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link className="hidden h-10 items-center rounded-md px-4 text-sm font-black text-slate-700 hover:bg-slate-100 sm:inline-flex" href="/templates">
            Preview
          </Link>
          <Link className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-black text-white hover:bg-slate-800" href="/builder/new">
            Start Free <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <Link className="inline-flex items-center gap-3 text-lg font-black text-slate-950" href="/">
            <span className="grid size-10 place-items-center rounded-md bg-slate-950 text-white">R</span>
            ResumeForge
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
            A free CV builder with premium templates, AI writing help, live preview, Supabase auth, and PDF export.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-black text-slate-950">Product</h3>
          <nav className="mt-3 grid gap-2 text-sm text-slate-600">
            <Link href="/templates">Templates</Link>
            <a href="#features">Features</a>
            <a href="#workflow">How it works</a>
          </nav>
        </div>
        <div>
          <h3 className="text-sm font-black text-slate-950">Builder</h3>
          <nav className="mt-3 grid gap-2 text-sm text-slate-600">
            <Link href="/builder/new">Create CV</Link>
            <Link href="/login">Login</Link>
            <a href="#faq">FAQ</a>
          </nav>
        </div>
        <div>
          <h3 className="text-sm font-black text-slate-950">Trust</h3>
          <div className="mt-3 grid gap-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4" /> Supabase RLS</span>
            <span className="inline-flex items-center gap-2"><Mail className="size-4" /> Magic link auth</span>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 px-5 py-5 text-center text-xs font-semibold text-slate-500">
        ResumeForge. Free templates, free preview, free PDF export.
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-950">
      <Header />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-24">
          <div>
            <p className="inline-flex rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-blue-700">
              Premium CV builder, free forever
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight text-slate-950 md:text-7xl">
              Build a job-ready CV with templates that actually look professional.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              ResumeForge gives you 20 curated premium templates, AI-powered writing help, live full-page previews, ATS keyword analysis, and instant PDF download.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="inline-flex h-12 items-center gap-2 rounded-md bg-slate-950 px-5 font-black text-white shadow-lg shadow-slate-300 hover:bg-slate-800" href="/builder/new">
                Start Building Free <ArrowRight className="size-4" />
              </Link>
              <Link className="inline-flex h-12 items-center gap-2 rounded-md border border-slate-300 bg-white px-5 font-black text-slate-950 hover:bg-slate-50" href="/templates">
                Browse 20 Templates
              </Link>
            </div>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              {["20 premium templates", "Live preview", "PDF export"].map((item) => (
                <div className="rounded-md border border-slate-200 bg-white px-3 py-3 text-sm font-black shadow-sm" key={item}>
                  <CheckCircle2 className="mb-2 size-5 text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-12 z-10 hidden rounded-md border border-emerald-200 bg-white p-4 shadow-xl md:block">
              <div className="flex items-center gap-2 text-sm font-black text-emerald-700">
                <Sparkles className="size-4" /> ATS score 86
              </div>
              <p className="mt-1 text-xs text-slate-500">12 matched keywords · 4 missing</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {showcaseTemplates.slice(0, 4).map((template, index) => (
                <Link
                  className="group rounded-md border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/70 transition-transform hover:-translate-y-1"
                  href={`/builder/new?template=${template.id}`}
                  key={template.id}
                  style={{ marginTop: index % 2 ? 42 : 0 }}
                >
                  <TemplatePreview template={template} className="shadow-sm" />
                  <div className="mt-3">
                    <p className="text-sm font-black text-slate-950">{template.name}</p>
                    <p className="text-xs font-semibold text-slate-500">{template.specialty}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-7 md:grid-cols-4">
          {["No credit card", "All templates free", "AI writing routes", "Supabase ready"].map((item) => (
            <div className="flex items-center gap-3 text-sm font-black text-slate-700" key={item}>
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="templates" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10 grid gap-5 md:grid-cols-[0.9fr_1fr] md:items-end">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-blue-700">20 curated templates</p>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">Premium designs for real career paths.</h2>
          </div>
          <p className="text-slate-600 md:text-right">
            Every preview below uses complete sample resume information: summary, contact details, experience, education, skills, projects, certifications, and languages.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {showcaseTemplates.map((template) => (
            <article className="rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl" key={template.id}>
              <TemplatePreview template={template} className="shadow-sm" />
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black">{template.name}</h3>
                  <p className="mt-1 text-sm font-bold text-blue-700">{template.specialty}</p>
                </div>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-black uppercase text-slate-600">{template.category}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{template.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {template.tags.slice(0, 3).map((tag) => (
                  <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-black uppercase text-blue-700" key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-md border border-slate-200 bg-white p-5">
          <p className="font-bold text-slate-700">Need the full library? View all 20 templates with large previews and specialty filters.</p>
          <Link className="inline-flex h-11 items-center gap-2 rounded-md bg-slate-950 px-4 font-black text-white" href="/templates">
            Open Template Gallery <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section id="features" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-emerald-700">Complete product</p>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">Everything a serious CV builder needs.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map(([title, text, Icon]) => (
              <div className="rounded-md border border-slate-200 bg-[#fbfcff] p-6" key={title}>
                <Icon className="mb-5 size-8 text-blue-600" />
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-blue-700">Workflow</p>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">A simple path from draft to finished PDF.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map(([title, text], index) => (
            <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm" key={title}>
              <p className="text-sm font-black text-blue-700">0{index + 1}</p>
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <Sparkles className="mb-5 size-10 text-cyan-200" />
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">AI help built into the resume workflow.</h2>
            <p className="mt-4 text-slate-300">Generate resume bullets, rewrite summary text, and compare your resume against a job description for ATS keyword coverage.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {["5 bullet suggestions", "Professional rewrite", "Keyword score"].map((item) => (
              <div className="rounded-md border border-white/10 bg-white/[0.06] p-5" key={item}>
                <Bot className="mb-4 size-7 text-cyan-200" />
                <h3 className="font-black">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">Powered by GPT-4o through Vercel AI SDK routes.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="mb-8 text-4xl font-black">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map(([question, answer]) => (
            <AccordionItem className="rounded-md border border-slate-200 bg-white px-4" value={question} key={question}>
              <AccordionTrigger className="flex w-full items-center justify-between py-4 text-left font-bold">{question}</AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-6 text-slate-600">{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-md bg-slate-950 px-6 py-12 text-center text-white">
          <FileText className="mx-auto mb-5 size-10 text-cyan-200" />
          <h2 className="text-4xl font-black tracking-tight">Ready to create your CV?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">Start with a premium template, write faster with AI, preview every change, and download your PDF.</p>
          <Link className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-white px-5 font-black text-slate-950" href="/builder/new">
            Create My CV Now <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
