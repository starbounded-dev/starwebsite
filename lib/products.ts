export type Product = {
  /** Also the data-product value that selects the product's colour. */
  slug: string;
  name: string;
  summary: string;
  status: string;
  /** Shown beside the summary. Keep to facts someone could check. */
  facts: readonly string[];
  href: string;
  logo: string;
};

/**
 * The product lineup shown on the home page. To launch another product, add it
 * here, give it a page, and add a [data-product="<slug>"] colour group next to
 * the LuxEngine one in app/globals.css.
 */
export const products = [
  {
    slug: "lux",
    name: "LuxEngine",
    summary:
      "A 3D game engine and editor written in C++20 on Vulkan. The source is open, and so is the work in progress.",
    status: "In development",
    facts: ["Windows and Linux", "Apache-2.0", "Open source"],
    href: "/lux",
    logo: "/luxengine-logo.png",
  },
] as const satisfies readonly Product[];
