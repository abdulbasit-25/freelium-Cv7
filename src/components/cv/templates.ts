import type { TemplateId } from "@/lib/cv-types";

export const TEMPLATES: { id: TemplateId; label: string; blurb: string }[] = [
  { id: "classic", label: "Classic", blurb: "Times New Roman, understated" },
  { id: "modern", label: "Modern", blurb: "Sans-serif, navy accents" },
  { id: "minimal", label: "Minimal", blurb: "Georgia, airy and quiet" },
  { id: "executive", label: "Executive", blurb: "Palatino, maroon & gold" },
];