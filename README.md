# Freelium CV

A single-page resume/CV builder with a live split-screen editor — a form sidebar on the left, and a real-time rendered CV preview on the right, styled like an actual printed resume.

Everything runs entirely in your browser. No accounts, no backend, no database — your data never leaves your device unless you export it yourself.

**Created by [Abdul Basit](https://abdulbasit-archer.vercel.app/)**

---

## Features

- **Live split-screen editor** — edit on the left, see a real-time, print-accurate preview on the right
- **Four visual templates** — Classic, Modern, Minimal, and Executive, all sharing the same content and swappable instantly
- **Full CV sections** — personal info, summary, work experience, education, projects, skills, languages, certifications, and custom sections, each repeatable and removable
- **Smart text rendering** — textareas auto-detect bullet lists (`•`, `-`, `*`, `1.`) vs. paragraph text and render accordingly
- **True PDF export** — uses the browser's native print dialog and renders real, selectable DOM text (never a rasterized image), with working `mailto:`, `tel:`, and `https://` hyperlinks
- **Autosave** — debounced save to `localStorage` on every change, restored automatically on reload
- **Export / Import JSON** — back up your CV or move it to another device
- **Responsive layout** — collapses to a single-column, scrollable view with a Preview toggle on smaller screens
- **Accessible** — properly labeled form controls, keyboard-operable modal with focus trapping, WCAG AA–compliant contrast

## Tech Stack

- React + TypeScript (Vite)
- Tailwind CSS
- Client-side state only (`useState`/`useReducer` or Zustand)
- `localStorage` for persistence — no backend, no auth, no server

## Getting Started

You'll need [Node.js](https://nodejs.org/) and npm. If you don't have them, install via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite reports in your terminal).

### Build for production

```sh
npm run build
npm run preview
```

## Usage

1. Fill in your details in the left-hand form — the preview on the right updates live.
2. Switch between the four templates at any time without losing your data.
3. Use **Export** to save your CV as a `.json` file, or **Import** to restore one.
4. Click **Print/PDF** to open your browser's print dialog and save a text-selectable, hyperlinked PDF.
5. Use **Clear All** to wipe the form and start fresh (confirmation required).

## Project Structure

```
freelium-cv/
├── src/
│   ├── components/     # Sidebar, form sections, preview, templates, modal
│   ├── state/           # App state (form data, template selection, persistence)
│   ├── utils/            # Text-rendering, link-formatting, import/export helpers
│   └── App.tsx
├── index.html
└── package.json
```

## Non-Goals

- No user accounts, backend, or cloud storage — everything is local to your browser
- No AI-generated content suggestions

## License

Add your preferred license here (e.g. MIT).

---

Built and maintained by [Abdul Basit](https://abdulbasit-archer.vercel.app/).