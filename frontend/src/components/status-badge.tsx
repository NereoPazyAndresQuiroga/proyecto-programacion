type Variant = "success" | "warning" | "error" | "info" | "cyan" | "muted";

const styles: Record<Variant, string> = {
  success: "bg-state-success/15 text-state-success border-state-success/30",
  warning: "bg-state-warning/15 text-state-warning border-state-warning/30",
  error: "bg-state-error/15 text-state-error border-state-error/30",
  info: "bg-state-info/15 text-state-info border-state-info/30",
  cyan: "bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30",
  muted: "bg-white/5 text-text-secondary border-border",
};

export function StatusBadge({
  variant = "muted",
  children,
  className = "",
}: {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
