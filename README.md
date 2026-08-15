# CV Canvas

FREELIUM CV (Resume Builder)

## Project Overview

Build FREELIUM CV, a single-page resume/CV builder web app with a live split-screen editor: a form sidebar on the left, and a real-time rendered CV preview on the right, styled like an actual printed resume (serif typography, paper-like sheet on a neutral background).

Tech Stack

React + TypeScript (Vite)

Tailwind CSS

All state in React (useState/useReducer or zustand) — no backend, no database

localStorage for autosave/session persistence

Client-side only — no auth, no server

Layout

Two-column fixed-height shell (100vh, no page scroll):

Left sidebar (~390px fixed width): top bar with logo/branding + a live "saving" pulse indicator, a horizontal toolbar (Export / Import / Clear / Print-PDF / Info), a 4-button template switcher (Classic / Modern / Minimal / Executive), then a scrollable form with the sections below.

Right panel: centered, scrollable, light-gray background (#c8c8cc) holding a white "paper" sheet (fixed width ~680px, generous padding, drop shadow) representing the rendered CV. Shows a friendly empty state (icon + "Fill in your details to preview your CV") until the user enters a name/title/email.

Responsive requirement: the current version breaks completely below ~1000px viewport width (fixed grid, overflow:hidden on html,body). Fix this — collapse to a single-column stacked layout on smaller screens (form on top, a "Preview" toggle/tab to view the CV), and never trap the user with no scroll.

Form Sections (in order)

Personal information: full name, professional title, email, phone, location, LinkedIn, GitHub/portfolio, website

Professional summary: 2–3 sentence textarea

Work experience (repeatable cards): company, location, job title, dates, achievements (textarea — see bullet/paragraph rule below), each card removable

Education (repeatable cards): degree/qualification, years, institution, GPA/grade, optional sub-heading (e.g. "Relevant Coursework"), details textarea

Projects (repeatable cards): project name, dates, tech stack/link field, description textarea

Skills (repeatable cards): category label + comma-separated skills list

Languages (repeatable cards): language + proficiency

Certifications (repeatable cards): certification name + issuer/year

Custom section(s) (repeatable, user-named): section title + free-text details

Each repeatable section has an "+ Add [item]" dashed button at the bottom, and each card has a small "✕ Remove" button in its top-right corner.

Smart Text Rendering Rule (important)

Any multi-line textarea (achievements, education details, project descriptions, custom section details) auto-detects its own format when rendered into the preview:

If any line starts with •, -, *, or a numbered pattern like 1./1), render the whole block as a bulleted list, stripping the bullet marker.

Otherwise, split on blank lines into paragraphs and render each as its own <p>.

Show a small hint under each such textarea: "Lines starting with • or - render as bullet points."

Template System

Four visual templates that restyle the same underlying content — a CSS/class-based reskin, not separate layouts:

Classic: Times New Roman serif, black headers, understated

Modern: Helvetica/Arial sans-serif, navy blue (#1e3a8a) name/headers, blue accent rule under contact block

Minimal: Georgia serif, uppercase letter-spaced name, muted gray headers, no underline rules

Executive: Palatino serif, deep maroon (#7a1a1a) headers with a gold (#b8860b) rule

Switching templates re-styles the live preview instantly without altering any entered data.

Export / Import / Persistence

Autosave: debounce-save the full form state to localStorage on every change (~800ms), and restore it on load.

Export JSON: downloads the current CV data as a .json file the user can back up or move to another device.

Import JSON: file picker restores a previously exported JSON into the form, rebuilding all repeatable cards.

Clear All: confirms before wiping all fields and clearing localStorage.

PDF / Print Export — critical requirement

This is the most important functional requirement, so build it carefully:

Clicking Print/PDF opens the browser's native print dialog (window.print() on a dedicated print view, or an equivalent React print library) so the user can "Save as PDF."

The exported PDF must have selectable text — the CV must be rendered as real DOM text (headings, paragraphs, list items), never as a canvas snapshot, rasterized image, or html2canvas-style flattening. Do not use any approach that converts the preview to a bitmap before printing.

The exported PDF's contact links must be real, clickable hyperlinks, not styled plain text:

Email → mailto: link

Phone → tel: link (strip spaces from the number)

LinkedIn, GitHub, and Website → https:// links, auto-prefixing https:// if the user typed the value without a protocol (e.g. they type linkedin.com/in/aisha and it still becomes a working link)

Project "tech stack / link" fields: if a URL-looking token is present in that field, it should also render as a clickable link in the export

Links should be styled subtly (inherit the surrounding text color, thin dotted underline) so they don't look like default blue web links on a printed resume — but must remain functional <a> elements with target="_blank" rel="noopener" for external links

Verify this by making sure the print stylesheet (or print-specific component) includes the exact same anchor-tag markup and link styling as the live preview — don't let the print path silently strip hyperlinks while the on-screen preview has them.

Info / About Modal

A dismissible modal (triggered by an "Info" button, closable via backdrop click, close button, or Escape key) containing a short "About FREELIUM CV" blurb, a pull-quote line, and a "Meet the Creator" link to the creator's site, opening in a new tab.

Visual Design Direction

Keep the existing aesthetic point of view — do not default to a generic light SaaS template:

Near-black, layered dark UI (#06070b background, #0d1016/#12151c/#171a22 surface layers) for the editor chrome (sidebar, buttons, modals)

A refined gold accent (#c9a84c/#e8c87a) used deliberately for active states, focus rings, section markers, and primary actions — not overused

The CV preview itself stays a clean white "paper" sheet regardless of the dark editor theme, since it represents the actual printable document

Small live "pulse" indicator (green, soft glow) to signal autosave is active

Rounded pill-style buttons, subtle border/glow on focus, smooth 150–200ms transitions on hover states — no jarring or default-looking browser form controls

Accessibility Requirements

Every form <label> must be properly associated with its input via htmlFor/id (the current version uses visual-only labels)

Modal must trap focus and be operable via keyboard (Escape to close, focus returns to trigger button on close)

Sufficient color contrast on the dark UI text (already mostly fine — verify muted grays pass WCAG AA against the dark backgrounds)

Non-Goals

No user accounts, no backend, no cloud storage — everything is local to the browser via localStorage + manual JSON export/import

No AI-generated content suggestions (out of scope for this build)

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
