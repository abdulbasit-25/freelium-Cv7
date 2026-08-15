import type { ReactNode } from "react";

const BULLET_RE = /^\s*(?:[•\-*\u2022]|\d+[.)])\s+/;

export function hasBullets(text: string): boolean {
  return text
    .split(/\r?\n/)
    .some((line) => line.trim().length > 0 && BULLET_RE.test(line));
}

/** Renders a multiline block as a bulleted list or as paragraphs. */
export function RichText({ text, className }: { text: string; className?: string }) {
  const value = (text ?? "").trim();
  if (!value) return null;

  if (hasBullets(value)) {
    const items = value
      .split(/\r?\n/)
      .map((line) => line.replace(BULLET_RE, "").trim())
      .filter(Boolean);
    return (
      <ul className={`cv-list ${className ?? ""}`}>
        {items.map((item, i) => (
          <li key={i}>{linkify(item)}</li>
        ))}
      </ul>
    );
  }

  const paragraphs = value.split(/\n\s*\n/).map((p) => p.replace(/\s*\n\s*/g, " ").trim());
  return (
    <>
      {paragraphs.filter(Boolean).map((p, i) => (
        <p key={i} className={`cv-paragraph ${className ?? ""}`}>
          {linkify(p)}
        </p>
      ))}
    </>
  );
}

export function ensureHttps(value: string): string {
  const v = value.trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v;
  if (/^mailto:|^tel:/i.test(v)) return v;
  return `https://${v.replace(/^\/+/, "")}`;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="cv-link" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const URL_TOKEN_RE =
  /((?:https?:\/\/|www\.)[^\s,;]+|[a-z0-9-]+(?:\.[a-z0-9-]+)+\/[^\s,;]*)/gi;

/** Turns URL-looking tokens inside free text into real anchors. */
export function linkify(text: string): ReactNode {
  const parts = text.split(URL_TOKEN_RE);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      const clean = part.replace(/[.,;)]+$/, "");
      const trailing = part.slice(clean.length);
      return (
        <span key={i}>
          <ExternalLink href={ensureHttps(clean)}>{clean}</ExternalLink>
          {trailing}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}