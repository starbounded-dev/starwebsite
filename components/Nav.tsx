import Link from "next/link";
import { Logo } from "./Logo";

type NavItem = {
  label: string;
  href: string;
};

type NavCta = {
  label: string;
  href: string;
};

type NavProps = {
  items?: NavItem[];
  primaryCta?: NavCta;
  secondaryCta?: NavCta;
  logoHref?: string;
};

const defaultItems = [
  { label: "Studio", href: "#studio" },
  { label: "Lux Engine", href: "#lux" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Projects", href: "#projects" },
];

const defaultPrimaryCta = {
  label: "GitHub",
  href: "https://github.com/starbounded-dev",
};

const defaultSecondaryCta = {
  label: "Get started",
  href: "#get-started",
};

const isExternal = (href: string) =>
  href.startsWith("http") || href.startsWith("mailto:");

export function Nav({
  items = defaultItems,
  primaryCta = defaultPrimaryCta,
  secondaryCta = defaultSecondaryCta,
  logoHref = "/",
}: NavProps) {
  return (
    <header className="relative z-10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href={logoHref} className="transition hover:opacity-80">
          <Logo />
        </Link>
        <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.32em] text-slate lg:flex">
          {items.map((item) =>
            isExternal(item.href) ? (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-mist"
                rel="noreferrer"
                target="_blank"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-mist"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
        <div className="flex items-center gap-3">
          {secondaryCta ? (
            isExternal(secondaryCta.href) ? (
              <a
                href={secondaryCta.href}
                className="hidden rounded-full border border-ink/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ink transition hover:border-ink/60 hover:bg-ivory-deep sm:inline-flex"
                rel="noreferrer"
                target="_blank"
              >
                {secondaryCta.label}
              </a>
            ) : (
              <Link
                href={secondaryCta.href}
                className="hidden rounded-full border border-ink/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ink transition hover:border-ink/60 hover:bg-ivory-deep sm:inline-flex"
              >
                {secondaryCta.label}
              </Link>
            )
          ) : null}
          {primaryCta ? (
            isExternal(primaryCta.href) ? (
              <a
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-teal px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ivory transition hover:bg-teal-bright"
                rel="noreferrer"
                target="_blank"
              >
                {primaryCta.label}
              </a>
            ) : (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-teal px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ivory transition hover:bg-teal-bright"
              >
                {primaryCta.label}
              </Link>
            )
          ) : null}
        </div>
      </nav>
    </header>
  );
}
