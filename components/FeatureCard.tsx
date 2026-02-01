import type { ReactNode } from "react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-ivory-deep/70 p-6 shadow-[0_24px_60px_-48px_rgba(6,10,18,0.7)] backdrop-blur">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal/80 via-teal-bright/60 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory/80 text-ink shadow-[0_0_26px_rgba(53,211,194,0.18)]">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate">{description}</p>
    </div>
  );
}
