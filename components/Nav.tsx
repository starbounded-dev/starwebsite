import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

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
  { label: "LuxEngine", href: "#lux" },
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

function NavLink({ item }: { item: NavItem }) {
  if (isExternal(item.href)) {
    return (
      <a
        href={item.href}
        className="transition hover:text-purple"
        rel="noreferrer"
        target="_blank"
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className="transition hover:text-purple">
      {item.label}
    </Link>
  );
}

function CtaLink({
  cta,
  variant,
}: {
  cta: NavCta;
  variant: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "inline-flex items-center justify-center rounded-lg bg-purple px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-purple-deep"
      : "hidden items-center justify-center rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:border-purple/35 hover:text-purple sm:inline-flex";

  if (isExternal(cta.href)) {
    return (
      <a href={cta.href} className={className} rel="noreferrer" target="_blank">
        {cta.label}
      </a>
    );
  }

  return (
    <Link href={cta.href} className={className}>
      {cta.label}
    </Link>
  );
}

export function Nav({
  items = defaultItems,
  primaryCta = defaultPrimaryCta,
  secondaryCta = defaultSecondaryCta,
  logoHref = "/",
}: NavProps) {
  return (
    <header className="relative z-20">
      <nav className="mx-5 flex max-w-[350px] items-center justify-between px-0 py-5 sm:mx-auto sm:w-full sm:max-w-7xl sm:px-8 lg:px-10">
        <Link href={logoHref} className="transition hover:opacity-80">
          <Logo />
        </Link>
        <div className="hidden items-center gap-8 text-sm font-semibold text-muted lg:flex">
          {items.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {secondaryCta ? <CtaLink cta={secondaryCta} variant="secondary" /> : null}
          {primaryCta ? <CtaLink cta={primaryCta} variant="primary" /> : null}
        </div>
      </nav>
    </header>
  );
}
