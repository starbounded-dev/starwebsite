import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { GitHubMark } from "./Icons";
import { MobileNav } from "./MobileNav";
import {
  githubOrgUrl,
  luxRepoUrl,
  navigationLinks,
  type NavigationLink,
} from "@/lib/navigation";

export function Nav({ engine = false }: { engine?: boolean }) {
  const sourceUrl = engine ? luxRepoUrl : githubOrgUrl;
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <nav className="wrap site-nav" aria-label="Main navigation">
          <div className="nav-side">
            <Link className="brand-link" aria-label="Starbounded home" href="/">
              <Logo />
            </Link>
          </div>
          <div className="desktop-nav">
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
          <div className="nav-side end">
            <ThemeToggle />
            <a
              className="nav-github max-[380px]:hidden"
              href={sourceUrl}
              aria-label={
                engine ? "LuxEngine on GitHub" : "Starbounded on GitHub"
              }
            >
              <GitHubMark />
              <span>GitHub</span>
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
