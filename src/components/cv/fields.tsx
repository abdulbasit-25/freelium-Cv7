import { useId } from "react";
import { X, Plus } from "lucide-react";

const inputBase =
  "w-full rounded-lg border border-white/10 panel-3 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-150 focus-gold";

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  const id = useId();
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1 block text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={inputBase}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  hint?: string;
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1 block text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        aria-describedby={hint ? hintId : undefined}
        className={`${inputBase} resize-y leading-relaxed`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint ? (
        <p id={hintId} className="mt-1 text-[11px] text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export const BULLET_HINT = "Lines starting with • or - render as bullet points.";

export function RepeatCard({
  children,
  onRemove,
  removeLabel,
}: {
  children: React.ReactNode;
  onRemove: () => void;
  removeLabel: string;
}) {
  return (
    <div className="relative rounded-xl border border-white/10 panel-2 p-3 pt-8">
      <button
        type="button"
        onClick={onRemove}
        aria-label={removeLabel}
        className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-[11px] text-muted-foreground transition-colors duration-150 hover:border-destructive/50 hover:text-destructive focus-gold"
      >
        <X className="size-3" aria-hidden="true" />
        Remove
      </button>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-dashed border-gold/40 px-3 py-2 text-xs font-medium text-gold transition-colors duration-150 hover:border-gold hover:bg-gold/10 focus-gold"
    >
      <Plus className="size-3.5" aria-hidden="true" />
      {label}
    </button>
  );
}

export function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3 border-t border-white/5 px-4 py-5 first:border-t-0">
      <h2 className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-foreground uppercase">
        <span className="inline-block h-3 w-[3px] rounded-full bg-gold" aria-hidden="true" />
        {title}
      </h2>
      {children}
    </section>
  );
}