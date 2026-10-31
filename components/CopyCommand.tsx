"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useId, useRef, useState } from "react";

type CopyState = "idle" | "copying" | "copied" | "selected";

export function CopyCommand({
  command,
  note,
}: {
  command: string;
  note: string;
}) {
  const [state, setState] = useState<CopyState>("idle");
  const code = useRef<HTMLElement>(null);
  const attempt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const statusId = useId();

  useEffect(
    () => () => {
      attempt.current += 1;
      clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    const currentAttempt = ++attempt.current;
    clearTimeout(timer.current);
    setState("copying");
    try {
      await navigator.clipboard.writeText(command);
      if (attempt.current !== currentAttempt) return;
      setState("copied");
      timer.current = setTimeout(() => setState("idle"), 2400);
    } catch {
      if (attempt.current !== currentAttempt) return;
      if (code.current) {
        const range = document.createRange();
        range.selectNodeContents(code.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      setState("selected");
    }
  }

  const message =
    state === "copied"
      ? "Copied to clipboard"
      : state === "selected"
        ? "Command selected. Press Ctrl+C or ⌘C to copy."
        : state === "copying"
          ? "Copying command…"
          : note;

  return (
    <>
      <div className="flex items-start gap-[11px] rounded-[7px] bg-[#21192e] px-[14px] py-[17px] text-[#e8ddf6] max-[760px]:px-[11px] max-[760px]:py-[15px]">
        <span
          aria-hidden="true"
          className="font-mono text-[12px] text-[#b693ed]"
        >
          $
        </span>
        <code
          ref={code}
          className="min-w-0 flex-1 font-mono text-[11px] leading-[1.8] wrap-anywhere max-[760px]:text-[10px]"
        >
          {command}
        </code>
        <button
          aria-label={state === "copied" ? "Command copied" : "Copy command"}
          aria-describedby={statusId}
          aria-busy={state === "copying"}
          title={state === "copied" ? "Copied" : "Copy command"}
          type="button"
          onClick={copy}
          className="touch-target grid shrink-0 place-items-center border-0 p-[3px] text-[#cbb5e8] transition-[color,transform] duration-150 hover:text-white focus-visible:outline-[#cbb5e8] active:scale-[0.97]"
        >
          <AnimatePresence initial={false} mode="popLayout">
            <m.span
              key={state === "copied" ? "copied" : "copy"}
              className="grid size-[18px] place-items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                {state === "copied" ? (
                  <path d="m5 12 4 4L19 6" />
                ) : (
                  <>
                    <rect x="8" y="8" width="12" height="13" rx="1" />
                    <path d="M16 8V3H3v13h5" />
                  </>
                )}
              </svg>
            </m.span>
          </AnimatePresence>
        </button>
      </div>
      <div
        id={statusId}
        className="mono mt-[20px] min-h-[15px] text-[9px] tracking-[0.02em] text-muted max-[760px]:text-[8px]"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message}
      </div>
    </>
  );
}
