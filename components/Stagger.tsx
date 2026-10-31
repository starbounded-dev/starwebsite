import type { ReactNode } from "react";

// CSS keeps server-rendered content visible even before JavaScript is available.
export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className} data-stagger="true">
      {children}
    </div>
  );
}
