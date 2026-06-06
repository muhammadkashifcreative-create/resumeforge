import { sampleResume, defaultTheme } from "@/lib/sample-resume";
import type { Template } from "@/types/resume";

const palette = [
  ["#2563eb", "#0f172a", "#38bdf8"],
  ["#059669", "#111827", "#14b8a6"],
  ["#7c3aed", "#18181b", "#f59e0b"],
  ["#dc2626", "#111827", "#fb7185"],
  ["#0f766e", "#111827", "#22d3ee"],
  ["#9333ea", "#171717", "#f97316"],
  ["#1d4ed8", "#0f172a", "#84cc16"],
  ["#be123c", "#1f2937", "#fbbf24"],
];

export function TemplatePreview({ template, className = "" }: { template: Template; className?: string }) {
  const TemplateComponent = template.component;
  const colors = palette[template.id.charCodeAt(template.id.length - 1) % palette.length];

  return (
    <div className={`relative mx-auto aspect-[210/297] w-full max-w-[230px] overflow-hidden rounded-md bg-slate-200 ${className}`}>
      <div className="absolute left-1/2 top-0 origin-top-left -translate-x-1/2 scale-[0.282]">
        <div className="w-[816px] [&_article]:min-h-[1056px] [&_article]:shadow-none">
          <TemplateComponent
            data={sampleResume}
            theme={{
              ...defaultTheme,
              primary: colors[0],
              secondary: colors[1],
              accent: colors[2],
              fontSize: "Compact",
              spacing: "Tight",
            }}
          />
        </div>
      </div>
    </div>
  );
}
