"use client";

import Image from "next/image";
import { LayoutGroup } from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
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
  const tabList = useRef<HTMLDivElement>(null);
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

  // The thumbnail list scrolls, so keep the selected one visible when the
  // viewer's arrows change it. Only the list moves, never the page.
  useEffect(() => {
    const list = tabList.current;
    const tab = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!list || !tab) return;
    const box = list.getBoundingClientRect();
    const item = tab.getBoundingClientRect();
    if (list.scrollHeight > list.clientHeight) {
      if (item.top < box.top) list.scrollTop -= box.top - item.top + 10;
      else if (item.bottom > box.bottom)
        list.scrollTop += item.bottom - box.bottom + 10;
    } else if (list.scrollWidth > list.clientWidth) {
      if (item.left < box.left) list.scrollLeft -= box.left - item.left + 8;
      else if (item.right > box.right)
        list.scrollLeft += item.right - box.right + 8;
    }
  }, [active, mobile]);

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
            <span>Captured in the LuxEngine editor</span>
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
                    sizes="(max-width: 760px) calc(100vw - 42px), (max-width: 1100px) calc(100vw - 274px), (max-width: 1280px) calc(100vw - 330px), 950px"
                  />
                </span>
              </button>
            </TabsContent>
          ))}
          <TabsList
            ref={tabList}
            className="gallery-tabs"
            aria-label="LuxEngine screenshots"
            data-stagger="true"
          >
            {screenshots.map((screenshot) => (
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
                    sizes="(max-width: 760px) 200px, (max-width: 1100px) 60px, 76px"
                  />
                </span>
                <span>{screenshot.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <figcaption
            className="gallery-caption"
            aria-live="polite"
            aria-atomic="true"
          >
            <p>{current.caption}</p>
            <span>
              {activeIndex + 1} of {screenshots.length}
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
