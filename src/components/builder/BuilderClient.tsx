"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Download, Eye, EyeOff, GripVertical, Palette, Plus, Search, Sparkles, UserCircle, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EducationEditor } from "@/components/builder/editors/EducationEditor";
import { ExperienceEditor } from "@/components/builder/editors/ExperienceEditor";
import { CertificationsEditor, CustomSectionEditor, LanguagesEditor } from "@/components/builder/editors/OtherEditors";
import { PersonalEditor } from "@/components/builder/editors/PersonalEditor";
import { ProjectsEditor } from "@/components/builder/editors/ProjectsEditor";
import { SkillsEditor } from "@/components/builder/editors/SkillsEditor";
import { sampleResume, defaultTheme } from "@/lib/sample-resume";
import { getTemplate, templates } from "@/lib/templates/registry";
import { useResumeStore } from "@/store/resumeStore";
import type { ResumeSectionType } from "@/types/resume";
import { TemplatePreview } from "@/components/templates/TemplatePreview";

const sectionLabels: Record<ResumeSectionType, string> = {
  personal: "Personal",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  languages: "Languages",
  custom: "Custom",
};

function SectionRow({ section }: { section: ResumeSectionType }) {
  const activeSection = useResumeStore((state) => state.activeSection);
  const setActiveSection = useResumeStore((state) => state.setActiveSection);
  const toggleSection = useResumeStore((state) => state.toggleSection);
  const visible = useResumeStore((state) => state.resumeData.visibleSections[section]);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: section });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex h-10 items-center gap-2 rounded-md border px-2 text-sm transition ${activeSection === section ? "border-indigo-400 bg-indigo-500/15 text-white" : "border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.07]"}`}
    >
      <button className="text-zinc-500" aria-label={`Move ${sectionLabels[section]}`} {...attributes} {...listeners}>
        <GripVertical className="size-4" />
      </button>
      <button className="min-w-0 flex-1 text-left font-semibold" type="button" onClick={() => setActiveSection(section)}>
        {sectionLabels[section]}
      </button>
      <button type="button" aria-label={`Toggle ${sectionLabels[section]}`} onClick={() => toggleSection(section)}>
        {visible ? <Eye className="size-4 text-cyan-200" /> : <EyeOff className="size-4 text-zinc-500" />}
      </button>
    </div>
  );
}

function ActiveEditor() {
  const activeSection = useResumeStore((state) => state.activeSection);
  if (activeSection === "personal") return <PersonalEditor />;
  if (activeSection === "experience") return <ExperienceEditor />;
  if (activeSection === "education") return <EducationEditor />;
  if (activeSection === "skills") return <SkillsEditor />;
  if (activeSection === "projects") return <ProjectsEditor />;
  if (activeSection === "certifications") return <CertificationsEditor />;
  if (activeSection === "languages") return <LanguagesEditor />;
  return <CustomSectionEditor />;
}

export function BuilderClient({ resumeId }: { resumeId: string }) {
  const [templateId, setTemplateId] = useState("classic-01");
  const [zoom, setZoom] = useState(0.75);
  const [rightTab, setRightTab] = useState<"ai" | "templates">("ai");
  const [templateQuery, setTemplateQuery] = useState("");
  const hydrate = useResumeStore((state) => state.hydrate);
  const resumeData = useResumeStore((state) => state.resumeData);
  const theme = useResumeStore((state) => state.theme);
  const setTheme = useResumeStore((state) => state.setTheme);
  const reorderSections = useResumeStore((state) => state.reorderSections);
  const activeSection = useResumeStore((state) => state.activeSection);
  const isSaving = useResumeStore((state) => state.isSaving);

  useMemo(() => hydrate(resumeId, sampleResume, defaultTheme), [hydrate, resumeId]);
  const template = getTemplate(templateId);
  const TemplateComponent = template.component;
  const filteredTemplates = templates.filter((item) => `${item.name} ${item.tags.join(" ")}`.toLowerCase().includes(templateQuery.toLowerCase())).slice(0, 24);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = resumeData.sectionOrder.indexOf(active.id as ResumeSectionType);
    const newIndex = resumeData.sectionOrder.indexOf(over.id as ResumeSectionType);
    reorderSections(arrayMove(resumeData.sectionOrder, oldIndex, newIndex));
  };

  return (
    <div className="rf-mesh min-h-screen text-white">
      <header className="sticky top-0 z-30 flex min-h-16 flex-wrap items-center gap-3 border-b border-white/10 bg-[#080810]/80 px-3 py-3 backdrop-blur-2xl sm:px-4">
        <Link className="rf-heading inline-flex items-center gap-3 text-lg font-black tracking-tight" href="/">
          <span className="size-7 rotate-45 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-300 shadow-[0_0_24px_rgba(99,102,241,.45)]" />
          ResumeForge
        </Link>
        <input className="h-10 min-w-0 flex-1 rounded-md border border-white/10 bg-white/[0.06] px-3 text-sm font-semibold text-white outline-none placeholder:text-zinc-500 focus:border-indigo-400 sm:max-w-64" defaultValue="Untitled Resume" aria-label="Resume title" />
        <Button className="border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.1]" type="button" variant="outline" onClick={() => setRightTab("templates")}>Template</Button>
        <Button className="bg-indigo-500 text-white shadow-[0_0_24px_rgba(99,102,241,.25)] hover:bg-indigo-400" type="button" asChild>
          <a href={`/api/resume/export?resumeId=${resumeId}&template=${templateId}`}>
            <Download className="size-4" /> Download PDF
          </a>
        </Button>
        <span className="ml-auto text-xs font-bold text-zinc-400">{isSaving ? "Saving..." : "Saved"}</span>
        <button aria-label="User menu"><UserCircle className="size-8 text-zinc-400" /></button>
      </header>

      <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)_300px]">
        <aside className="border-b border-white/10 bg-[#0d0d1f]/75 p-4 backdrop-blur-xl lg:border-b-0 lg:border-r">
          <div className="space-y-4">
            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={resumeData.sectionOrder} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  <SectionRow section="personal" />
                  {resumeData.sectionOrder.map((section) => <SectionRow key={section} section={section} />)}
                </div>
              </SortableContext>
            </DndContext>
            <Button className="w-full border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.1]" type="button" variant="outline"><Plus className="size-4" /> Add Section</Button>
            <div className="space-y-3 rounded-md border border-white/10 bg-white/[0.04] p-3">
              <div className="flex items-center gap-2 text-sm font-black text-white"><Palette className="size-4 text-cyan-200" /> Theme</div>
              <label className="grid gap-1 text-xs font-semibold">
                Primary
                <input className="h-9 w-full" type="color" value={theme.primary} onChange={(event) => setTheme({ primary: event.target.value })} />
              </label>
              <select className="h-10 rounded-md border border-white/10 bg-[#10101f] px-3 text-sm text-white" value={theme.font} onChange={(event) => setTheme({ font: event.target.value })} aria-label="Font">
                <option>Inter</option>
                <option>Georgia</option>
                <option>Arial</option>
                <option>Times New Roman</option>
              </select>
              <select className="h-10 rounded-md border border-white/10 bg-[#10101f] px-3 text-sm text-white" value={theme.spacing} onChange={(event) => setTheme({ spacing: event.target.value as typeof theme.spacing })} aria-label="Spacing">
                <option>Tight</option>
                <option>Comfortable</option>
                <option>Airy</option>
              </select>
            </div>
            <ActiveEditor />
          </div>
        </aside>

        <main className="overflow-auto p-3 sm:p-4">
          <div className="mb-3 flex flex-wrap justify-center gap-2">
            <Button className="border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.1]" type="button" variant="outline" size="sm" onClick={() => setZoom(0.5)}><ZoomOut className="size-4" /> 50%</Button>
            <Button className="border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.1]" type="button" variant="outline" size="sm" onClick={() => setZoom(0.75)}>75%</Button>
            <Button className="border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.1]" type="button" variant="outline" size="sm" onClick={() => setZoom(1)}><ZoomIn className="size-4" /> 100%</Button>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <div className="mx-auto w-[816px] origin-top" style={{ transform: `scale(${zoom})`, height: `${1056 * zoom}px` }}>
              <TemplateComponent data={resumeData} theme={theme} />
            </div>
          </div>
        </main>

        <aside className="border-t border-white/10 bg-[#0d0d1f]/75 p-4 backdrop-blur-xl lg:border-l lg:border-t-0">
          <div className="mb-4 grid grid-cols-2 rounded-md bg-white/[0.06] p-1">
            <button className={`rounded px-3 py-2 text-sm font-bold ${rightTab === "ai" ? "bg-indigo-500 text-white shadow" : "text-zinc-300"}`} onClick={() => setRightTab("ai")}>AI</button>
            <button className={`rounded px-3 py-2 text-sm font-bold ${rightTab === "templates" ? "bg-indigo-500 text-white shadow" : "text-zinc-300"}`} onClick={() => setRightTab("templates")}>Gallery</button>
          </div>
          {rightTab === "ai" ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-black text-white"><Sparkles className="size-4 text-cyan-200" /> {sectionLabels[activeSection]} Assistant</div>
              {["Start bullets with a strong verb.", "Add a metric to prove impact.", "Mirror keywords from the job post.", "Keep each bullet under two lines.", "Prioritize outcomes over tasks."].map((tip) => (
                <p className="rounded-md border border-indigo-400/20 bg-indigo-500/10 p-3 text-sm text-zinc-200" key={tip}>{tip}</p>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <label className="relative block">
                <Search className="absolute left-3 top-2.5 size-4 text-zinc-500" />
                <input className="h-10 w-full rounded-md border border-white/10 bg-white/[0.06] pl-9 pr-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-indigo-400" value={templateQuery} onChange={(event) => setTemplateQuery(event.target.value)} placeholder="Search templates" />
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
                {filteredTemplates.map((item) => (
                  <button className="rounded-md border border-white/10 bg-white/[0.05] p-2 text-left transition hover:border-indigo-400" key={item.id} onClick={() => setTemplateId(item.id)}>
                    <TemplatePreview template={item} className="mb-2" />
                    <div className="text-xs font-black text-white">{item.name}</div>
                    <div className="text-[10px] text-zinc-400">{item.specialty}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
