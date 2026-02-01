type LogoProps = {
  tone?: "dark" | "light";
};

export function Logo({ tone = "dark" }: LogoProps) {
  const badgeTone =
    tone === "dark" ? "bg-ivory text-ink" : "bg-ink text-ivory";
  const textTone = tone === "dark" ? "text-ink" : "text-ivory";

  return (
    <div className={`flex items-center gap-3 ${textTone}`}>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full ${badgeTone} shadow-[0_18px_40px_-22px_rgba(11,16,25,0.9)]`}
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l2.6 5.8 6.3.6-4.8 4.1 1.4 6.3L12 16.6 6.5 18.8 8 12.5 3.2 8.4l6.3-.6L12 2z" />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight">
        Starbounded Studio
      </span>
    </div>
  );
}
