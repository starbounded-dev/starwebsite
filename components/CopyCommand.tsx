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
      <div className="flex items-start gap-[12px] rounded-[8px] bg-code px-[16px] py-[16px] text-code-ink inset-ring inset-ring-white/10 max-[760px]:px-[12px] max-[760px]:py-[14px]">
        <span
          aria-hidden="true"
          className="font-mono text-[14px] leading-[1.7] text-code-ink/50 select-none"
        >
          $
        </span>
        <code
          ref={code}
          className="min-w-0 flex-1 font-mono text-[14px] leading-[1.7] wrap-anywhere max-[760px]:text-[13px]"
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
          className="touch-target grid shrink-0 place-items-center border-0 p-[3px] text-code-ink/70 transition-[color,transform] duration-150 hover:text-code-ink focus-visible:outline-code-ink active:scale-[0.97]"
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
        className="mt-[14px] min-h-[21px] text-[14px] leading-[1.5] text-muted"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message}
      </div>
    </>
  );
}
