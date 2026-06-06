"use client";

import { Button } from "@/components/ui/button";
import { EditorBlock, Field } from "@/components/builder/editors/fields";
import { useResumeStore } from "@/store/resumeStore";

export function EducationEditor() {
  const education = useResumeStore((state) => state.resumeData.education);
  const addEducation = useResumeStore((state) => state.addEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);

  return (
    <div className="space-y-5">
      {education.map((school) => (
        <EditorBlock key={school.id} title={school.institution || "Education"}>
          <Field label="Institution" value={school.institution} onChange={(institution) => updateEducation(school.id, { institution })} />
          <Field label="Degree" value={school.degree} onChange={(degree) => updateEducation(school.id, { degree })} />
          <Field label="Field" value={school.field} onChange={(field) => updateEducation(school.id, { field })} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Start" value={school.startDate} onChange={(startDate) => updateEducation(school.id, { startDate })} />
            <Field label="End" value={school.endDate} onChange={(endDate) => updateEducation(school.id, { endDate })} />
          </div>
          <Field label="GPA" value={school.gpa} onChange={(gpa) => updateEducation(school.id, { gpa })} />
          <Field label="Achievements" value={school.achievements.join("\n")} onChange={(value) => updateEducation(school.id, { achievements: value.split("\n") })} textarea />
          <Button type="button" size="sm" variant="ghost" onClick={() => removeEducation(school.id)}>Remove</Button>
        </EditorBlock>
      ))}
      <Button type="button" onClick={addEducation}>Add Education</Button>
    </div>
  );
}
