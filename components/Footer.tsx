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
  { label: "Lux Engine", href: "#lux" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Projects", href: "#projects" },
];

const defaultSocials = [
  { label: "Email", href: "mailto:hello@starbounded.com" },
  { label: "GitHub", href: "https://github.com/starbounded-dev" },
  { label: "Lux Engine", href: "https://github.com/starbounded-dev/LuxEngine" },
];

export function Footer({ links = defaultLinks, socials = defaultSocials }: FooterProps) {
  return (
    <footer className="relative z-10 mt-24 border-t border-ink/10 bg-ivory text-ink">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <Logo tone="dark" />
          <div className="flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate">
            {links.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-mist">
                {item.label}
              </a>
            ))}
          </div>
          <div className="text-sm text-slate">hello@starbounded.com</div>
        </div>
        <div className="mt-10 flex flex-col gap-6 border-t border-ink/10 pt-8 text-xs uppercase tracking-[0.28em] text-slate-soft sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-6">
            {socials.map((item) => (
              <a key={item.label} href={item.href} className="hover:text-mist">
                {item.label}
              </a>
            ))}
          </div>
          <div>© 2026 Starbounded. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
