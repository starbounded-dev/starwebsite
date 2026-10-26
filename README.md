# Starbounded Studio

The Starbounded website, built in Next.js with its own studio-workbench identity: a violet and silver palette drawn from the LuxEngine logo, clear sans-serif type, and real editor screenshots.

## Run locally

Install Node.js and Python 3.11 or newer, then run these commands in PowerShell:

```powershell
npm install
python -m venv .venv-docs
.\.venv-docs\Scripts\python -m pip install -r documentation/requirements.txt
npm run dev
```

Open http://localhost:3000. The studio homepage is at `/`, the LuxEngine page is at `/lux`, and documentation is at `/docs/`.

On macOS or Linux, use `.venv-docs/bin/python` when installing the Python requirements.

## Validate

```sh
npx tsc --noEmit
npm run build
```

In Windows environments where Turbopack cannot create worker processes, use `npm run dev -- --webpack` and `npm run build -- --webpack`.

## Features

- Responsive studio and engine pages, including mobile navigation.
- Persistent dark and light themes, with a light default.
- Expandable roadmap details and keyboard-accessible setup tabs.
- Copyable setup commands with a selection fallback when clipboard access is unavailable.
- Three real LuxEngine screenshots with keyboard-accessible view selection and a full-size viewer supporting Escape to close.
- Locally optimized screenshots; no analytics or added external runtime services.
- MkDocs documentation with search, a light/dark theme, and guides for the public LuxEngine `dev` branch.

## Documentation

Edit Markdown pages in `documentation/docs/` and navigation in `documentation/mkdocs.yml`. Run `npm run docs:serve` for an auto-reloading docs preview, or `npm run docs:build` for a strict link-checked build. The website's normal development and production builds generate docs into `public/docs/` automatically.

The [documentation maintainer guide](documentation/README.md) explains the setup and hosting. Vercel installs the Python dependencies before building the website; the docs publish with that same deployment at https://www.starbounded.com/docs/.

## Screenshots

The website uses three screenshots provided by the project owner, captured in the LuxEngine editor. The original PNGs are preserved in docs/source-images/. The WebP files preserve the full screenshots without visual changes or cropping. The hero version is resized proportionally.

| Image                | Website asset                          | Original resolution |
| -------------------- | -------------------------------------- | ------------------- |
| Sponza in the editor | public/images/lux-editor-sponza.webp   | 3839 x 2088         |
| Rendering test scene | public/images/lux-render-features.webp | 3839 x 2088         |
| Material editor      | public/images/lux-material-editor.webp | 3839 x 2088         |

The home-page workbench uses public/images/lux-hero.webp (2560 x 1392). The screenshot is shown in full, without overlaid text or cropping. The gallery and full-size viewer also show the complete captures.

The previous generated landscape is no longer used on the website or in social previews. The LuxEngine logo is the existing project asset.
