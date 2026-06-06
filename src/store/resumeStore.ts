"use client";

import { create } from "zustand";
import { sampleResume, defaultTheme } from "@/lib/sample-resume";
import { createClient } from "@/lib/supabase/client";
import type {
  Education,
  PersonalInfo,
  Project,
  ResumeData,
  ResumeSectionType,
  ResumeTheme,
  Skill,
  WorkExperience,
} from "@/types/resume";

const createId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;

const emptyExperience = (): WorkExperience => ({
  id: createId("exp"),
  company: "",
  position: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  bullets: [""],
});

const emptyEducation = (): Education => ({
  id: createId("edu"),
  institution: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  gpa: "",
  achievements: [""],
});

const emptySkill = (): Skill => ({
  id: createId("skill"),
  name: "",
  level: "Intermediate",
  category: "Core",
});

const emptyProject = (): Project => ({
  id: createId("project"),
  name: "",
  description: "",
  technologies: [],
  url: "",
  github: "",
});

interface ResumeStore {
  resumeId: string | null;
  resumeData: ResumeData;
  theme: ResumeTheme;
  activeSection: ResumeSectionType;
  isDirty: boolean;
  isSaving: boolean;
  saveError: string;
  hydrate: (resumeId: string, data?: ResumeData, theme?: ResumeTheme) => void;
  updatePersonal: (patch: Partial<PersonalInfo>) => void;
  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<WorkExperience>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, patch: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  removeProject: (id: string) => void;
  updateCertification: (id: string, patch: { name?: string; issuer?: string; date?: string; url?: string }) => void;
  updateLanguage: (id: string, patch: { language?: string; proficiency?: string }) => void;
  updateCustomSection: (id: string, patch: { title?: string; content?: string }) => void;
  setTheme: (patch: Partial<ResumeTheme>) => void;
  setActiveSection: (section: ResumeSectionType) => void;
  reorderSections: (sections: ResumeSectionType[]) => void;
  toggleSection: (section: ResumeSectionType) => void;
  saveNow: () => Promise<void>;
}

let saveTimer: ReturnType<typeof setTimeout> | undefined;

const scheduleSave = (saveNow: () => Promise<void>) => {
  if (saveTimer) {
    clearTimeout(saveTimer);
  }
  saveTimer = setTimeout(() => {
    void saveNow();
  }, 1000);
};

export const useResumeStore = create<ResumeStore>((set, get) => ({
  resumeId: null,
  resumeData: sampleResume,
  theme: defaultTheme,
  activeSection: "personal",
  isDirty: false,
  isSaving: false,
  saveError: "",
  hydrate: (resumeId, data = sampleResume, theme = defaultTheme) =>
    set({ resumeId, resumeData: data, theme, isDirty: false, saveError: "" }),
  updatePersonal: (patch) => {
    set((state) => ({
      resumeData: { ...state.resumeData, personal: { ...state.resumeData.personal, ...patch } },
      isDirty: true,
    }));
    scheduleSave(get().saveNow);
  },
  addExperience: () => {
    set((state) => ({
      resumeData: { ...state.resumeData, experience: [...state.resumeData.experience, emptyExperience()] },
      isDirty: true,
    }));
    scheduleSave(get().saveNow);
  },
  updateExperience: (id, patch) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      },
      isDirty: true,
    }));
    scheduleSave(get().saveNow);
  },
  removeExperience: (id) => {
    set((state) => ({
      resumeData: { ...state.resumeData, experience: state.resumeData.experience.filter((item) => item.id !== id) },
      isDirty: true,
    }));
    scheduleSave(get().saveNow);
  },
  addEducation: () => {
    set((state) => ({
      resumeData: { ...state.resumeData, education: [...state.resumeData.education, emptyEducation()] },
      isDirty: true,
    }));
    scheduleSave(get().saveNow);
  },
  updateEducation: (id, patch) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      },
      isDirty: true,
    }));
    scheduleSave(get().saveNow);
  },
  removeEducation: (id) => {
    set((state) => ({
      resumeData: { ...state.resumeData, education: state.resumeData.education.filter((item) => item.id !== id) },
      isDirty: true,
    }));
    scheduleSave(get().saveNow);
  },
  addSkill: () => {
    set((state) => ({
      resumeData: { ...state.resumeData, skills: [...state.resumeData.skills, emptySkill()] },
      isDirty: true,
    }));
    scheduleSave(get().saveNow);
  },
  updateSkill: (id, patch) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      },
      isDirty: true,
    }));
    scheduleSave(get().saveNow);
  },
  removeSkill: (id) => {
    set((state) => ({
      resumeData: { ...state.resumeData, skills: state.resumeData.skills.filter((item) => item.id !== id) },
      isDirty: true,
    }));
    scheduleSave(get().saveNow);
  },
  addProject: () => {
    set((state) => ({
      resumeData: { ...state.resumeData, projects: [...state.resumeData.projects, emptyProject()] },
      isDirty: true,
    }));
    scheduleSave(get().saveNow);
  },
  updateProject: (id, patch) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      },
      isDirty: true,
    }));
    scheduleSave(get().saveNow);
  },
  removeProject: (id) => {
    set((state) => ({
      resumeData: { ...state.resumeData, projects: state.resumeData.projects.filter((item) => item.id !== id) },
      isDirty: true,
    }));
    scheduleSave(get().saveNow);
  },
  updateCertification: (id, patch) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        certifications: state.resumeData.certifications.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      },
      isDirty: true,
    }));
    scheduleSave(get().saveNow);
  },
  updateLanguage: (id, patch) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        languages: state.resumeData.languages.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      },
      isDirty: true,
    }));
    scheduleSave(get().saveNow);
  },
  updateCustomSection: (id, patch) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        customSections: state.resumeData.customSections.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      },
      isDirty: true,
    }));
    scheduleSave(get().saveNow);
  },
  setTheme: (patch) => {
    set((state) => ({ theme: { ...state.theme, ...patch }, isDirty: true }));
    scheduleSave(get().saveNow);
  },
  setActiveSection: (section) => set({ activeSection: section }),
  reorderSections: (sections) => {
    set((state) => ({ resumeData: { ...state.resumeData, sectionOrder: sections }, isDirty: true }));
    scheduleSave(get().saveNow);
  },
  toggleSection: (section) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        visibleSections: {
          ...state.resumeData.visibleSections,
          [section]: !state.resumeData.visibleSections[section],
        },
      },
      isDirty: true,
    }));
    scheduleSave(get().saveNow);
  },
  saveNow: async () => {
    const { resumeId, resumeData, theme } = get();
    if (!resumeId || resumeId === "new") {
      return;
    }

    set({ isSaving: true, saveError: "" });
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("resumes")
        .update({ theme, updated_at: new Date().toISOString() })
        .eq("id", resumeId);

      if (error) {
        throw error;
      }

      await supabase.from("resume_sections").upsert(
        [
          {
            resume_id: resumeId,
            type: "resumeData",
            title: "Resume Data",
            content: resumeData,
            order_index: 0,
            is_visible: true,
          },
        ],
        { onConflict: "resume_id,type" },
      );

      set({ isDirty: false, isSaving: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save resume.";
      set({ isSaving: false, saveError: message });
    }
  },
}));
