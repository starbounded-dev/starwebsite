export type NavigationLink = {
  label: string;
  href: string;
  /** Static MkDocs pages need a full document navigation. */
  document?: boolean;
  /** Leaves the site. */
  external?: boolean;
};

export const githubOrgUrl = "https://github.com/starbounded-dev";
export const luxRepoUrl = "https://github.com/starbounded-dev/LuxEngine";
export const contactEmail = "hello@starbounded.com";

export const navigationLinks = [
  { label: "Products", href: "/#products" },
  { label: "LuxEngine", href: "/lux" },
  { label: "Docs", href: "/docs/", document: true },
  { label: "Company", href: "/#company" },
] as const satisfies readonly NavigationLink[];

export const footerGroups = [
  {
    title: "Products",
    links: [
      { label: "LuxEngine", href: "/lux" },
      { label: "Screenshots", href: "/lux#screenshots" },
      { label: "Roadmap", href: "/lux#roadmap" },
      { label: "Get the source", href: "/lux#setup" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs/", document: true },
      {
        label: "Setup guide",
        href: "/docs/getting-started.html",
        document: true,
      },
      {
        label: "Troubleshooting",
        href: "/docs/troubleshooting.html",
        document: true,
      },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#company" },
      { label: "GitHub", href: githubOrgUrl, external: true },
      { label: "Contact", href: `mailto:${contactEmail}`, external: true },
    ],
  },
] as const satisfies readonly {
  title: string;
  links: readonly NavigationLink[];
}[];
