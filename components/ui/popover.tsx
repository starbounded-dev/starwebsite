"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ComponentProps } from "react";

export const Popover = PopoverPrimitive.Root;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export function PopoverContent(
  props: ComponentProps<typeof PopoverPrimitive.Content>,
) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content {...props} />
    </PopoverPrimitive.Portal>
  );
}
