import type { CVData } from "@/lib/cv-types";
import {
  emptyCertification,
  emptyCustom,
  emptyEducation,
  emptyExperience,
  emptyLanguage,
  emptyProject,
  emptySkill,
} from "@/lib/cv-types";
import { AddButton, BULLET_HINT, Field, RepeatCard, SectionBlock, TextArea } from "./fields";

type Setter = (updater: (prev: CVData) => CVData) => void;

export function CvForm({ data, setData }: { data: CVData; setData: Setter }) {
  const setPersonal = (key: keyof CVData["personal"]) => (v: string) =>
    setData((prev) => ({ ...prev, personal: { ...prev.personal, [key]: v } }));

  function listOps<K extends "experience" | "education" | "projects" | "skills" | "languages" | "certifications" | "custom">(
    key: K,
    factory: () => CVData[K][number],
  ) {
    return {
      add: () => setData((prev) => ({ ...prev, [key]: [...prev[key], factory()] }) as CVData),
      remove: (id: string) =>
        setData(
          (prev) => ({ ...prev, [key]: (prev[key] as { id: string }[]).filter((i) => i.id !== id) }) as CVData,
        ),
      update: (id: string, field: string, value: string) =>
        setData(
          (prev) =>
            ({
              ...prev,
              [key]: (prev[key] as { id: string }[]).map((i) =>
                i.id === id ? { ...i, [field]: value } : i,
              ),
            }) as CVData,
        ),
    };
  }

  const exp = listOps("experience", emptyExperience);
  const edu = listOps("education", emptyEducation);
  const proj = listOps("projects", emptyProject);
  const skill = listOps("skills", emptySkill);
  const lang = listOps("languages", emptyLanguage);
  const cert = listOps("certifications", emptyCertification);
  const custom = listOps("custom", emptyCustom);

  return (
    <div className="pb-16">
      <SectionBlock title="Personal information">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Full name" value={data.personal.fullName} onChange={setPersonal("fullName")} placeholder="Aisha Rahman" />
          <Field label="Professional title" value={data.personal.title} onChange={setPersonal("title")} placeholder="Product Designer" />
          <Field label="Email" type="email" value={data.personal.email} onChange={setPersonal("email")} placeholder="aisha@example.com" />
          <Field label="Phone" value={data.personal.phone} onChange={setPersonal("phone")} placeholder="+92 300 1234567" />
          <Field label="Location" value={data.personal.location} onChange={setPersonal("location")} placeholder="Karachi, PK" />
          <Field label="LinkedIn" value={data.personal.linkedin} onChange={setPersonal("linkedin")} placeholder="linkedin.com/in/aisha" />
          <Field label="GitHub / portfolio" value={data.personal.github} onChange={setPersonal("github")} placeholder="github.com/aisha" />
          <Field label="Website" value={data.personal.website} onChange={setPersonal("website")} placeholder="aisha.design" />
        </div>
      </SectionBlock>

      <SectionBlock title="Professional summary">
        <TextArea
          label="Summary"
          rows={4}
          value={data.summary}
          onChange={(v) => setData((prev) => ({ ...prev, summary: v }))}
          placeholder="2–3 sentences about your focus and strengths."
          hint={BULLET_HINT}
        />
      </SectionBlock>

      <SectionBlock title="Work experience">
        {data.experience.map((item) => (
          <RepeatCard key={item.id} onRemove={() => exp.remove(item.id)} removeLabel="Remove this experience">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Company" value={item.company} onChange={(v) => exp.update(item.id, "company", v)} />
              <Field label="Location" value={item.location} onChange={(v) => exp.update(item.id, "location", v)} />
              <Field label="Job title" value={item.jobTitle} onChange={(v) => exp.update(item.id, "jobTitle", v)} />
              <Field label="Dates" value={item.dates} onChange={(v) => exp.update(item.id, "dates", v)} placeholder="2022 — Present" />
            </div>
            <TextArea
              label="Achievements"
              value={item.achievements}
              onChange={(v) => exp.update(item.id, "achievements", v)}
              hint={BULLET_HINT}
            />
          </RepeatCard>
        ))}
        <AddButton label="Add experience" onClick={exp.add} />
      </SectionBlock>

      <SectionBlock title="Education">
        {data.education.map((item) => (
          <RepeatCard key={item.id} onRemove={() => edu.remove(item.id)} removeLabel="Remove this education entry">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Degree / qualification" value={item.degree} onChange={(v) => edu.update(item.id, "degree", v)} />
              <Field label="Years" value={item.years} onChange={(v) => edu.update(item.id, "years", v)} />
              <Field label="Institution" value={item.institution} onChange={(v) => edu.update(item.id, "institution", v)} />
              <Field label="GPA / grade" value={item.grade} onChange={(v) => edu.update(item.id, "grade", v)} />
            </div>
            <Field label="Sub-heading (optional)" value={item.subheading} onChange={(v) => edu.update(item.id, "subheading", v)} placeholder="Relevant Coursework" />
            <TextArea label="Details" value={item.details} onChange={(v) => edu.update(item.id, "details", v)} hint={BULLET_HINT} />
          </RepeatCard>
        ))}
        <AddButton label="Add education" onClick={edu.add} />
      </SectionBlock>

      <SectionBlock title="Projects">
        {data.projects.map((item) => (
          <RepeatCard key={item.id} onRemove={() => proj.remove(item.id)} removeLabel="Remove this project">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Project name" value={item.name} onChange={(v) => proj.update(item.id, "name", v)} />
              <Field label="Dates" value={item.dates} onChange={(v) => proj.update(item.id, "dates", v)} />
            </div>
            <Field label="Tech stack / link" value={item.stack} onChange={(v) => proj.update(item.id, "stack", v)} placeholder="React, TypeScript — github.com/you/project" />
            <TextArea label="Description" value={item.description} onChange={(v) => proj.update(item.id, "description", v)} hint={BULLET_HINT} />
          </RepeatCard>
        ))}
        <AddButton label="Add project" onClick={proj.add} />
      </SectionBlock>

      <SectionBlock title="Skills">
        {data.skills.map((item) => (
          <RepeatCard key={item.id} onRemove={() => skill.remove(item.id)} removeLabel="Remove this skill group">
            <Field label="Category" value={item.category} onChange={(v) => skill.update(item.id, "category", v)} placeholder="Design" />
            <Field label="Skills (comma separated)" value={item.items} onChange={(v) => skill.update(item.id, "items", v)} placeholder="Figma, Prototyping, Design systems" />
          </RepeatCard>
        ))}
        <AddButton label="Add skill group" onClick={skill.add} />
      </SectionBlock>

      <SectionBlock title="Languages">
        {data.languages.map((item) => (
          <RepeatCard key={item.id} onRemove={() => lang.remove(item.id)} removeLabel="Remove this language">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Language" value={item.language} onChange={(v) => lang.update(item.id, "language", v)} />
              <Field label="Proficiency" value={item.proficiency} onChange={(v) => lang.update(item.id, "proficiency", v)} placeholder="Native" />
            </div>
          </RepeatCard>
        ))}
        <AddButton label="Add language" onClick={lang.add} />
      </SectionBlock>

      <SectionBlock title="Certifications">
        {data.certifications.map((item) => (
          <RepeatCard key={item.id} onRemove={() => cert.remove(item.id)} removeLabel="Remove this certification">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Certification" value={item.name} onChange={(v) => cert.update(item.id, "name", v)} />
              <Field label="Issuer / year" value={item.issuer} onChange={(v) => cert.update(item.id, "issuer", v)} />
            </div>
          </RepeatCard>
        ))}
        <AddButton label="Add certification" onClick={cert.add} />
      </SectionBlock>

      <SectionBlock title="Custom sections">
        {data.custom.map((item) => (
          <RepeatCard key={item.id} onRemove={() => custom.remove(item.id)} removeLabel="Remove this custom section">
            <Field label="Section title" value={item.title} onChange={(v) => custom.update(item.id, "title", v)} placeholder="Volunteering" />
            <TextArea label="Details" value={item.details} onChange={(v) => custom.update(item.id, "details", v)} hint={BULLET_HINT} />
          </RepeatCard>
        ))}
        <AddButton label="Add custom section" onClick={custom.add} />
      </SectionBlock>
    </div>
  );
}