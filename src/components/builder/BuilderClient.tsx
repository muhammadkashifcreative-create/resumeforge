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
      className={`flex h-10 items-center gap-2 rounded-md border px-2 text-sm ${activeSection === section ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white"}`}
    >
      <button className="text-slate-400" aria-label={`Move ${sectionLabels[section]}`} {...attributes} {...listeners}>
        <GripVertical className="size-4" />
      </button>
      <button className="min-w-0 flex-1 text-left font-semibold" type="button" onClick={() => setActiveSection(section)}>
        {sectionLabels[section]}
      </button>
      <button type="button" aria-label={`Toggle ${sectionLabels[section]}`} onClick={() => toggleSection(section)}>
        {visible ? <Eye className="size-4 text-slate-500" /> : <EyeOff className="size-4 text-slate-400" />}
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
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4">
        <Link className="text-lg font-black tracking-tight" href="/">ResumeForge</Link>
        <input className="h-9 max-w-64 rounded-md border border-slate-200 px-3 text-sm font-semibold" defaultValue="Untitled Resume" aria-label="Resume title" />
        <Button type="button" variant="outline" onClick={() => setRightTab("templates")}>Template</Button>
        <Button type="button" asChild>
          <a href={`/api/resume/export?resumeId=${resumeId}&template=${templateId}`}>
            <Download className="size-4" /> Download PDF
          </a>
        </Button>
        <span className="ml-auto text-xs text-slate-500">{isSaving ? "Saving..." : "Saved"}</span>
        <button aria-label="User menu"><UserCircle className="size-8 text-slate-500" /></button>
      </header>

      <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)_300px]">
        <aside className="border-r border-slate-200 bg-white p-4">
          <div className="space-y-4">
            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={resumeData.sectionOrder} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  <SectionRow section="personal" />
                  {resumeData.sectionOrder.map((section) => <SectionRow key={section} section={section} />)}
                </div>
              </SortableContext>
            </DndContext>
            <Button className="w-full" type="button" variant="outline"><Plus className="size-4" /> Add Section</Button>
            <div className="space-y-3 rounded-md border border-slate-200 p-3">
              <div className="flex items-center gap-2 text-sm font-black"><Palette className="size-4" /> Theme</div>
              <label className="grid gap-1 text-xs font-semibold">
                Primary
                <input className="h-9 w-full" type="color" value={theme.primary} onChange={(event) => setTheme({ primary: event.target.value })} />
              </label>
              <select className="h-10 rounded-md border border-slate-200 px-3 text-sm" value={theme.font} onChange={(event) => setTheme({ font: event.target.value })} aria-label="Font">
                <option>Inter</option>
                <option>Georgia</option>
                <option>Arial</option>
                <option>Times New Roman</option>
              </select>
              <select className="h-10 rounded-md border border-slate-200 px-3 text-sm" value={theme.spacing} onChange={(event) => setTheme({ spacing: event.target.value as typeof theme.spacing })} aria-label="Spacing">
                <option>Tight</option>
                <option>Comfortable</option>
                <option>Airy</option>
              </select>
            </div>
            <ActiveEditor />
          </div>
        </aside>

        <main className="overflow-auto p-4">
          <div className="mb-3 flex justify-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setZoom(0.5)}><ZoomOut className="size-4" /> 50%</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setZoom(0.75)}>75%</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setZoom(1)}><ZoomIn className="size-4" /> 100%</Button>
          </div>
          <div className="mx-auto w-[816px] origin-top" style={{ transform: `scale(${zoom})`, height: `${1056 * zoom}px` }}>
            <TemplateComponent data={resumeData} theme={theme} />
          </div>
        </main>

        <aside className="border-l border-slate-200 bg-white p-4">
          <div className="mb-4 grid grid-cols-2 rounded-md bg-slate-100 p-1">
            <button className={`rounded px-3 py-2 text-sm font-bold ${rightTab === "ai" ? "bg-white shadow" : ""}`} onClick={() => setRightTab("ai")}>AI</button>
            <button className={`rounded px-3 py-2 text-sm font-bold ${rightTab === "templates" ? "bg-white shadow" : ""}`} onClick={() => setRightTab("templates")}>Gallery</button>
          </div>
          {rightTab === "ai" ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-black"><Sparkles className="size-4 text-blue-600" /> {sectionLabels[activeSection]} Assistant</div>
              {["Start bullets with a strong verb.", "Add a metric to prove impact.", "Mirror keywords from the job post.", "Keep each bullet under two lines.", "Prioritize outcomes over tasks."].map((tip) => (
                <p className="rounded-md border border-blue-100 bg-blue-50 p-3 text-sm text-blue-950" key={tip}>{tip}</p>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <label className="relative block">
                <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
                <input className="h-10 w-full rounded-md border border-slate-200 pl-9 pr-3 text-sm" value={templateQuery} onChange={(event) => setTemplateQuery(event.target.value)} placeholder="Search templates" />
              </label>
              <div className="grid grid-cols-2 gap-2">
                {filteredTemplates.map((item) => (
                  <button className="rounded-md border border-slate-200 p-2 text-left hover:border-blue-500" key={item.id} onClick={() => setTemplateId(item.id)}>
                    <div className="mb-2 aspect-[3/4] rounded bg-gradient-to-br from-slate-100 to-blue-100" />
                    <div className="text-xs font-black">{item.name}</div>
                    <div className="text-[10px] text-slate-500">{item.category}</div>
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
