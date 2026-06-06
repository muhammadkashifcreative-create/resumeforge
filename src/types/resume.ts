import type { ComponentType } from "react";

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  photoUrl: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  category: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url: string;
  github: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface Language {
  id: string;
  language: string;
  proficiency: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  isVisible: boolean;
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  customSections: CustomSection[];
  sectionOrder: ResumeSectionType[];
  visibleSections: Record<ResumeSectionType, boolean>;
}

export interface ResumeTheme {
  primary: string;
  secondary: string;
  accent: string;
  font: string;
  fontSize: "Compact" | "Standard" | "Large";
  spacing: "Tight" | "Comfortable" | "Airy";
  headerStyle: "Classic" | "Band" | "Sidebar" | "Minimal";
}

export type ResumeSectionType =
  | "personal"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "languages"
  | "custom";

export interface TemplateProps {
  data: ResumeData;
  theme: ResumeTheme;
}

export interface Template {
  id: string;
  name: string;
  category: "Classic" | "Modern" | "Creative" | "Minimal";
  thumbnail: string;
  tags: string[];
  isPremium: false;
  component: ComponentType<TemplateProps>;
}

export interface AiUsageRow {
  id: string;
  user_id: string;
  usage_date: string;
  count: number;
}
