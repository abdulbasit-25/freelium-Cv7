import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export function InfoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-modal-title"
        className="w-full max-w-md rounded-2xl border border-white/10 panel-1 p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="info-modal-title" className="text-lg font-semibold text-foreground">
            About FREELIUM CV
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close about dialog"
            className="rounded-full border border-white/10 p-1.5 text-muted-foreground transition-colors duration-150 hover:text-foreground focus-gold"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          A private, browser-only resume builder. Everything you type stays on this device —
          autosaved locally, exportable as JSON, and printable to a real text-selectable PDF with
          working links.
        </p>
        <blockquote className="mt-4 border-l-2 border-gold pl-3 text-sm italic text-gold-bright">
          “A résumé is a document, not a screenshot.”
        </blockquote>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex rounded-full bg-gold px-4 py-2 text-sm font-medium text-ink-900 transition-opacity duration-150 hover:opacity-90 focus-gold"
        >
          About
        </a>
      </div>
    </div>
  );
}