import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Arrow } from "./Icons";
import { MobileNav } from "./MobileNav";
import { navigationLinks, type NavigationLink } from "@/lib/navigation";

export function Nav({ engine = false }: { engine?: boolean }) {
  const sourceUrl = engine
    ? "https://github.com/starbounded-dev/LuxEngine"
    : "https://github.com/starbounded-dev";
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="relative z-30">
        <nav
          className="wrap flex min-h-[100px] items-center justify-between gap-[24px] border-b border-line max-[760px]:min-h-[82px] max-[760px]:gap-[15px]"
          aria-label="Main navigation"
        >
          <Link
            className="brand-link"
            aria-label="Starbounded Studio home"
            href="/"
          >
            <Logo />
          </Link>
          <div className="desktop-nav flex items-center gap-[5px] max-[1000px]:hidden">
            {navigationLinks.map((link: NavigationLink) =>
              link.document ? (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={
                    engine && link.href === "/lux" ? "page" : undefined
                  }
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
          <div className="flex items-center gap-[14px] max-[1100px]:gap-[8px] max-[760px]:gap-[5px]">
            <ThemeToggle />
            <a
              className="nav-github flex items-center gap-[20px] rounded-[7px] bg-ink px-[13px] py-[9px] text-[12px] text-paper transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.98] max-[760px]:gap-[9px] max-[760px]:px-[10px] max-[760px]:py-[8px] max-[760px]:text-[11px] max-[380px]:hidden [&_svg]:size-[16px]"
              href={sourceUrl}
            >
              Source <Arrow diagonal />
            </a>
            <MobileNav
              links={navigationLinks}
              sourceUrl={sourceUrl}
              engine={engine}
            />
          </div>
        </nav>
      </header>
    </>
  );
}
