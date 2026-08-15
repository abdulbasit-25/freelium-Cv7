import { FileText } from "lucide-react";
import type { CVData } from "@/lib/cv-types";
import { ExternalLink, RichText, ensureHttps, linkify, telHref } from "@/lib/cv-render";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cv-section mt-5">
      <h2 className="cv-section-head">{title}</h2>
      {children}
    </section>
  );
}

function Row({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
      <div className="min-w-0">{left}</div>
      {right ? <div className="cv-meta shrink-0 text-right">{right}</div> : null}
    </div>
  );
}

export function CvPreview({ data }: { data: CVData }) {
  const p = data.personal;
  const hasContent = Boolean(p.fullName.trim() || p.title.trim() || p.email.trim());

  if (!hasContent) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-8 py-24 text-center">
        <FileText className="size-10 text-ink-500" aria-hidden="true" />
        <p className="text-sm text-ink-600">Fill in your details to preview your CV</p>
      </div>
    );
  }

  const contacts: React.ReactNode[] = [];
  if (p.email.trim())
    contacts.push(<ExternalLink href={`mailto:${p.email.trim()}`}>{p.email.trim()}</ExternalLink>);
  if (p.phone.trim())
    contacts.push(<ExternalLink href={telHref(p.phone)}>{p.phone.trim()}</ExternalLink>);
  if (p.location.trim()) contacts.push(<span>{p.location.trim()}</span>);
  if (p.linkedin.trim())
    contacts.push(<ExternalLink href={ensureHttps(p.linkedin)}>{p.linkedin.trim()}</ExternalLink>);
  if (p.github.trim())
    contacts.push(<ExternalLink href={ensureHttps(p.github)}>{p.github.trim()}</ExternalLink>);
  if (p.website.trim())
    contacts.push(<ExternalLink href={ensureHttps(p.website)}>{p.website.trim()}</ExternalLink>);

  const experience = data.experience.filter((e) => e.company || e.jobTitle || e.achievements);
  const education = data.education.filter((e) => e.degree || e.institution || e.details);
  const projects = data.projects.filter((e) => e.name || e.description);
  const skills = data.skills.filter((s) => s.category || s.items);
  const languages = data.languages.filter((l) => l.language);
  const certifications = data.certifications.filter((c) => c.name);
  const custom = data.custom.filter((c) => c.title || c.details);

  return (
    <article>
      <header>
        {p.fullName.trim() ? <h1 className="cv-name">{p.fullName}</h1> : null}
        {p.title.trim() ? <p className="cv-title">{p.title}</p> : null}
        {contacts.length > 0 ? (
          <div className="cv-contact">
            {contacts.map((c, i) => (
              <span key={i}>
                {i > 0 ? <span aria-hidden="true"> · </span> : null}
                {c}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      {data.summary.trim() ? (
        <Section title="Professional Summary">
          <RichText text={data.summary} />
        </Section>
      ) : null}

      {experience.length > 0 ? (
        <Section title="Work Experience">
          {experience.map((e) => (
            <div key={e.id} className="mt-3 first:mt-0">
              <Row
                left={<span className="cv-item-title">{e.jobTitle}</span>}
                right={e.dates}
              />
              <Row
                left={
                  <span className="cv-meta italic">
                    {[e.company, e.location].filter(Boolean).join(" — ")}
                  </span>
                }
              />
              <RichText text={e.achievements} />
            </div>
          ))}
        </Section>
      ) : null}

      {education.length > 0 ? (
        <Section title="Education">
          {education.map((e) => (
            <div key={e.id} className="mt-3 first:mt-0">
              <Row left={<span className="cv-item-title">{e.degree}</span>} right={e.years} />
              <Row
                left={<span className="cv-meta italic">{e.institution}</span>}
                right={e.grade}
              />
              {e.subheading.trim() ? (
                <p className="cv-meta mt-1 font-semibold">{e.subheading}</p>
              ) : null}
              <RichText text={e.details} />
            </div>
          ))}
        </Section>
      ) : null}

      {projects.length > 0 ? (
        <Section title="Projects">
          {projects.map((e) => (
            <div key={e.id} className="mt-3 first:mt-0">
              <Row left={<span className="cv-item-title">{e.name}</span>} right={e.dates} />
              {e.stack.trim() ? <p className="cv-meta italic">{linkify(e.stack)}</p> : null}
              <RichText text={e.description} />
            </div>
          ))}
        </Section>
      ) : null}

      {skills.length > 0 ? (
        <Section title="Skills">
          {skills.map((s) => (
            <p key={s.id} className="mt-1 first:mt-0">
              {s.category.trim() ? <strong>{s.category}: </strong> : null}
              {s.items}
            </p>
          ))}
        </Section>
      ) : null}

      {languages.length > 0 ? (
        <Section title="Languages">
          <p>
            {languages
              .map((l) => [l.language, l.proficiency].filter(Boolean).join(" — "))
              .join(" · ")}
          </p>
        </Section>
      ) : null}

      {certifications.length > 0 ? (
        <Section title="Certifications">
          {certifications.map((c) => (
            <Row
              key={c.id}
              left={<span className="cv-item-title">{c.name}</span>}
              right={c.issuer}
            />
          ))}
        </Section>
      ) : null}

      {custom.map((c) => (
        <Section key={c.id} title={c.title || "Additional"}>
          <RichText text={c.details} />
        </Section>
      ))}
    </article>
  );
}