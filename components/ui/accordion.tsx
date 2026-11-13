"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;
export const AccordionItem = AccordionPrimitive.Item;

export function AccordionTrigger({
  children,
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header asChild>
      <h4 className="m-0 font-normal">
        <AccordionPrimitive.Trigger
          data-slot="accordion-trigger"
          className={cn(
            "group flex min-h-[44px] w-full touch-manipulation items-center justify-between gap-[16px] border-0 text-left text-[15px] font-semibold transition-colors duration-150 hover:text-accent",
            className,
          )}
          {...props}
        >
          {children}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden="true"
            className="text-accent"
          >
            <path d="M5 12h14" />
            {/* The upright stroke fades out, turning the plus into a minus. */}
            <path
              d="M12 5v14"
              className="transition-opacity duration-150 group-data-[state=open]:opacity-0"
            />
          </svg>
        </AccordionPrimitive.Trigger>
      </h4>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn("accordion-content overflow-hidden", className)}
      {...props}
    />
  );
}
