"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorBlock, Field } from "@/components/builder/editors/fields";
import { useResumeStore } from "@/store/resumeStore";

function BulletEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor: activeEditor }) => onChange(activeEditor.getText().split("\n").filter(Boolean).join("\n")),
    editorProps: {
      attributes: {
        class: "min-h-20 rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white outline-none focus:border-indigo-400",
      },
    },
  });

  return <EditorContent editor={editor} />;
}

export function ExperienceEditor() {
  const experience = useResumeStore((state) => state.resumeData.experience);
  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);

  return (
    <div className="space-y-5">
      {experience.map((job) => (
        <EditorBlock key={job.id} title={job.position || "Experience"}>
          <Field label="Position" value={job.position} onChange={(position) => updateExperience(job.id, { position })} />
          <Field label="Company" value={job.company} onChange={(company) => updateExperience(job.id, { company })} />
          <Field label="Location" value={job.location} onChange={(location) => updateExperience(job.id, { location })} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Start" value={job.startDate} onChange={(startDate) => updateExperience(job.id, { startDate })} />
            <Field label="End" value={job.endDate} onChange={(endDate) => updateExperience(job.id, { endDate })} />
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
            <input type="checkbox" checked={job.current} onChange={(event) => updateExperience(job.id, { current: event.target.checked })} />
            Current role
          </label>
          <div className="space-y-1.5 text-xs font-semibold text-zinc-300">
            Bullets
            <BulletEditor value={job.bullets.join("\n")} onChange={(text) => updateExperience(job.id, { bullets: text.split("\n") })} />
          </div>
          <div className="flex gap-2">
            <Button className="border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.1]" type="button" size="sm" variant="outline" aria-label="Suggest bullets">
              <Wand2 className="size-4" /> AI Suggest Bullets
            </Button>
            <Button className="text-zinc-300 hover:bg-white/[0.08] hover:text-white" type="button" size="sm" variant="ghost" onClick={() => removeExperience(job.id)}>
              Remove
            </Button>
          </div>
        </EditorBlock>
      ))}
      <Button className="bg-indigo-500 text-white hover:bg-indigo-400" type="button" onClick={addExperience}>Add Experience</Button>
    </div>
  );
}
