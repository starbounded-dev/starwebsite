type MetricChipProps = {
  value: string;
  label: string;
  detail?: string;
};

export function MetricChip({ value, label, detail }: MetricChipProps) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-ivory-deep/70 p-5 shadow-[0_22px_50px_-46px_rgba(6,10,18,0.7)] backdrop-blur">
      <div className="text-2xl font-semibold text-ink">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.32em] text-slate">
        {label}
      </div>
      {detail ? (
        <p className="mt-2 text-sm leading-6 text-slate-soft">{detail}</p>
      ) : null}
    </div>
  );
}
