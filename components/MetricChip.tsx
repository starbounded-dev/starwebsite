type Accent = "purple" | "yellow" | "coral" | "cyan" | "green";

type MetricChipProps = {
  value: string;
  label: string;
  detail?: string;
  accent?: Accent;
};

const accentClasses: Record<Accent, string> = {
  purple: "border-purple/20 bg-purple/10",
  yellow: "border-yellow/35 bg-yellow/20",
  coral: "border-coral/20 bg-coral/10",
  cyan: "border-cyan/20 bg-cyan/10",
  green: "border-green/25 bg-green/10",
};

export function MetricChip({
  value,
  label,
  detail,
  accent = "purple",
}: MetricChipProps) {
  return (
    <article
      className={`rounded-lg border p-5 shadow-soft ${accentClasses[accent]}`}
    >
      <div className="text-2xl font-semibold text-ink">{value}</div>
      <div className="mt-2 text-xs font-semibold uppercase text-muted">
        {label}
      </div>
      {detail ? <p className="mt-3 text-sm leading-6 text-muted">{detail}</p> : null}
    </article>
  );
}
