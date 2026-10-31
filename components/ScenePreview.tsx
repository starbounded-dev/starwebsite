"use client";

import Image from "next/image";
import { LayoutGroup } from "motion/react";
import { useId, useRef, useState, useSyncExternalStore } from "react";
import { screenshots } from "@/lib/screenshots";
import { ScreenshotViewer } from "./ScreenshotViewer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TabHighlight,
} from "./ui/tabs";

const mobileQuery = "(max-width: 760px)";
function subscribeViewport(onChange: () => void) {
  const media = window.matchMedia(mobileQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
const getMobileViewport = () => window.matchMedia(mobileQuery).matches;
const getServerViewport = () => false;

export function ScenePreview() {
  const [active, setActive] = useState<string>(screenshots[0].src);
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  const expandButton = useRef<HTMLButtonElement>(null);
  const id = useId();
  const mobile = useSyncExternalStore(
    subscribeViewport,
    getMobileViewport,
    getServerViewport,
  );
  const activeIndex = screenshots.findIndex(
    (screenshot) => screenshot.src === active,
  );
  const current = screenshots[activeIndex];

  function browse(direction: number) {
    setActive((selected) => {
      const index = screenshots.findIndex(
        (screenshot) => screenshot.src === selected,
      );
      return screenshots[
        (index + direction + screenshots.length) % screenshots.length
      ].src;
    });
  }

  return (
    <LayoutGroup id={id}>
      <Tabs
        value={active}
        onValueChange={setActive}
        orientation={mobile ? "horizontal" : "vertical"}
        asChild
      >
        <figure className="engine-gallery">
          <div className="gallery-topline">
            <span className="mono">
              <i className="status-dot" aria-hidden="true" /> INSIDE LUXENGINE
            </span>
            <button
              ref={expandButton}
              className="gallery-expand touch-target"
              type="button"
              aria-haspopup="dialog"
              aria-controls={`${id}-viewer`}
              aria-label={`Enlarge ${current.title} screenshot`}
              onClick={(event) => {
                opener.current = event.currentTarget;
                setOpen(true);
              }}
            >
              View full size
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
              </svg>
            </button>
          </div>
          {screenshots.map((screenshot) => (
            <TabsContent
              key={screenshot.src}
              value={screenshot.src}
              className="gallery-panel"
            >
              <button
                className="gallery-image"
                type="button"
                aria-haspopup="dialog"
                aria-controls={`${id}-viewer`}
                aria-label={`Open ${screenshot.title} screenshot in full size`}
                onClick={(event) => {
                  opener.current = event.currentTarget;
                  setOpen(true);
                }}
              >
                <span className="block w-full">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={3839}
                    height={2088}
                    sizes="(max-width: 760px) calc(100vw - 42px), (max-width: 1100px) calc(100vw - 304px), (max-width: 1376px) calc(100vw - 328px), 1048px"
                  />
                </span>
              </button>
            </TabsContent>
          ))}
          <TabsList
            className="gallery-tabs"
            aria-label="LuxEngine screenshots"
            data-stagger="true"
          >
            {screenshots.map((screenshot, index) => (
              <TabsTrigger key={screenshot.src} value={screenshot.src}>
                {active === screenshot.src ? (
                  <TabHighlight
                    layoutId="gallery-selection"
                    className="-inset-px rounded-[9px] border border-accent"
                  />
                ) : null}
                <span className="gallery-thumbnail">
                  <Image
                    src={screenshot.src}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 200px, (max-width: 1100px) 62px, 72px"
                  />
                </span>
                <span className="gallery-tab-text">
                  <span className="mono">0{index + 1}</span>
                  <span>{screenshot.title}</span>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          <figcaption
            className="gallery-caption"
            aria-live="polite"
            aria-atomic="true"
          >
            <p>{current.caption}</p>
            <span className="mono">
              {current.scene} / {String(activeIndex + 1).padStart(2, "0")} OF 03
            </span>
          </figcaption>
        </figure>
      </Tabs>
      <ScreenshotViewer
        id={`${id}-viewer`}
        open={open}
        onOpenChange={setOpen}
        screenshot={current}
        onPrevious={() => browse(-1)}
        onNext={() => browse(1)}
        opener={opener}
        fallbackFocus={expandButton}
      />
    </LayoutGroup>
  );
}
