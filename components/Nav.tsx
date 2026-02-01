import Link from "next/link";
import { Logo } from "./Logo";

const navItems = [
  { label: "Studio", href: "#studio" },
  { label: "Lux Engine", href: "#lux" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Projects", href: "#projects" },
];

export function Nav() {
  return (
    <header className="relative z-10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-10">
        <Logo />
        <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.32em] text-slate lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-mist"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="#get-started"
            className="hidden rounded-full border border-ink/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ink transition hover:border-ink/60 hover:bg-ivory-deep sm:inline-flex"
          >
            Get started
          </Link>
          <Link
            href="https://github.com/starbounded-dev"
            className="inline-flex items-center justify-center rounded-full bg-teal px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ivory transition hover:bg-teal-bright"
          >
            GitHub
          </Link>
        </div>
      </nav>
    </header>
  );
}
