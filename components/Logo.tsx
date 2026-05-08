type LogoProps = {
  tone?: "dark" | "light";
};

export function Logo({ tone = "dark" }: LogoProps) {
  const badgeTone =
    tone === "dark"
      ? "border-ink/10 bg-surface text-purple"
      : "border-white/20 bg-white text-purple";
  const textTone = tone === "dark" ? "text-ink" : "text-white";
  const subTone = tone === "dark" ? "text-muted" : "text-white/70";

  return (
    <div className={`flex items-center gap-3 ${textTone}`}>
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-lg border ${badgeTone} shadow-soft`}
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.4l2.42 6.02 6.46.46-4.96 4.08 1.56 6.3L12 15.82l-5.48 3.44 1.56-6.3-4.96-4.08 6.46-.46L12 2.4Z" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block text-base font-semibold">Starbounded</span>
        <span className={`block text-[11px] font-semibold uppercase ${subTone}`}>
          Studio
        </span>
      </span>
    </div>
  );
}
