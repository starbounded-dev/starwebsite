import type { ReactNode } from "react";

type Accent = "purple" | "yellow" | "coral" | "cyan" | "green";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  accent?: Accent;
};

const accentClasses: Record<Accent, string> = {
  purple: "bg-purple/10 text-purple",
  yellow: "bg-yellow/25 text-ink",
  coral: "bg-coral/10 text-coral",
  cyan: "bg-cyan/10 text-cyan",
  green: "bg-green/15 text-green",
};

export function FeatureCard({
  title,
  description,
  icon,
  accent = "purple",
}: FeatureCardProps) {
  return (
    <article className="group rounded-lg border border-line bg-surface p-5 shadow-soft transition hover:-translate-y-1 hover:border-purple/30">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-lg ${accentClasses[accent]}`}
      >
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
    </article>
  );
}
