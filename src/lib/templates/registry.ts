import { createTemplateComponent } from "@/components/templates/factory";
import type { Template } from "@/types/resume";
import type { TemplateVariant } from "@/components/templates/TemplateFrame";

const fullVariants: Record<string, TemplateVariant> = {
  "classic-01": { layout: "sidebar-left", header: "serif", font: "Georgia, serif", accent: "left-bar" },
  "classic-02": { layout: "single", header: "centered", font: "Inter, sans-serif", accent: "top-line" },
  "classic-03": { layout: "single", header: "bordered", font: "Times New Roman, serif", accent: "none", density: "compact" },
  "classic-04": { layout: "single", header: "band", font: "Inter, sans-serif", accent: "top-line" },
  "classic-05": {
    layout: "single",
    header: "academic",
    font: "Georgia, serif",
    accent: "none",
    sectionOrder: ["education", "experience", "projects", "skills", "certifications", "languages", "custom"],
  },
  "modern-01": { layout: "sidebar-left", header: "minimal", font: "Inter, sans-serif", accent: "progress" },
  "modern-02": { layout: "cards", header: "gradient", font: "Inter, sans-serif", accent: "chips" },
  "modern-03": { layout: "single", header: "display", font: "Arial, sans-serif", accent: "top-line" },
  "modern-04": { layout: "timeline", header: "minimal", font: "Inter, sans-serif", accent: "dots" },
  "modern-05": { layout: "split", header: "band", font: "Inter, sans-serif", accent: "chips" },
  "creative-01": { layout: "single", header: "dark", font: "Inter, sans-serif", accent: "progress" },
  "creative-02": { layout: "magazine", header: "diagonal", font: "Arial, sans-serif", accent: "dots" },
  "creative-03": { layout: "magazine", header: "display", font: "Georgia, serif", accent: "chips", density: "spacious" },
  "minimal-01": { layout: "single", header: "minimal", font: "Inter, sans-serif", accent: "none", density: "spacious" },
  "minimal-02": { layout: "single", header: "minimal", font: "Georgia, serif", accent: "dots", density: "compact" },
};

const layouts: TemplateVariant["layout"][] = ["single", "split", "timeline", "cards", "sidebar-left", "sidebar-right", "magazine"];
const headers: TemplateVariant["header"][] = ["serif", "centered", "bordered", "band", "gradient", "display", "dark", "diagonal", "minimal"];
const accents: TemplateVariant["accent"][] = ["left-bar", "top-line", "chips", "progress", "dots", "none"];
const fonts = ["Inter, sans-serif", "Georgia, serif", "Arial, sans-serif", "Times New Roman, serif", "Trebuchet MS, sans-serif"];

function variantFor(category: Template["category"], index: number): TemplateVariant {
  const id = `${category.toLowerCase()}-${String(index).padStart(2, "0")}`;
  if (fullVariants[id]) {
    return fullVariants[id];
  }

  const seed = index + category.length;
  return {
    layout: layouts[seed % layouts.length],
    header: headers[(seed * 2) % headers.length],
    font: fonts[(seed * 3) % fonts.length],
    accent: accents[(seed * 5) % accents.length],
    density: seed % 3 === 0 ? "compact" : seed % 3 === 1 ? "normal" : "spacious",
    sectionOrder:
      seed % 4 === 0
        ? ["skills", "experience", "projects", "education", "certifications", "languages", "custom"]
        : seed % 4 === 1
          ? ["experience", "projects", "skills", "education", "certifications", "languages", "custom"]
          : undefined,
  };
}

function makeTemplate(category: Template["category"], index: number): Template {
  const slug = category.toLowerCase();
  const id = `${slug}-${String(index).padStart(2, "0")}`;
  const variant = variantFor(category, index);

  return {
    id,
    name: `${category} ${String(index).padStart(2, "0")}`,
    category,
    thumbnail: `/templates/${id}.png`,
    tags: [slug, variant.layout, variant.header, variant.accent, variant.font.split(",")[0].toLowerCase()],
    isPremium: false,
    component: createTemplateComponent(variant),
  };
}

const classic = Array.from({ length: 25 }, (_, index) => makeTemplate("Classic", index + 1));
const modern = Array.from({ length: 30 }, (_, index) => makeTemplate("Modern", index + 1));
const creative = Array.from({ length: 25 }, (_, index) => makeTemplate("Creative", index + 1));
const minimal = Array.from({ length: 20 }, (_, index) => makeTemplate("Minimal", index + 1));

export const templates: Template[] = [...classic, ...modern, ...creative, ...minimal];

export const templateMap = new Map(templates.map((template) => [template.id, template]));

export function getTemplate(id: string) {
  return templateMap.get(id) ?? templates[0];
}
