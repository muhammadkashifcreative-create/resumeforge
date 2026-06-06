import type { ResumeData, ResumeTheme } from "@/types/resume";

export const defaultTheme: ResumeTheme = {
  primary: "#2563eb",
  secondary: "#111827",
  accent: "#38bdf8",
  font: "Inter",
  fontSize: "Standard",
  spacing: "Comfortable",
  headerStyle: "Classic",
};

export const sampleResume: ResumeData = {
  personal: {
    fullName: "Ariana Patel",
    jobTitle: "Senior Product Designer",
    email: "ariana.patel@example.com",
    phone: "+1 415 555 0189",
    location: "San Francisco, CA",
    website: "arianapatel.design",
    linkedin: "linkedin.com/in/arianapatel",
    github: "github.com/arianapatel",
    summary:
      "Product designer with 8 years of experience turning complex SaaS workflows into accessible, high-converting experiences for global teams.",
    photoUrl: "",
  },
  experience: [
    {
      id: "exp-1",
      company: "Northstar Labs",
      position: "Senior Product Designer",
      location: "Remote",
      startDate: "2021-03",
      endDate: "",
      current: true,
      bullets: [
        "Led the redesign of a multi-product analytics suite, increasing task completion by 34% across enterprise accounts.",
        "Partnered with engineering and research to ship an accessible design system used by 12 product squads.",
        "Facilitated customer discovery programs that reduced onboarding friction and lifted activation by 21%.",
      ],
    },
    {
      id: "exp-2",
      company: "Luma Health",
      position: "UX Designer",
      location: "New York, NY",
      startDate: "2017-06",
      endDate: "2021-02",
      current: false,
      bullets: [
        "Designed patient scheduling flows adopted by 600+ clinics, reducing support tickets by 18%.",
        "Created prototype testing rituals that shortened validation cycles from weeks to days.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "Carnegie Mellon University",
      degree: "M.Des",
      field: "Interaction Design",
      startDate: "2015",
      endDate: "2017",
      gpa: "3.9",
      achievements: ["Graduate research assistant", "Human-centered AI thesis distinction"],
    },
  ],
  skills: [
    { id: "skill-1", name: "Product Strategy", level: "Expert", category: "Design" },
    { id: "skill-2", name: "Figma", level: "Expert", category: "Tools" },
    { id: "skill-3", name: "User Research", level: "Advanced", category: "Research" },
    { id: "skill-4", name: "Design Systems", level: "Expert", category: "Design" },
    { id: "skill-5", name: "Accessibility", level: "Advanced", category: "Quality" },
  ],
  projects: [
    {
      id: "project-1",
      name: "Atlas Design System",
      description: "Cross-platform component system with accessibility tokens, coded specs, and adoption analytics.",
      technologies: ["Figma", "Storybook", "React"],
      url: "atlas.example.com",
      github: "",
    },
  ],
  certifications: [
    { id: "cert-1", name: "Certified Scrum Product Owner", issuer: "Scrum Alliance", date: "2022", url: "" },
  ],
  languages: [
    { id: "lang-1", language: "English", proficiency: "Native" },
    { id: "lang-2", language: "Spanish", proficiency: "Professional" },
  ],
  customSections: [],
  sectionOrder: ["experience", "education", "skills", "projects", "certifications", "languages", "custom"],
  visibleSections: {
    personal: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: true,
    languages: true,
    custom: true,
  },
};
