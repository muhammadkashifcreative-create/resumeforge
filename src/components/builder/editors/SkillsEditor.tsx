"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/builder/editors/fields";
import { useResumeStore } from "@/store/resumeStore";
import type { SkillLevel } from "@/types/resume";

const levels: SkillLevel[] = ["Beginner", "Intermediate", "Advanced", "Expert"];

export function SkillsEditor() {
  const skills = useResumeStore((state) => state.resumeData.skills);
  const addSkill = useResumeStore((state) => state.addSkill);
  const updateSkill = useResumeStore((state) => state.updateSkill);
  const removeSkill = useResumeStore((state) => state.removeSkill);

  return (
    <div className="space-y-3">
      {skills.map((skill) => (
        <div className="grid gap-2 rounded-md border border-slate-200 p-3" key={skill.id}>
          <Field label="Skill" value={skill.name} onChange={(name) => updateSkill(skill.id, { name })} />
          <Field label="Category" value={skill.category} onChange={(category) => updateSkill(skill.id, { category })} />
          <select className="h-10 rounded-md border border-slate-200 px-3 text-sm" value={skill.level} onChange={(event) => updateSkill(skill.id, { level: event.target.value as SkillLevel })}>
            {levels.map((level) => <option key={level}>{level}</option>)}
          </select>
          <Button type="button" size="sm" variant="ghost" onClick={() => removeSkill(skill.id)}>Remove</Button>
        </div>
      ))}
      <Button type="button" onClick={addSkill}>Add Skill</Button>
    </div>
  );
}
