"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";

const loadFeatures = () =>
  import("@/lib/motion-features").then((module) => module.default);

export function InteractionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const timer = setTimeout(
      () => delete document.documentElement.dataset.entry,
      500,
    );
    return () => clearTimeout(timer);
  }, []);

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
