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
              className="touch-target block size-[38px] rounded-[6px] border-0 p-[3px] text-[22px] transition-[color,background-color,transform] duration-150 hover:bg-tint hover:text-accent active:scale-[0.97] max-[760px]:w-[32px] max-[760px]:text-[20px]"
              aria-label={open ? "Close navigation" : "Open navigation"}
            >
              <span aria-hidden="true">{open ? "✕" : "☰"}</span>
            </button>
          </PopoverTrigger>
        </span>
      </PopoverAnchor>
      <PopoverContent
        className="mobile-menu"
        align="end"
        sideOffset={0}
        collisionPadding={24}
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
            Source <Arrow diagonal />
          </a>
        </nav>
      </PopoverContent>
    </Popover>
  );
}
