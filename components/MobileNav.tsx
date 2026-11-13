"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Icons";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import type { NavigationLink } from "@/lib/navigation";

type MobileNavProps = {
  links: readonly NavigationLink[];
  sourceUrl: string;
  engine: boolean;
};

export function MobileNav({ links, sourceUrl, engine }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1001px)");
    const dismiss = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", dismiss);
    return () => desktop.removeEventListener("change", dismiss);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <span className="mobile-nav-anchor">
          <PopoverTrigger asChild>
            <button
              type="button"
              className="icon-button touch-target text-ink"
              aria-label={open ? "Close navigation" : "Open navigation"}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {open ? (
                  <path d="m6 6 12 12M18 6 6 18" />
                ) : (
                  <path d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </PopoverTrigger>
        </span>
      </PopoverAnchor>
      <PopoverContent
        className="mobile-menu"
        align="end"
        sideOffset={0}
        collisionPadding={20}
        aria-label="Mobile navigation"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          firstLink.current?.focus();
        }}
        onCloseAutoFocus={(event) => {
          if (window.matchMedia("(min-width: 1001px)").matches)
            event.preventDefault();
        }}
      >
        <nav aria-label="Mobile navigation">
          {links.map((link, index) =>
            link.document ? (
              <a
                ref={index === 0 ? firstLink : undefined}
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
                <Arrow />
              </a>
            ) : (
              <Link
                ref={index === 0 ? firstLink : undefined}
                key={link.href}
                href={link.href}
                aria-current={
                  engine && link.href === "/lux" ? "page" : undefined
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
                <Arrow />
              </Link>
            ),
          )}
          <a href={sourceUrl} onClick={() => setOpen(false)}>
            GitHub <Arrow diagonal />
          </a>
        </nav>
      </PopoverContent>
    </Popover>
  );
}
