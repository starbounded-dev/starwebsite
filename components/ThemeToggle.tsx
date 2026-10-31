"use client";
import { useEffect, useRef, useSyncExternalStore } from "react";

const themeEvent = "starbounded-theme-change";

function subscribe(onChange: () => void) {
  window.addEventListener(themeEvent, onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== "starbounded-theme" && event.key !== null) return;
    const theme = event.newValue === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(themeEvent, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

const getTheme = () => document.documentElement.dataset.theme === "dark";
const getServerTheme = () => false;

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const transitionFrame = useRef<number>(0);

  useEffect(
    () => () => {
      cancelAnimationFrame(transitionFrame.current);
      delete document.documentElement.dataset.themeSwitching;
    },
    [],
  );

  function toggle() {
    const next =
      document.documentElement.dataset.theme === "light" ? "dark" : "light";
    cancelAnimationFrame(transitionFrame.current);
    document.documentElement.dataset.themeSwitching = "true";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("starbounded-theme", next);
    } catch {
      /* Theme still works without storage. */
    }
    window.dispatchEvent(new Event(themeEvent));
    transitionFrame.current = requestAnimationFrame(() => {
      transitionFrame.current = requestAnimationFrame(() => {
        delete document.documentElement.dataset.themeSwitching;
      });
    });
  }
  return (
    <button
      className="touch-target grid size-[35px] place-items-center rounded-[6px] border-0 text-muted transition-[color,background-color,transform] duration-150 hover:bg-tint hover:text-accent active:scale-[0.97] max-[760px]:w-[31px]"
      type="button"
      onClick={toggle}
      aria-label="Dark theme"
      aria-pressed={dark}
      title={dark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <svg
        className="sun-icon"
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" />
      </svg>
      <svg
        className="moon-icon"
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        <path d="M20.8 13A9 9 0 0 1 11 3a9 9 0 1 0 9.8 10Z" />
      </svg>
    </button>
  );
}
