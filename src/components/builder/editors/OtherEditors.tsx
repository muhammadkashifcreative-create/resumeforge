"use client";

import { EditorBlock, Field } from "@/components/builder/editors/fields";
import { useResumeStore } from "@/store/resumeStore";

export function CertificationsEditor() {
  const certifications = useResumeStore((state) => state.resumeData.certifications);
  const updateCertification = useResumeStore((state) => state.updateCertification);
  return (
    <div className="space-y-3">
      {certifications.map((cert) => (
        <EditorBlock key={cert.id} title={cert.name || "Certification"}>
          <Field label="Name" value={cert.name} onChange={(name) => updateCertification(cert.id, { name })} />
          <Field label="Issuer" value={cert.issuer} onChange={(issuer) => updateCertification(cert.id, { issuer })} />
          <Field label="Date" value={cert.date} onChange={(date) => updateCertification(cert.id, { date })} />
          <Field label="URL" value={cert.url} onChange={(url) => updateCertification(cert.id, { url })} />
        </EditorBlock>
      ))}
    </div>
  );
}

export function LanguagesEditor() {
  const languages = useResumeStore((state) => state.resumeData.languages);
  const updateLanguage = useResumeStore((state) => state.updateLanguage);
  return (
    <div className="space-y-3">
      {languages.map((language) => (
        <EditorBlock key={language.id} title={language.language || "Language"}>
          <Field label="Language" value={language.language} onChange={(value) => updateLanguage(language.id, { language: value })} />
          <Field label="Proficiency" value={language.proficiency} onChange={(proficiency) => updateLanguage(language.id, { proficiency })} />
        </EditorBlock>
      ))}
    </div>
  );
}

export function CustomSectionEditor() {
  const customSections = useResumeStore((state) => state.resumeData.customSections);
  const updateCustomSection = useResumeStore((state) => state.updateCustomSection);
  return (
    <div className="space-y-3">
      {customSections.length === 0 ? <p className="text-sm text-zinc-400">Custom sections can be added from the section list.</p> : null}
      {customSections.map((section) => (
        <EditorBlock key={section.id} title={section.title || "Custom section"}>
          <Field label="Title" value={section.title} onChange={(title) => updateCustomSection(section.id, { title })} />
          <Field label="Content" value={section.content} onChange={(content) => updateCustomSection(section.id, { content })} textarea />
        </EditorBlock>
      ))}
    </div>
  );
}
