# Starbounded

The Starbounded website, built in Next.js. Starbounded is presented as a product company: a house brand in night ink and starlight yellow, with each product carrying its own colour. LuxEngine, the first product, keeps its violet and its existing logo. [docs/DESIGN.md](docs/DESIGN.md) describes the identity.

## Run locally

Install Node.js and Python 3.11 or newer, then run these commands in PowerShell:

```powershell
npm install
python -m venv .venv-docs
.\.venv-docs\Scripts\python -m pip install -r documentation/requirements.txt
npm run dev
```

Open http://localhost:3000. The company home page is at `/`, the LuxEngine product page is at `/lux`, and documentation is at `/docs/`.

On macOS or Linux, use `.venv-docs/bin/python` when installing the Python requirements.

## Validate

```sh
npx tsc --noEmit
npm run lint
npm test
npm run build
```

In Windows environments where Turbopack cannot create worker processes, use `npm run dev -- --webpack` and `npm run build -- --webpack`.

## Features

- Responsive company and product pages, including mobile navigation.
- A data-driven product list (`lib/products.ts`) with a per-product accent colour set by `data-product`.
- Persistent dark and light themes, with a dark default.
- A project-board roadmap and keyboard-accessible setup tabs.
- Copyable setup commands with a selection fallback when clipboard access is unavailable.
- Three real LuxEngine screenshots with keyboard-accessible view selection and a full-size viewer supporting Escape to close.
- Locally optimized screenshots; no analytics or added external runtime services.
- MkDocs documentation with search, a light/dark theme, and guides for the public LuxEngine `dev` branch.

## Frontend structure

The pages, shared header/footer, and roadmap content remain Server Components. Client components handle tabs, the mobile navigation, clipboard actions, the screenshot dialog, and theme state.

`components/ui/` contains shadcn-style Radix primitives, adapted to the Starbounded design rather than a preset theme. Tabs provide roving focus and arrow/Home/End keys. The dialog traps focus and restores it to the control that opened it. The mobile popover handles Escape, outside clicks, and dismissal when returning to the desktop layout.

Tailwind v4 maps the light/dark color and font variables to utilities. Base styles and the identity-specific CSS use cascade layers so utility overrides work predictably. The house tokens and the product accent groups are at the top of `app/globals.css`.

`InteractionProvider` loads Motion's layout features in a separate chunk and respects the operating system's reduced-motion setting. Shared tab indicators move between selected controls; panels, disclosures, and overlays use short CSS transitions. The home page entrance runs once per tab session and keeps the content available without JavaScript. No route transition delays navigation.

`npm test` runs DOM interaction tests for keyboard navigation, independent component instances, clipboard success/failure and late completion, dialog focus, mobile dismissal, and theme synchronization. These tests do not measure rendered layout or animation frame rate.

## Documentation

Edit Markdown pages in `documentation/docs/` and navigation in `documentation/mkdocs.yml`. Run `npm run docs:serve` for an auto-reloading docs preview, or `npm run docs:build` for a strict link-checked build. The website's normal development and production builds generate docs into `public/docs/` automatically.

The [documentation maintainer guide](documentation/README.md) explains the setup and hosting. Vercel installs the Python dependencies before building the website; the docs publish with that same deployment at https://www.starbounded.com/docs/.

## Screenshots

The LuxEngine page gallery has 15 editor screenshots, listed in `lib/screenshots.ts`. Two come from the project owner (original PNGs in docs/source-images/): `lux-render-features.webp` and `lux-material-editor.webp`. The other 13 (`lux-dist-*.webp` and the scene captures such as `lux-sponza-vaults.webp`, `lux-material-field.webp`, `lux-many-lights.webp`) were taken from the Dist (release) editor at 3840 x 2088, cropped only to remove the window border. Play-mode shots view the scene through its own camera; nothing was staged or composited.

The home-page hero uses public/images/lux-hero.webp (2560 x 1392), the Sponza vaults capture resized. The screenshot is shown in full, without overlaid text or cropping. The gallery and full-size viewer also show the complete captures.

The previous generated landscape is no longer used on the website or in social previews.

## Logos

The LuxEngine logo (public/luxengine-logo.png) is the existing project asset and is only used for LuxEngine. The Starbounded mark is drawn in code (`BrandMark` in components/Icons.tsx), with a standalone copy at public/starbounded-mark.svg. app/icon.png, app/apple-icon.png, and app/favicon.ico are rendered from that mark.
