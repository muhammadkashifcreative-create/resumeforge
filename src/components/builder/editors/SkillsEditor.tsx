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
        <div className="grid gap-2 rounded-md border border-white/10 bg-white/[0.04] p-3" key={skill.id}>
          <Field label="Skill" value={skill.name} onChange={(name) => updateSkill(skill.id, { name })} />
          <Field label="Category" value={skill.category} onChange={(category) => updateSkill(skill.id, { category })} />
          <select className="h-10 rounded-md border border-white/10 bg-[#10101f] px-3 text-sm text-white" value={skill.level} onChange={(event) => updateSkill(skill.id, { level: event.target.value as SkillLevel })}>
            {levels.map((level) => <option key={level}>{level}</option>)}
          </select>
          <Button className="text-zinc-300 hover:bg-white/[0.08] hover:text-white" type="button" size="sm" variant="ghost" onClick={() => removeSkill(skill.id)}>Remove</Button>
        </div>
      ))}
      <Button className="bg-indigo-500 text-white hover:bg-indigo-400" type="button" onClick={addSkill}>Add Skill</Button>
    </div>
  );
}
