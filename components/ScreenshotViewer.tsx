"use client";

import Image from "next/image";
import type { RefObject } from "react";
import type { EngineScreenshot } from "@/lib/screenshots";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";

type ScreenshotViewerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  screenshot: EngineScreenshot;
  onPrevious: () => void;
  onNext: () => void;
  opener: RefObject<HTMLButtonElement | null>;
  fallbackFocus: RefObject<HTMLButtonElement | null>;
  id: string;
};

export function ScreenshotViewer({
  open,
  onOpenChange,
  screenshot,
  onPrevious,
  onNext,
  opener,
  fallbackFocus,
  id,
}: ScreenshotViewerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        id={id}
        className="screenshot-dialog"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          const target = opener.current?.isConnected
            ? opener.current
            : fallbackFocus.current;
          target?.focus();
        }}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          if (event.key === "ArrowLeft") onPrevious();
          else onNext();
        }}
      >
        <DialogTitle className="sr-only">
          LuxEngine screenshot viewer: {screenshot.title}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Use the left and right arrow keys to browse screenshots. Press Escape
          to close.
        </DialogDescription>
        <div className="screenshot-dialog-top">
          <span className="mono" aria-live="polite">
            LUXENGINE / {screenshot.title}
          </span>
          <DialogClose asChild>
            <button
              type="button"
              className="touch-target"
              aria-label="Close screenshot viewer"
            >
              Close ✕
            </button>
          </DialogClose>
        </div>
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          width={3839}
          height={2088}
          unoptimized
        />
        <div className="screenshot-dialog-bottom">
          <button
            type="button"
            className="touch-target"
            aria-label="Previous screenshot"
            onClick={onPrevious}
          >
            ← Previous
          </button>
          <a href={screenshot.src} target="_blank" rel="noopener noreferrer">
            Open original image ↗
          </a>
          <button
            type="button"
            className="touch-target"
            aria-label="Next screenshot"
            onClick={onNext}
          >
            Next →
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
