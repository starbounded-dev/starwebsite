"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Arrow } from "./Icons";

const links = [
  { label: "Studio", href: "/#studio" },
  { label: "LuxEngine", href: "/lux" },
  { label: "Forward", href: "/#roadmap" },
  { label: "Get started", href: "/#get-started" },
];

export function Nav({ engine = false }: { engine?: boolean }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sourceUrl = engine
    ? "https://github.com/starbounded-dev/LuxEngine"
    : "https://github.com/starbounded-dev";
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        <nav className="wrap nav-inner" aria-label="Main navigation">
          <Link
            className="brand-link"
            aria-label="Starbounded Studio home"
            href="/"
            onClick={() => setOpen(false)}
          >
            <Logo />
          </Link>
          <div className="desktop-nav">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  engine && link.href === "/lux" ? "page" : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="nav-actions">
            <ThemeToggle />
            <a className="nav-github" href={sourceUrl}>
              Source <Arrow diagonal />
            </a>
            <button
              ref={menuButton}
              type="button"
              className="menu-button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close navigation" : "Open navigation"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <span>✕</span> : <span>☰</span>}
            </button>
          </div>
        </nav>
        {open ? (
          <div className="mobile-menu" id="mobile-menu">
            {links.map((link) => (
              <Link
                onClick={() => setOpen(false)}
                key={link.href}
                href={link.href}
                aria-current={
                  engine && link.href === "/lux" ? "page" : undefined
                }
              >
                {link.label}
                <Arrow />
              </Link>
            ))}
            <a href={sourceUrl} onClick={() => setOpen(false)}>
              Source <Arrow diagonal />
            </a>
          </div>
        ) : null}
      </header>
    </>
  );
}
