export type TemplateId = "classic" | "modern" | "minimal" | "executive";

export interface Personal {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  jobTitle: string;
  dates: string;
  achievements: string;
}

export interface Education {
  id: string;
  degree: string;
  years: string;
  institution: string;
  grade: string;
  subheading: string;
  details: string;
}

export interface Project {
  id: string;
  name: string;
  dates: string;
  stack: string;
  description: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  items: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
}

export interface CustomSection {
  id: string;
  title: string;
  details: string;
}

export interface CVData {
  personal: Personal;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: SkillGroup[];
  languages: LanguageItem[];
  certifications: Certification[];
  custom: CustomSection[];
  template: TemplateId;
}

export const newId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const emptyExperience = (): Experience => ({
  id: newId(),
  company: "",
  location: "",
  jobTitle: "",
  dates: "",
  achievements: "",
});
export const emptyEducation = (): Education => ({
  id: newId(),
  degree: "",
  years: "",
  institution: "",
  grade: "",
  subheading: "",
  details: "",
});
export const emptyProject = (): Project => ({
  id: newId(),
  name: "",
  dates: "",
  stack: "",
  description: "",
});
export const emptySkill = (): SkillGroup => ({ id: newId(), category: "", items: "" });
export const emptyLanguage = (): LanguageItem => ({ id: newId(), language: "", proficiency: "" });
export const emptyCertification = (): Certification => ({ id: newId(), name: "", issuer: "" });
export const emptyCustom = (): CustomSection => ({ id: newId(), title: "", details: "" });

export const emptyCV = (): CVData => ({
  personal: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
  },
  summary: "",
  experience: [emptyExperience()],
  education: [emptyEducation()],
  projects: [],
  skills: [emptySkill()],
  languages: [],
  certifications: [],
  custom: [],
  template: "classic",
});

export const STORAGE_KEY = "freelium-cv:v1";

/** Merge unknown parsed JSON into a valid CVData shape. */
export function normalizeCV(input: unknown): CVData {
  const base = emptyCV();
  if (!input || typeof input !== "object") return base;
  const raw = input as Partial<CVData>;
  const withIds = <T extends { id?: string }>(arr: unknown, fallback: () => T): T[] =>
    Array.isArray(arr)
      ? arr.map((item) => ({ ...fallback(), ...(item as T), id: (item as T)?.id ?? newId() }))
      : [];
  return {
    personal: { ...base.personal, ...(raw.personal ?? {}) },
    summary: typeof raw.summary === "string" ? raw.summary : "",
    experience: withIds(raw.experience, emptyExperience),
    education: withIds(raw.education, emptyEducation),
    projects: withIds(raw.projects, emptyProject),
    skills: withIds(raw.skills, emptySkill),
    languages: withIds(raw.languages, emptyLanguage),
    certifications: withIds(raw.certifications, emptyCertification),
    custom: withIds(raw.custom, emptyCustom),
    template: (["classic", "modern", "minimal", "executive"] as const).includes(
      raw.template as TemplateId,
    )
      ? (raw.template as TemplateId)
      : "classic",
  };
}