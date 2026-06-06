import type { TemplateVariant } from "@/components/templates/TemplateFrame";
import { createTemplateComponent } from "@/components/templates/factory";
import type { Template } from "@/types/resume";

interface TemplateDefinition {
  id: string;
  name: string;
  category: Template["category"];
  specialty: string;
  description: string;
  tags: string[];
  variant: TemplateVariant;
}

const definitions: TemplateDefinition[] = [
  {
    id: "classic-01",
    name: "Executive Ivory",
    category: "Classic",
    specialty: "Executive Leadership",
    description: "A premium two-column executive resume with a refined serif nameplate, focused sidebar, and boardroom-ready hierarchy.",
    tags: ["executive", "leadership", "corporate", "serif", "two column"],
    variant: { layout: "sidebar-left", header: "serif", font: "Georgia, serif", accent: "left-bar", density: "normal" },
  },
  {
    id: "classic-02",
    name: "Corporate Ledger",
    category: "Classic",
    specialty: "Finance and Consulting",
    description: "A precise single-column format for finance, consulting, and operations roles where clarity and credibility matter.",
    tags: ["finance", "consulting", "operations", "corporate", "ats"],
    variant: { layout: "single", header: "centered", font: "Inter, sans-serif", accent: "top-line", density: "compact" },
  },
  {
    id: "classic-03",
    name: "Legal Counsel",
    category: "Classic",
    specialty: "Legal and Policy",
    description: "Traditional chronological styling with strong section rules, conservative spacing, and polished legal-document typography.",
    tags: ["legal", "policy", "traditional", "chronological", "professional"],
    variant: { layout: "single", header: "bordered", font: "Times New Roman, serif", accent: "none", density: "compact" },
  },
  {
    id: "classic-04",
    name: "Boardroom Blue",
    category: "Classic",
    specialty: "Senior Management",
    description: "A confident color-band header and restrained body layout built for directors, managers, and senior operators.",
    tags: ["management", "director", "executive", "blue", "single column"],
    variant: { layout: "single", header: "band", font: "Inter, sans-serif", accent: "top-line", density: "normal" },
  },
  {
    id: "classic-05",
    name: "Academic Dossier",
    category: "Classic",
    specialty: "Academic CV",
    description: "Education-first structure with publication-style typography for research, teaching, fellowship, and academic applications.",
    tags: ["academic", "research", "education", "cv", "fellowship"],
    variant: {
      layout: "single",
      header: "academic",
      font: "Georgia, serif",
      accent: "none",
      density: "spacious",
      sectionOrder: ["education", "experience", "projects", "skills", "certifications", "languages", "custom"],
    },
  },
  {
    id: "modern-01",
    name: "Tech Sidebar",
    category: "Modern",
    specialty: "Software Engineering",
    description: "A crisp left-sidebar engineering resume with visible skills, strong project emphasis, and recruiter-friendly scanning.",
    tags: ["software", "engineering", "developer", "technical", "sidebar"],
    variant: { layout: "sidebar-left", header: "minimal", font: "Inter, sans-serif", accent: "progress", density: "normal" },
  },
  {
    id: "modern-02",
    name: "Product Gradient",
    category: "Modern",
    specialty: "Product Management",
    description: "Modern gradient header, carded experience blocks, and product-ready storytelling for PM and strategy roles.",
    tags: ["product", "strategy", "manager", "gradient", "cards"],
    variant: { layout: "cards", header: "gradient", font: "Inter, sans-serif", accent: "chips", density: "normal" },
  },
  {
    id: "modern-03",
    name: "Design Signal",
    category: "Modern",
    specialty: "UX/UI Design",
    description: "Bold display typography and clean accent lines for designers who need a contemporary but still professional resume.",
    tags: ["ux", "ui", "design", "portfolio", "bold"],
    variant: { layout: "split", header: "display", font: "Arial, sans-serif", accent: "chips", density: "spacious" },
  },
  {
    id: "modern-04",
    name: "Data Timeline",
    category: "Modern",
    specialty: "Data Science",
    description: "Timeline-based career progression with clear metrics, compact education, and room for technical project signals.",
    tags: ["data", "analytics", "science", "timeline", "metrics"],
    variant: { layout: "timeline", header: "minimal", font: "Inter, sans-serif", accent: "dots", density: "compact" },
  },
  {
    id: "modern-05",
    name: "Revenue Banner",
    category: "Modern",
    specialty: "Sales Leadership",
    description: "A strong banner header with skill badges and outcome-led sections for sales, growth, and customer-facing leaders.",
    tags: ["sales", "growth", "revenue", "leadership", "banner"],
    variant: { layout: "split", header: "band", font: "Inter, sans-serif", accent: "chips", density: "normal" },
  },
  {
    id: "modern-06",
    name: "Security Matrix",
    category: "Modern",
    specialty: "Cybersecurity",
    description: "High-contrast technical layout for cybersecurity, cloud, and infrastructure professionals who need authority fast.",
    tags: ["cybersecurity", "cloud", "infrastructure", "technical", "dark"],
    variant: { layout: "sidebar-right", header: "dark", font: "Inter, sans-serif", accent: "progress", density: "compact" },
  },
  {
    id: "modern-07",
    name: "Founder Pitch",
    category: "Modern",
    specialty: "Startup Founder",
    description: "Magazine-inspired layout for founders and operators, balancing narrative, traction, projects, and leadership credibility.",
    tags: ["founder", "startup", "operator", "magazine", "leadership"],
    variant: { layout: "magazine", header: "diagonal", font: "Inter, sans-serif", accent: "chips", density: "spacious" },
  },
  {
    id: "modern-08",
    name: "Support Pulse",
    category: "Modern",
    specialty: "Customer Success",
    description: "A service-focused resume with clean contact placement, badge skills, and readable impact bullets for CS teams.",
    tags: ["customer success", "support", "saas", "service", "modern"],
    variant: { layout: "cards", header: "centered", font: "Inter, sans-serif", accent: "chips", density: "normal" },
  },
  {
    id: "creative-01",
    name: "Studio Noir",
    category: "Creative",
    specialty: "Brand Designer",
    description: "A dark editorial header, accent rules, and visual skill bars for brand, art direction, and studio portfolios.",
    tags: ["brand", "designer", "creative", "dark", "portfolio"],
    variant: { layout: "single", header: "dark", font: "Inter, sans-serif", accent: "progress", density: "normal" },
  },
  {
    id: "creative-02",
    name: "Editorial Angle",
    category: "Creative",
    specialty: "Art Director",
    description: "Diagonal composition and magazine pacing for creative leaders who want personality without losing professionalism.",
    tags: ["art director", "editorial", "creative", "diagonal", "magazine"],
    variant: { layout: "magazine", header: "diagonal", font: "Arial, sans-serif", accent: "dots", density: "spacious" },
  },
  {
    id: "creative-03",
    name: "Creator Folio",
    category: "Creative",
    specialty: "Content Creator",
    description: "Portfolio-style structure with generous typography and project-forward sections for content and media professionals.",
    tags: ["content", "creator", "media", "portfolio", "projects"],
    variant: { layout: "magazine", header: "display", font: "Georgia, serif", accent: "chips", density: "spacious" },
  },
  {
    id: "creative-04",
    name: "Motion Frame",
    category: "Creative",
    specialty: "Motion Designer",
    description: "A vivid but controlled creative resume with split content, strong visual rhythm, and technical tool highlights.",
    tags: ["motion", "video", "animation", "creative", "split"],
    variant: { layout: "split", header: "gradient", font: "Inter, sans-serif", accent: "progress", density: "normal" },
  },
  {
    id: "minimal-01",
    name: "ATS Pure",
    category: "Minimal",
    specialty: "ATS Specialist",
    description: "Ultra-clean, whitespace-led design that keeps parsing simple while still looking premium and deliberate.",
    tags: ["ats", "minimal", "clean", "one page", "simple"],
    variant: { layout: "single", header: "minimal", font: "Inter, sans-serif", accent: "none", density: "spacious" },
  },
  {
    id: "minimal-02",
    name: "Graduate Line",
    category: "Minimal",
    specialty: "Graduate Resume",
    description: "Elegant small-caps styling, thin accent line, and balanced sections for internships and early-career applications.",
    tags: ["graduate", "student", "internship", "minimal", "early career"],
    variant: { layout: "single", header: "minimal", font: "Georgia, serif", accent: "dots", density: "normal" },
  },
  {
    id: "minimal-03",
    name: "Research Note",
    category: "Minimal",
    specialty: "Research Assistant",
    description: "Quiet academic-minimal layout for research, nonprofit, policy, and writing roles that need calm authority.",
    tags: ["research", "nonprofit", "policy", "writer", "minimal"],
    variant: {
      layout: "split",
      header: "bordered",
      font: "Georgia, serif",
      accent: "top-line",
      density: "spacious",
      sectionOrder: ["education", "projects", "experience", "skills", "certifications", "languages", "custom"],
    },
  },
];

export const templates: Template[] = definitions.map((template) => ({
  ...template,
  thumbnail: `/templates/${template.id}.png`,
  isPremium: false,
  component: createTemplateComponent(template.variant),
}));

export const templateMap = new Map(templates.map((template) => [template.id, template]));

export function getTemplate(id: string) {
  return templateMap.get(id) ?? templates[0];
}
