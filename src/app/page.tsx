"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const companies = ["Google", "Apple", "Microsoft", "Amazon", "Meta", "Netflix", "Spotify", "Airbnb", "Stripe", "OpenAI", "Figma", "Notion", "Shopify", "Uber", "LinkedIn"];
const tabs = ["All", "Classic", "Modern", "Creative", "Minimal", "ATS-Optimised"];
const templates = [
  ["Executive Ivory", "Classic", "Leadership"],
  ["Product Gradient", "Modern", "Product"],
  ["Studio Noir", "Creative", "Brand"],
  ["ATS Pure", "Minimal", "ATS"],
  ["Tech Sidebar", "Modern", "Engineering"],
  ["Academic Dossier", "Classic", "Research"],
  ["Editorial Angle", "Creative", "Art Direction"],
  ["Data Timeline", "Modern", "Analytics"],
];
const testimonials = [
  ["Anna K.", "Hired at Spotify", "I went from zero callbacks to 3 interviews in one week after rebuilding my CV here."],
  ["Marcus R.", "Frontend Engineer at Stripe", "The templates feel premium without being loud. Recruiters finally understood my impact at a glance."],
  ["Priya S.", "Product Manager at Notion", "The AI rewrites helped me turn vague project notes into measurable product outcomes."],
  ["Daniel M.", "Data Analyst at Shopify", "The ATS checker showed me why I was getting ghosted. Fixed it in 5 minutes."],
  ["Leah T.", "Designer at Figma", "Genuinely the best free tool I've ever used. Better than tools I've paid for."],
  ["Omar H.", "Cloud Engineer at Microsoft", "The live preview made it easy to tune spacing and keep everything on one polished page."],
  ["Nina C.", "Marketing Lead at Airbnb", "I built a resume, exported the PDF, and applied before lunch. It looked agency-made."],
  ["Ethan B.", "Operations Manager", "The executive template gave my experience structure without feeling old-fashioned."],
  ["Sofia L.", "Graduate Analyst", "I had no design background and still ended up with a CV I was proud to send."],
];
const steps = [
  ["Pick Your Template", "Browse 100+ professionally designed templates. Filter by industry, style, or ATS score."],
  ["Fill In Your Details", "Our AI suggests bullet points, rewrites weak sentences, and fills gaps — all in seconds."],
  ["Download & Apply", "Export a pixel-perfect PDF. Your resume is ATS-optimised and ready to send."],
];
const faqs = [
  ["Is ResumeForge really free?", "Yes. ResumeForge is built to be free forever: templates, AI writing help, live preview, ATS analysis, and PDF export."],
  ["Will my resume pass ATS systems?", "The templates use readable structure, clear headings, and text-first layouts. The ATS checker also compares your resume to a job description."],
  ["How many CVs can I create?", "You can create multiple resumes and tailor each one for a different role or industry."],
  ["What file formats can I download?", "PDF export is available now, with the app structured so additional formats can be added later."],
  ["Do I need a design background?", "No. Choose a template, fill guided sections, and preview the final result as you type."],
  ["How does the AI writing assistant work?", "It uses GPT-4o through Vercel AI SDK routes to suggest bullets, rewrite text, and analyze keywords."],
  ["Is my personal data secure?", "The Supabase schema uses row-level security so signed-in users can only access their own resumes."],
  ["Can I create a cover letter too?", "The current product focuses on CVs and resumes. Cover letters are a natural next module."],
];

function MiniResume({ index }: { index: number }) {
  const layouts = ["sidebar", "band", "minimal", "split", "dark", "timeline"];
  const layout = layouts[index % layouts.length];
  return (
    <div className={`mini-resume ${layout}`}>
      <div className="mini-head">
        <span />
        <div><b>Ariana Patel</b><em>Senior Product Designer</em></div>
      </div>
      <div className="mini-body">
        <aside>
          <i /><i /><i />
          <small>Skills</small>
          <strong /><strong /><strong />
        </aside>
        <main>
          <h4>Experience</h4>
          <p /><p /><p />
          <h4>Projects</h4>
          <p /><p />
          <h4>Education</h4>
          <p />
        </main>
      </div>
    </div>
  );
}

function Stat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const node = document.querySelector(`[data-stat="${label}"]`);
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      let frame = 0;
      const total = 70;
      const timer = window.setInterval(() => {
        frame += 1;
        setCount(Math.round((value * frame) / total));
        if (frame >= total) window.clearInterval(timer);
      }, 18);
      observer.disconnect();
    }, { threshold: 0.45 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [label, value]);
  return (
    <div className="stat" data-stat={label}>
      <strong>{count.toLocaleString()}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="rf-page">
      <style jsx global>{`
        @import url("https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=cabinet-grotesk@400,500&display=swap");
        :root { --bg:#080810; --panel:#0d0d1f; --indigo:#6366f1; --cyan:#22d3ee; --gold:#f59e0b; --text:#fff; --muted:#d4d4d8; }
        html { scroll-behavior:smooth; }
        body { background:var(--bg); }
        .rf-page { min-height:100vh; overflow:hidden; background:var(--bg); color:var(--text); font-family:"Cabinet Grotesk", system-ui, sans-serif; }
        .rf-page:before { content:""; position:fixed; inset:0; pointer-events:none; opacity:.03; z-index:60; background-image:radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size:4px 4px; }
        h1,h2,h3,.brand,.stat strong { font-family:"Clash Display", system-ui, sans-serif; letter-spacing:-.03em; }
        a { color:inherit; text-decoration:none; }
        .mesh { position:fixed; inset:-20%; z-index:0; pointer-events:none; filter:blur(55px); opacity:.44; }
        .mesh span { position:absolute; width:38vw; height:38vw; border-radius:999px; animation:mesh 22s ease-in-out infinite alternate; }
        .mesh span:nth-child(1){ left:4%; top:8%; background:rgba(99,102,241,.32); }
        .mesh span:nth-child(2){ right:0; top:22%; background:rgba(34,211,238,.2); animation-delay:-7s; }
        .mesh span:nth-child(3){ left:36%; bottom:0; background:rgba(168,85,247,.24); animation-delay:-13s; }
        @keyframes mesh { from{ transform:translate3d(0,0,0) scale(1); } to{ transform:translate3d(8%, -6%,0) scale(1.18); } }
        .nav { position:sticky; top:0; z-index:50; backdrop-filter:blur(20px); background:rgba(8,8,16,.72); border-bottom:1px solid rgba(255,255,255,.08); }
        .nav-inner { max-width:1200px; margin:0 auto; height:76px; padding:0 22px; display:flex; align-items:center; justify-content:space-between; gap:24px; }
        .brand { display:flex; align-items:center; gap:12px; font-size:22px; font-weight:700; }
        .diamond { width:34px; height:34px; transform:rotate(45deg); border-radius:8px; background:linear-gradient(135deg,var(--indigo),var(--cyan)); box-shadow:0 0 28px rgba(99,102,241,.45); }
        .links { display:flex; gap:28px; color:var(--muted); font-weight:500; }
        .links a,.footer-links a { transition:.25s ease; }
        .links a:hover,.footer-links a:hover { color:white; }
        .nav-actions { display:flex; align-items:center; gap:10px; }
        .ghost,.primary,.gradient-btn { border-radius:14px; display:inline-flex; align-items:center; justify-content:center; gap:8px; font-weight:700; transition:.25s ease; }
        .ghost { border:1px solid rgba(99,102,241,.45); color:white; padding:12px 18px; background:rgba(255,255,255,.02); }
        .ghost:hover { background:rgba(99,102,241,.18); transform:translateY(-1px); }
        .primary { background:var(--indigo); padding:12px 18px; box-shadow:0 0 30px rgba(99,102,241,.32); }
        .primary:hover,.gradient-btn:hover { transform:translateY(-2px) scale(1.02); box-shadow:0 0 45px rgba(99,102,241,.5); }
        .hamburger { display:none; width:42px; height:42px; border:1px solid rgba(255,255,255,.12); border-radius:12px; background:rgba(255,255,255,.04); color:white; }
        .mobile-menu { display:none; padding:0 22px 18px; gap:12px; flex-direction:column; color:var(--muted); }
        .section { position:relative; z-index:1; max-width:1200px; margin:0 auto; padding:112px 22px; }
        .hero { min-height:calc(100vh - 76px); display:grid; grid-template-columns:1.4fr .9fr; gap:62px; align-items:center; padding-top:60px; }
        .eyebrow { width:max-content; max-width:100%; border:1px solid rgba(99,102,241,.42); color:#e0e7ff; background:rgba(99,102,241,.08); border-radius:999px; padding:10px 14px; box-shadow:0 0 32px rgba(99,102,241,.2); font-weight:700; animation:pulse 2.8s ease-in-out infinite; }
        @keyframes pulse { 50%{ box-shadow:0 0 42px rgba(99,102,241,.42); } }
        .hero h1 { margin:24px 0 22px; font-size:clamp(54px,7vw,92px); line-height:.92; font-weight:700; }
        .gradient-text { background:linear-gradient(90deg,var(--indigo),var(--cyan),var(--indigo)); background-size:220%; -webkit-background-clip:text; background-clip:text; color:transparent; animation:grad 5s linear infinite; }
        @keyframes grad { to{ background-position:220%; } }
        .lead { max-width:690px; color:var(--muted); font-size:20px; line-height:1.65; }
        .cta-row { display:flex; flex-wrap:wrap; gap:14px; margin-top:34px; }
        .cta-row .primary,.gradient-btn { min-height:58px; padding:0 24px; font-size:17px; }
        .proof { display:flex; flex-wrap:wrap; align-items:center; gap:18px; margin-top:28px; color:#e4e4e7; }
        .stars { color:var(--gold); letter-spacing:2px; }
        .avatars { display:flex; }
        .avatar { width:36px; height:36px; margin-left:-9px; border:2px solid var(--bg); border-radius:999px; display:grid; place-items:center; font-size:11px; font-weight:700; background:linear-gradient(135deg,var(--indigo),var(--cyan)); }
        .hero-card-wrap { position:relative; min-height:560px; display:grid; place-items:center; }
        .resume-card { width:min(430px,100%); padding:22px; border:1px solid rgba(255,255,255,.12); border-radius:28px; background:rgba(255,255,255,.05); backdrop-filter:blur(12px); box-shadow:0 30px 100px rgba(0,0,0,.42), 0 0 90px rgba(99,102,241,.16); animation:float 6s ease-in-out infinite; }
        @keyframes float { 50%{ transform:translateY(-18px); } }
        .resume-sheet { background:#f7f7fb; color:#111827; border-radius:18px; padding:26px; min-height:520px; }
        .resume-top { display:flex; gap:14px; align-items:center; border-bottom:2px solid #111827; padding-bottom:18px; }
        .resume-photo { width:58px; height:58px; border-radius:18px; background:linear-gradient(135deg,var(--indigo),var(--cyan)); }
        .resume-sheet h3 { margin:0; font-size:24px; }
        .resume-sheet em { display:block; margin-top:4px; color:#4b5563; font-style:normal; font-weight:700; }
        .resume-grid { display:grid; grid-template-columns:.65fr 1fr; gap:22px; margin-top:22px; }
        .line { height:8px; border-radius:99px; background:#d4d4dd; margin:10px 0; }
        .line.short { width:66%; } .line.med { width:82%; }
        .tag { display:inline-flex; margin:5px 4px 0 0; padding:5px 8px; border-radius:99px; background:#e0e7ff; color:#4338ca; font-size:10px; font-weight:800; }
        .chip { position:absolute; z-index:3; border-radius:999px; padding:11px 14px; font-size:13px; font-weight:800; backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,.14); animation:float 5s ease-in-out infinite; }
        .chip.green { right:0; top:78px; background:rgba(34,197,94,.16); color:#bbf7d0; }
        .chip.indigo { left:0; bottom:86px; background:rgba(99,102,241,.18); color:#e0e7ff; animation-delay:-2s; }
        .chip.cyan { left:12px; top:42px; background:rgba(34,211,238,.16); color:#cffafe; animation-delay:-3s; }
        .marquee-section { padding:42px 0; border-block:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.02); position:relative; z-index:1; }
        .muted-heading { text-align:center; color:#a1a1aa; font-weight:700; margin-bottom:22px; }
        .marquee { overflow:hidden; mask-image:linear-gradient(90deg,transparent,#000 15%,#000 85%,transparent); }
        .marquee-track { display:flex; width:max-content; gap:12px; animation:marquee 34s linear infinite; padding:6px 0; }
        .marquee.reverse .marquee-track { animation-direction:reverse; animation-duration:40s; }
        @keyframes marquee { to{ transform:translateX(-50%); } }
        .company { border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.035); color:#a1a1aa; border-radius:999px; padding:10px 18px; font-weight:700; }
        .stats { background:#0d0d1f; border-block:1px solid rgba(255,255,255,.08); }
        .stats-inner { max-width:1200px; margin:auto; display:grid; grid-template-columns:repeat(4,1fr); }
        .stat { text-align:center; padding:46px 18px; border-left:1px solid rgba(255,255,255,.08); }
        .stat:last-child { border-right:1px solid rgba(255,255,255,.08); }
        .stat strong { display:block; color:var(--indigo); font-size:56px; line-height:1; }
        .stat span { display:block; margin-top:10px; color:#a1a1aa; font-weight:700; }
        .center { text-align:center; }
        .section h2 { font-size:clamp(36px,5vw,64px); line-height:1; margin:0 0 16px; }
        .sub { color:#a1a1aa; font-size:18px; line-height:1.6; }
        .tabs { display:flex; flex-wrap:wrap; justify-content:center; gap:10px; margin:34px 0; }
        .tab { border:1px solid rgba(255,255,255,.1); border-radius:999px; padding:10px 16px; color:#d4d4d8; background:rgba(255,255,255,.035); font-weight:800; transition:.25s; }
        .tab.active,.tab:hover { background:var(--indigo); color:white; box-shadow:0 0 24px rgba(99,102,241,.36); }
        .template-scroll { display:flex; gap:20px; overflow-x:auto; padding:16px 4px 28px; scroll-snap-type:x mandatory; }
        .template-card { min-width:220px; scroll-snap-align:start; position:relative; border:1px solid rgba(255,255,255,.1); border-radius:22px; padding:14px; background:rgba(255,255,255,.04); backdrop-filter:blur(12px); transition:.25s ease; }
        .template-card:nth-child(odd){ transform:rotate(-1deg); } .template-card:nth-child(even){ transform:rotate(.5deg); }
        .template-card:hover { border-color:rgba(99,102,241,.8); box-shadow:0 0 40px rgba(99,102,241,.22); transform:translateY(-6px) rotate(0deg); }
        .template-overlay { position:absolute; inset:14px; border-radius:18px; opacity:0; display:flex; flex-direction:column; justify-content:end; padding:16px; background:linear-gradient(transparent,rgba(0,0,0,.84)); transition:.25s; }
        .template-card:hover .template-overlay { opacity:1; }
        .mini-resume { height:292px; border-radius:16px; overflow:hidden; background:#f5f7ff; color:#111827; box-shadow:inset 0 0 0 1px rgba(0,0,0,.05); }
        .mini-head { padding:16px; display:flex; gap:10px; background:white; border-bottom:1px solid #e5e7eb; }
        .mini-head span { width:34px; height:34px; border-radius:10px; background:linear-gradient(135deg,var(--indigo),var(--cyan)); }
        .mini-head b { display:block; font-size:13px; } .mini-head em { font-size:9px; color:#6b7280; font-style:normal; }
        .mini-body { display:grid; grid-template-columns:.62fr 1fr; gap:12px; padding:14px; }
        .mini-body aside { border-radius:12px; background:#111827; min-height:210px; padding:12px; }
        .mini-body aside i,.mini-body aside strong { display:block; height:6px; background:rgba(255,255,255,.4); border-radius:9px; margin-bottom:8px; }
        .mini-body aside small { color:white; font-weight:800; display:block; margin:16px 0 8px; }
        .mini-body aside strong { background:rgba(99,102,241,.65); }
        .mini-body main h4 { margin:0 0 8px; font-size:9px; color:#4338ca; text-transform:uppercase; }
        .mini-body main p { height:7px; border-radius:9px; background:#d1d5db; margin:7px 0; }
        .mini-resume.band .mini-head { background:linear-gradient(135deg,var(--indigo),var(--cyan)); color:white; }
        .mini-resume.minimal .mini-body { grid-template-columns:1fr; } .mini-resume.minimal aside { display:none; }
        .mini-resume.split .mini-body { grid-template-columns:1fr 1fr; }
        .mini-resume.dark { background:#111827; } .mini-resume.dark .mini-head,.mini-resume.dark .mini-body main { background:#111827; color:white; }
        .bento { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:42px; }
        .glass { position:relative; overflow:hidden; border:1px solid rgba(255,255,255,.08); border-radius:26px; background:rgba(255,255,255,.04); backdrop-filter:blur(12px); padding:28px; min-height:260px; }
        .glass.wide { grid-column:span 2; } .glass.full { grid-column:1/-1; text-align:center; background:linear-gradient(135deg,rgba(245,158,11,.16),rgba(255,255,255,.04)); }
        .glass h3 { font-size:28px; margin:10px 0; }
        .glass p { color:#a1a1aa; line-height:1.6; }
        .terminal { margin-top:22px; border:1px solid rgba(255,255,255,.08); border-radius:16px; padding:16px; color:#c4b5fd; background:#080810; font-family:monospace; }
        .typing:after { content:"Managed cross-functional team of 12..."; animation:type 4s steps(38) infinite; white-space:nowrap; overflow:hidden; display:inline-block; max-width:100%; }
        @keyframes type { 0%{ width:0; } 55%,100%{ width:34ch; } }
        .ring { width:132px; height:132px; margin:20px auto; border-radius:50%; background:conic-gradient(var(--cyan) 0 98%, rgba(255,255,255,.12) 98%); display:grid; place-items:center; font:700 30px "Clash Display"; }
        .tiny-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-top:22px; }
        .tiny-grid span { height:58px; border-radius:10px; background:linear-gradient(135deg,rgba(99,102,241,.9),rgba(34,211,238,.55)); }
        .pdf-icon { margin:24px auto; width:84px; height:108px; border:2px solid rgba(255,255,255,.24); border-radius:14px; display:grid; place-items:center; color:var(--cyan); font-weight:900; animation:drop 2s ease-in-out infinite; }
        @keyframes drop { 50%{ transform:translateY(10px); } }
        .builder-ill { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:18px; }
        .builder-ill div { border-radius:18px; background:rgba(0,0,0,.25); padding:16px; }
        .builder-ill span { display:block; height:10px; border-radius:99px; background:rgba(255,255,255,.18); margin:10px 0; }
        .steps { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:44px; }
        .step { position:relative; border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.035); border-radius:28px; padding:30px; min-height:300px; }
        .step-num { position:absolute; right:22px; top:16px; font:700 80px "Clash Display"; color:rgba(255,255,255,.06); }
        .step-visual { width:92px; height:76px; border-radius:16px; background:linear-gradient(135deg,rgba(99,102,241,.8),rgba(34,211,238,.5)); margin-bottom:24px; }
        .testimonials { column-count:3; column-gap:18px; margin-top:42px; }
        .quote { break-inside:avoid; margin:0 0 18px; border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.04); border-radius:24px; padding:24px; animation:rise .7s both; }
        .quote p { color:#d4d4d8; line-height:1.6; } .quote b { display:block; margin-top:18px; }
        @keyframes rise { from{ opacity:0; transform:translateY(20px); } to{ opacity:1; transform:none; } }
        .faq { max-width:860px; margin:42px auto 0; display:grid; gap:12px; }
        .faq-item { border:1px solid rgba(255,255,255,.09); border-radius:18px; overflow:hidden; background:rgba(255,255,255,.035); transition:.25s; }
        .faq-item.open { border-left:4px solid var(--indigo); }
        .faq-q { width:100%; padding:20px; color:white; background:transparent; border:0; text-align:left; font-weight:900; display:flex; justify-content:space-between; cursor:pointer; }
        .faq-a { max-height:0; overflow:hidden; transition:max-height .3s ease; color:#a1a1aa; padding:0 20px; line-height:1.6; }
        .faq-item.open .faq-a { max-height:180px; padding-bottom:20px; }
        .final { position:relative; text-align:center; overflow:hidden; background:radial-gradient(circle at 50% 45%, rgba(99,102,241,.34), transparent 38%), radial-gradient(circle at 60% 55%, rgba(34,211,238,.2), transparent 35%); }
        .particle { position:absolute; width:2px; height:2px; border-radius:50%; background:white; opacity:.45; animation:drift 12s linear infinite; }
        @keyframes drift { to{ transform:translateY(-120px); opacity:0; } }
        .gradient-btn { background:linear-gradient(135deg,var(--indigo),var(--cyan)); padding:18px 28px; color:white; box-shadow:0 0 42px rgba(99,102,241,.38); }
        .footer { position:relative; z-index:1; background:#050508; border-top:1px solid rgba(255,255,255,.08); }
        .footer-inner { max-width:1200px; margin:auto; padding:70px 22px; display:grid; grid-template-columns:1fr 1fr 1fr; gap:36px; }
        .socials { display:flex; gap:10px; margin-top:20px; }
        .socials a { width:40px; height:40px; display:grid; place-items:center; border:1px solid rgba(255,255,255,.1); border-radius:12px; background:rgba(255,255,255,.04); transition:.25s; }
        .socials a:hover { box-shadow:0 0 24px rgba(99,102,241,.4); color:var(--cyan); }
        .footer-links { display:grid; grid-template-columns:1fr 1fr; gap:12px 28px; color:#a1a1aa; font-weight:700; }
        .mini-cta { border:1px solid rgba(255,255,255,.08); border-radius:22px; padding:22px; background:rgba(255,255,255,.04); }
        .bottom { border-top:1px solid rgba(255,255,255,.08); text-align:center; padding:22px; color:#71717a; }
        @media (max-width: 900px) {
          .links,.nav-actions { display:none; } .hamburger { display:block; } .mobile-menu.show { display:flex; }
          .hero { grid-template-columns:1fr; padding-top:40px; } .hero-card-wrap { min-height:500px; }
          .stats-inner,.bento,.steps,.footer-inner { grid-template-columns:1fr; }
          .glass.wide,.glass.full { grid-column:auto; }
          .testimonials { column-count:1; }
        }
        @media (max-width: 560px) {
          .hero h1 { font-size:54px; } .cta-row { flex-direction:column; } .cta-row a { width:100%; }
          .resume-card { transform:scale(.88); } .chip { position:static; margin:8px; display:inline-flex; }
          .stats-inner { grid-template-columns:1fr 1fr; } .stat strong { font-size:42px; }
          .builder-ill { grid-template-columns:1fr; }
        }
      `}</style>

      <div className="mesh"><span /><span /><span /></div>

      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="brand"><span className="diamond" /> ResumeForge</Link>
          <div className="links"><a href="#templates">Templates</a><a href="#features">Features</a><a href="#how">How It Works</a><a href="#faq">FAQ</a></div>
          <div className="nav-actions"><Link className="ghost" href="/login">Log In</Link><Link className="primary" href="/builder/new">Build My CV Free →</Link></div>
          <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu">☰</button>
        </div>
        <div className={`mobile-menu ${mobileOpen ? "show" : ""}`}><a href="#templates">Templates</a><a href="#features">Features</a><a href="#how">How It Works</a><a href="#faq">FAQ</a><Link href="/builder/new">Build My CV Free →</Link></div>
      </nav>

      <section className="section hero">
        <div>
          <div className="eyebrow">✦ 100+ Free Templates · AI-Powered · No Credit Card</div>
          <h1><span>Your Next Job</span><br /><span>Starts With One</span><br /><span><span className="gradient-text">Perfect</span> CV.</span></h1>
          <p className="lead">Build a stunning, ATS-ready resume in minutes. 100+ free templates, AI writing assistant, instant PDF download. Zero paywalls.</p>
          <div className="cta-row"><Link className="primary" href="/builder/new">Start Building Free →</Link><Link className="ghost" href="/templates">Browse Templates</Link></div>
          <div className="proof"><span className="stars">★★★★★</span><b>Trusted by 84,000+ job seekers</b><div className="avatars">{["AK","MR","PS","DL","NC"].map((a) => <span className="avatar" key={a}>{a}</span>)}</div></div>
        </div>
        <div className="hero-card-wrap">
          <span className="chip cyan">↓ PDF Ready</span><span className="chip green">✓ ATS Score: 98</span><span className="chip indigo">⚡ AI Suggestions Ready</span>
          <div className="resume-card">
            <div className="resume-sheet">
              <div className="resume-top"><div className="resume-photo" /><div><h3>Ariana Patel</h3><em>Senior Product Designer</em></div></div>
              <div className="resume-grid"><aside><div className="line" /><div className="line short" /><div className="line med" /><span className="tag">Figma</span><span className="tag">Research</span><span className="tag">Systems</span></aside><main><b>Experience</b><div className="line" /><div className="line med" /><div className="line short" /><br /><b>Projects</b><div className="line" /><div className="line med" /><br /><b>Education</b><div className="line short" /></main></div>
            </div>
          </div>
        </div>
      </section>

      <section className="marquee-section">
        <p className="muted-heading">Our users have landed jobs at</p>
        {[0, 1].map((row) => <div className={`marquee ${row ? "reverse" : ""}`} key={row}><div className="marquee-track">{[...companies, ...companies].map((c, i) => <span className="company" key={`${c}-${i}-${row}`}>{c}</span>)}</div></div>)}
      </section>

      <section className="stats"><div className="stats-inner"><Stat value={100} suffix="+" label="Free Templates" /><Stat value={84000} suffix="+" label="CVs Created" /><Stat value={98} suffix="%" label="ATS Pass Rate" /><Stat value={49} suffix="★" label="User Rating" /></div></section>

      <section className="section center" id="templates">
        <h2>Choose From 100+ Premium Templates</h2><p className="sub">Every single one is free. Every single one gets results.</p>
        <div className="tabs">{tabs.map((tab, i) => <button className={`tab ${i === 0 ? "active" : ""}`} key={tab}>{tab}</button>)}</div>
        <div className="template-scroll">{templates.map((t, i) => <article className="template-card" key={t[0]}><MiniResume index={i} /><div className="template-overlay"><b>{t[0]}</b><span>{t[1]} · {t[2]}</span><Link className="primary" href={`/builder/new?template=modern-0${(i % 8) + 1}`}>Use Template →</Link></div></article>)}</div>
        <Link href="/templates" className="ghost">View All 100+ Templates →</Link>
      </section>

      <section className="section" id="features">
        <div className="center"><h2>Everything You Need. Nothing You Don&apos;t.</h2></div>
        <div className="bento">
          <div className="glass wide"><span style={{ color: "#a5b4fc", fontSize: 28 }}>✦</span> <h3>AI Writing Assistant</h3><p>Turn rough notes into sharp, quantified resume bullets with role-aware suggestions.</p><div className="terminal"><span className="typing" /></div></div>
          <div className="glass"><h3>ATS Score Checker</h3><div className="ring">98%</div><p>Your resume beats 98% of applicants.</p></div>
          <div className="glass"><h3>100+ Templates</h3><div className="tiny-grid">{Array.from({ length: 9 }, (_, i) => <span key={i} />)}</div><p>All free, forever.</p></div>
          <div className="glass"><h3>Instant PDF Export</h3><div className="pdf-icon">PDF</div><p>One click. Perfect formatting.</p></div>
          <div className="glass wide"><h3>Live Preview Builder</h3><p>See your changes update in real time while you write.</p><div className="builder-ill"><div><span /><span /><span /></div><div><span /><span /><span /><span /></div></div></div>
          <div className="glass full"><h3>Free Forever. No Bait. No Paywall.</h3><p>Every template, every AI feature, every PDF export — always free.</p><Link className="gradient-btn" href="/builder/new">Start Building Free</Link></div>
        </div>
      </section>

      <section className="section center" id="how">
        <h2>From Blank Page to Dream Job in 3 Steps</h2>
        <div className="steps">{steps.map((s, i) => <div className="step" key={s[0]}><div className="step-num">0{i + 1}</div><div className="step-visual" /><h3>{s[0]}</h3><p className="sub">{s[1]}</p></div>)}</div>
      </section>

      <section className="section" id="testimonials">
        <div className="center"><h2>84,000 Job Seekers Can&apos;t Be Wrong</h2></div>
        <div className="testimonials">{testimonials.map((t, i) => <article className="quote" style={{ animationDelay: `${i * 70}ms` }} key={t[0]}><div className="stars">★★★★★</div><p>“{t[2]}”</p><b>{t[0]} — {t[1]}</b></article>)}</div>
      </section>

      <section className="section center" id="faq">
        <h2>Quick Answers</h2>
        <div className="faq">{faqs.map((f, i) => <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={f[0]}><button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>{f[0]} <span>{openFaq === i ? "−" : "+"}</span></button><div className="faq-a">{f[1]}</div></div>)}</div>
      </section>

      <section className="section final">
        {Array.from({ length: 28 }, (_, i) => <span className="particle" style={{ left: `${(i * 37) % 100}%`, bottom: `${(i * 19) % 90}px`, animationDelay: `${i * 0.35}s` }} key={i} />)}
        <div className="eyebrow" style={{ margin: "0 auto 22px" }}>✦ Free Forever</div>
        <h2>Your dream job is one CV away.</h2><p className="sub">Join 84,000+ professionals who built their CV with ResumeForge. No credit card. No limits.</p>
        <p style={{ marginTop: 30 }}><Link className="gradient-btn" href="/builder/new">Build My CV Now — It&apos;s Free →</Link></p>
        <p className="sub" style={{ marginTop: 22 }}>Takes less than 5 minutes · Instant PDF download · 100+ templates</p>
      </section>

      <footer className="footer">
        <div className="footer-inner"><div><Link href="/" className="brand"><span className="diamond" /> ResumeForge</Link><p className="sub">Build the resume that gets you hired.</p><div className="socials"><a href="https://x.com" aria-label="X">X</a><a href="https://linkedin.com" aria-label="LinkedIn">in</a><a href="https://instagram.com" aria-label="Instagram">◎</a></div></div><div className="footer-links"><Link href="/templates">Templates</Link><a href="#features">Features</a><a href="#faq">FAQ</a><span>Blog</span><span>Privacy Policy</span><span>Terms of Service</span></div><div className="mini-cta"><h3>Start for Free</h3><p className="sub">Create a premium CV without paying for premium tools.</p><Link className="primary" href="/builder/new">Build My CV</Link></div></div>
        <div className="bottom">© 2026 ResumeForge. All rights reserved.</div>
      </footer>
    </main>
  );
}
