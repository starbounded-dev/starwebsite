export type NavigationLink = {
  label: string;
  href: string;
  /** Static MkDocs pages need a full document navigation. */
  document?: boolean;
};

export const navigationLinks = [
  { label: "Studio", href: "/#studio" },
  { label: "LuxEngine", href: "/lux" },
  { label: "Docs", href: "/docs/", document: true },
  { label: "Forward", href: "/#roadmap" },
  { label: "Get started", href: "/#get-started" },
] as const satisfies readonly NavigationLink[];
