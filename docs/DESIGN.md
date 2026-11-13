# Starbounded visual identity

Starbounded is presented as a product company: a house brand, with each product carrying its own colour. LuxEngine is the first product.

## House brand

- **Line:** Tools for people who build worlds.
- **Logo:** a star held between two opposite bounding-box corners, the pair of points an editor needs to frame an object. The corners take the text colour; the star is always starlight yellow. Source: `BrandMark` in `components/Icons.tsx`, with a standalone copy at `public/starbounded-mark.svg`. The icon files in `app/` put the same mark on a night tile.
- **Wordmark:** "Starbounded" in Mona Sans at width 118, weight 600. No "Studio" suffix.
- **Colour:** night ink and warm paper neutrals, plus one accent, starlight yellow. Dark is the default theme; light is a full second theme, not an inversion. Yellow is a fill colour (buttons, the star). Where the accent has to be text on the light theme it becomes a deep amber.
- **Type:** Mona Sans only. Headlines use the wide end of its width axis; body text uses the normal width. Two weights, 400 and 600. JetBrains Mono is reserved for commands and code.
- **Framing:** the same two corners from the logo frame the hero capture and the closing panel (`components/Bounds.tsx`). They are used sparingly so they keep meaning "this is the thing we are pointing at".
- **Canvas:** a sparse, static star field behind the hero only. No gradients, glows, or glass.

## Product colour

A section or page sets `data-product="<slug>"`. That swaps the accent group (`--accent`, `--accent-fill`, `--on-accent`, `--tint`) and nothing else. LuxEngine is violet, taken from its logo. The LuxEngine logo itself is unchanged and is only ever used for LuxEngine.

To add a product: add an entry to `lib/products.ts`, give it a page, and add a `[data-product="<slug>"]` colour group beside the LuxEngine one in `app/globals.css`.

## Pages

- **Home** introduces the company: the line, the flagship capture, the product list (including a plain "Next up" row for what is not announced), a closer look at LuxEngine, and how the company works.
- **LuxEngine** is the product page: facts, the capture gallery, what works today, what comes next, and how to build it.

## Rules that keep it honest

- Imagery is real product captures, shown straight-on and uncropped. No mock-ups or device frames.
- Product statements come from the product's own README. The site says what works, what is partial, and what does not exist yet.
- Sentence case everywhere. No uppercase label text, and no monospace outside code.
- One filled button style per page; secondary actions are links or outlines.

Design tokens live at the top of `app/globals.css`.
