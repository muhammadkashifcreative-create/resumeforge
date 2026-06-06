"use client";

import { Button } from "@/components/ui/button";
import { EditorBlock, Field } from "@/components/builder/editors/fields";
import { useResumeStore } from "@/store/resumeStore";

export function ProjectsEditor() {
  const projects = useResumeStore((state) => state.resumeData.projects);
  const addProject = useResumeStore((state) => state.addProject);
  const updateProject = useResumeStore((state) => state.updateProject);
  const removeProject = useResumeStore((state) => state.removeProject);

  return (
    <div className="space-y-5">
      {projects.map((project) => (
        <EditorBlock key={project.id} title={project.name || "Project"}>
          <Field label="Name" value={project.name} onChange={(name) => updateProject(project.id, { name })} />
          <Field label="Description" value={project.description} onChange={(description) => updateProject(project.id, { description })} textarea />
          <Field label="Technologies" value={project.technologies.join(", ")} onChange={(value) => updateProject(project.id, { technologies: value.split(",").map((item) => item.trim()).filter(Boolean) })} />
          <Field label="URL" value={project.url} onChange={(url) => updateProject(project.id, { url })} />
          <Field label="GitHub" value={project.github} onChange={(github) => updateProject(project.id, { github })} />
          <Button className="text-zinc-300 hover:bg-white/[0.08] hover:text-white" type="button" size="sm" variant="ghost" onClick={() => removeProject(project.id)}>Remove</Button>
        </EditorBlock>
      ))}
      <Button className="bg-indigo-500 text-white hover:bg-indigo-400" type="button" onClick={addProject}>Add Project</Button>
    </div>
  );
}
