import { Logo } from "./Logo";

type FooterLink = {
  label: string;
  href: string;
};

type FooterProps = {
  links?: FooterLink[];
  socials?: FooterLink[];
};

const defaultLinks = [
  { label: "Studio", href: "#studio" },
  { label: "LuxEngine", href: "#lux" },
  { label: "Projects", href: "#projects" },
  { label: "Get started", href: "#get-started" },
];

const defaultSocials = [
  { label: "Email", href: "mailto:hello@starbounded.com" },
  { label: "GitHub", href: "https://github.com/starbounded-dev" },
  { label: "LuxEngine", href: "https://github.com/starbounded-dev/LuxEngine" },
];

export function Footer({
  links = defaultLinks,
  socials = defaultSocials,
}: FooterProps) {
  return (
    <footer className="relative z-10 border-t border-line bg-surface text-ink">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <Logo />
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-muted">
            {links.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-purple">
                {item.label}
              </a>
            ))}
          </div>
          <div className="text-sm text-muted">hello@starbounded.com</div>
        </div>
        <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8 text-xs font-semibold uppercase text-muted-soft sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-5">
            {socials.map((item) => (
              <a key={item.label} href={item.href} className="hover:text-purple">
                {item.label}
              </a>
            ))}
          </div>
          <div>(c) 2026 Starbounded. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
