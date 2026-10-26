"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

const screenshots = [
  {
    src: "/images/lux-editor-sponza.webp",
    title: "Scenes & editor",
    scene: "Sponza",
    alt: "LuxEngine editor with the Sponza scene, scene hierarchy, rendering settings, and content browser",
    caption:
      "Sponza running in LuxEngine, with the scene hierarchy, renderer settings, and content browser alongside the viewport.",
  },
  {
    src: "/images/lux-render-features.webp",
    title: "Lighting & rendering",
    scene: "RenderFeatures",
    alt: "LuxEngine rendering test with reflective surfaces, colored lights, and glowing emissive materials",
    caption:
      "A rendering test scene with lights, reflections, and emissive materials. Small tests help us see what works and what needs another look.",
  },
  {
    src: "/images/lux-material-editor.webp",
    title: "Material editor",
    scene: "RF_Emit_Cool",
    alt: "LuxEngine material editor showing surface, emission, and texture settings with an emissive sphere preview",
    caption:
      "The material editor, with a preview beside the surface, emission, and texture settings. This is where we work on how things look.",
  },
];

export function ScenePreview() {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  const current = screenshots[active];

  function selectTab(index: number) {
    setActive(index);
    document.getElementById(`${id}-tab-${index}`)?.focus();
  }

  return (
    <>
      <figure className="engine-gallery">
        <div className="gallery-topline">
          <span className="mono">
            <i className="status-dot" /> INSIDE LUXENGINE
          </span>
          <button
            className="gallery-expand"
            type="button"
            onClick={() => dialog.current?.showModal()}
            aria-label={`Enlarge ${current.title} screenshot`}
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
        <div
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${active}`}
          className="gallery-panel"
        >
          <button
            className="gallery-image"
            type="button"
            onClick={() => dialog.current?.showModal()}
            aria-label={`Open ${current.title} screenshot in full size`}
          >
            <Image
              src={current.src}
              alt={current.alt}
              width={3839}
              height={2088}
              sizes="(max-width: 760px) calc(100vw - 44px), (max-width: 1100px) calc(100vw - 72px), (max-width: 1472px) calc(100vw - 112px), 1360px"
            />
          </button>
        </div>
        <div
          className="gallery-tabs"
          role="tablist"
          aria-label="LuxEngine screenshots"
        >
          {screenshots.map((screenshot, index) => (
            <button
              key={screenshot.src}
              id={`${id}-tab-${index}`}
              role="tab"
              type="button"
              aria-selected={active === index}
              aria-controls={`${id}-panel`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                let next: number;
                if (event.key === "ArrowRight")
                  next = (active + 1) % screenshots.length;
                else if (event.key === "ArrowLeft")
                  next = (active + screenshots.length - 1) % screenshots.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = screenshots.length - 1;
                else return;
                event.preventDefault();
                selectTab(next);
              }}
            >
              <span className="gallery-thumbnail">
                <Image
                  src={screenshot.src}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 90px, 132px"
                />
              </span>
              <span className="gallery-tab-text">
                <span className="mono">0{index + 1}</span>
                <span>{screenshot.title}</span>
              </span>
            </button>
          ))}
        </div>
        <figcaption className="gallery-caption" aria-live="polite">
          <p>{current.caption}</p>
          <span className="mono">
            {current.scene} / {String(active + 1).padStart(2, "0")} OF 03
          </span>
        </figcaption>
      </figure>
      <dialog
        className="screenshot-dialog"
        aria-label="LuxEngine screenshot viewer"
        ref={dialog}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            setActive(
              (index) =>
                (index +
                  (event.key === "ArrowRight" ? 1 : screenshots.length - 1)) %
                screenshots.length,
            );
          }
        }}
      >
        <div className="screenshot-dialog-top">
          <span className="mono">LUXENGINE / {current.title}</span>
          <button
            autoFocus
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close screenshot viewer"
          >
            Close ✕
          </button>
        </div>
        <Image
          src={current.src}
          alt={current.alt}
          width={3839}
          height={2088}
          unoptimized
        />
        <div className="screenshot-dialog-bottom">
          <button
            type="button"
            aria-label="Previous screenshot"
            onClick={() =>
              setActive(
                (index) =>
                  (index + screenshots.length - 1) % screenshots.length,
              )
            }
          >
            ← Previous
          </button>
          <a href={current.src} target="_blank" rel="noopener noreferrer">
            Open original image ↗
          </a>
          <button
            type="button"
            aria-label="Next screenshot"
            onClick={() =>
              setActive((index) => (index + 1) % screenshots.length)
            }
          >
            Next →
          </button>
        </div>
      </dialog>
    </>
  );
}
