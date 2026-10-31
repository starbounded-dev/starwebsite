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
            "group flex w-full touch-manipulation items-center justify-between border-0 pb-[6px] text-left text-[12px] transition-colors duration-150 hover:text-accent",
            className,
          )}
          {...props}
        >
          {children}
          <span
            aria-hidden="true"
            className="text-[20px] text-accent transition-transform duration-180 ease-out group-data-[state=open]:rotate-45 motion-reduce:transition-none"
          >
            +
          </span>
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
