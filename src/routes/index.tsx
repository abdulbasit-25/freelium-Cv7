import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Download, Upload, Trash2, Printer, Info } from "lucide-react";
import { CvForm } from "@/components/cv/CvForm";
import { CvPreview } from "@/components/cv/CvPreview";
import { InfoModal } from "@/components/cv/InfoModal";
import { TEMPLATES } from "@/components/cv/templates";
import { STORAGE_KEY, emptyCV, normalizeCV, type CVData, type TemplateId } from "@/lib/cv-types";

const TITLE = "FREELIUM CV — Free Resume Builder with Live Preview";
const DESCRIPTION =
  "Build a clean, printable CV in your browser. Live preview, four templates, autosave, JSON export, and PDF export with selectable text and clickable links.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [data, setData] = useState<CVData>(() => emptyCV());
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const infoTriggerRef = useRef<HTMLButtonElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setData(normalizeCV(JSON.parse(raw)));
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    setSaving(true);
    const t = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        /* storage full or blocked */
      }
      setSaving(false);
    }, 800);
    return () => window.clearTimeout(t);
  }, [data, loaded]);

  const update = useCallback((updater: (prev: CVData) => CVData) => setData(updater), []);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(data.personal.fullName || "freelium-cv").replace(/\s+/g, "-").toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file: File) => {
    try {
      setData(normalizeCV(JSON.parse(await file.text())));
      setMobileTab("edit");
    } catch {
      window.alert("That file could not be read as FREELIUM CV JSON.");
    }
  };

  const clearAll = () => {
    if (!window.confirm("Clear every field and delete the saved copy in this browser?")) return;
    window.localStorage.removeItem(STORAGE_KEY);
    setData(emptyCV());
  };

  const toolbar = [
    { label: "Export", icon: Download, onClick: exportJson },
    { label: "Import", icon: Upload, onClick: () => fileRef.current?.click() },
    { label: "Clear", icon: Trash2, onClick: clearAll },
    { label: "Print / PDF", icon: Printer, onClick: () => window.print() },
  ];

  return (
    <div className="dark app-shell min-h-screen lg:grid lg:h-screen lg:grid-cols-[390px_minmax(0,1fr)] lg:overflow-hidden">
      <aside
        className={`no-print panel-1 flex min-h-0 flex-col border-r border-white/5 ${
          mobileTab === "preview" ? "hidden lg:flex" : "flex"
        }`}
      >
        <div className="border-b border-white/5 px-4 py-4">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold tracking-[0.22em] text-foreground uppercase">
                Freelium <span className="text-gold">CV</span>
              </h1>
              <p className="truncate text-[11px] text-muted-foreground">Local-first resume builder</p>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 text-[11px] text-muted-foreground">
              <span
                className={`inline-block size-2 rounded-full bg-pulse shadow-[0_0_8px_var(--color-pulse)] ${saving ? "animate-pulse" : ""}`}
                aria-hidden="true"
              />
              {saving ? "Saving…" : "Saved"}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {toolbar.map(({ label, icon: Icon, onClick }) => (
              <button
                key={label}
                type="button"
                onClick={onClick}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 panel-3 px-3 py-1.5 text-[11px] text-muted-foreground transition-colors duration-150 hover:border-gold/50 hover:text-foreground focus-gold"
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </button>
            ))}
            <button
              ref={infoTriggerRef}
              type="button"
              onClick={() => setInfoOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 panel-3 px-3 py-1.5 text-[11px] text-muted-foreground transition-colors duration-150 hover:border-gold/50 hover:text-foreground focus-gold"
            >
              <Info className="size-3.5" aria-hidden="true" />
              Info
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              className="sr-only"
              aria-label="Import CV JSON file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void importJson(file);
                e.target.value = "";
              }}
            />
          </div>

          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {TEMPLATES.map((t) => {
              const active = data.template === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={active}
                  title={t.blurb}
                  onClick={() =>
                    setData((prev) => ({ ...prev, template: t.id as TemplateId }))
                  }
                  className={`rounded-lg border px-2 py-2 text-[11px] transition-colors duration-150 focus-gold ${
                    active
                      ? "border-gold bg-gold/15 text-gold-bright"
                      : "border-white/10 panel-3 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-h-0 flex-1 lg:overflow-y-auto">
          <CvForm data={data} setData={update} />
        </div>
      </aside>

      <div
        className={`print-region print-surface min-h-screen bg-paper-bg px-4 pt-8 pb-24 lg:min-h-0 lg:py-8 lg:overflow-y-auto ${
          mobileTab === "preview" ? "block" : "hidden lg:block"
        }`}
      >
        <main
          className={`cv-paper tpl-${data.template} mx-auto w-full max-w-[680px] rounded-sm p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] sm:p-10`}
        >
          <CvPreview data={data} />
        </main>
      </div>

      <div className="no-print fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-white/10 panel-1 p-2 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileTab("edit")}
          aria-pressed={mobileTab === "edit"}
          className={`flex-1 rounded-full px-3 py-2 text-xs font-medium transition-colors duration-150 focus-gold ${
            mobileTab === "edit" ? "bg-gold text-ink-900" : "panel-3 text-muted-foreground"
          }`}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          aria-pressed={mobileTab === "preview"}
          className={`flex-1 rounded-full px-3 py-2 text-xs font-medium transition-colors duration-150 focus-gold ${
            mobileTab === "preview" ? "bg-gold text-ink-900" : "panel-3 text-muted-foreground"
          }`}
        >
          Preview
        </button>
      </div>

      <InfoModal
        open={infoOpen}
        onClose={() => {
          setInfoOpen(false);
          infoTriggerRef.current?.focus();
        }}
      />
    </div>
  );
}
