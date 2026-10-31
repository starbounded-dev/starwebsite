"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as m from "motion/react-m";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// shadcn/ui's Radix composition, using the studio's existing visual tokens.
export const Tabs = TabsPrimitive.Root;

export function TabsList(props: ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List data-slot="tabs-list" {...props} />;
}

export function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative isolate touch-manipulation transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "tab-panel min-w-0 focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-accent data-[state=inactive]:hidden",
        className,
      )}
      {...props}
    />
  );
}

export function TabHighlight({
  layoutId,
  className,
}: {
  layoutId: string;
  className?: string;
}) {
  return (
    <m.span
      aria-hidden="true"
      layoutId={layoutId}
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 bg-tint",
        className,
      )}
      transition={{ type: "spring", stiffness: 500, damping: 42 }}
    />
  );
}
