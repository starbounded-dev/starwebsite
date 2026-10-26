# LuxEngine documentation

MkDocs with Material for MkDocs, using the LuxEngine logo and Starbounded's violet and silver palette. Source pages live in `docs/`; the generated `site/` directory is ignored by Git.

## Preview locally

From the website repository root on Windows:

```powershell
python -m venv .venv-docs
.\.venv-docs\Scripts\python -m pip install -r documentation/requirements.txt
.\.venv-docs\Scripts\python -m mkdocs serve --config-file documentation/mkdocs.yml
```

Or, after installing dependencies, run `npm run docs:serve`. Open the address printed by MkDocs. The server rebuilds when a Markdown page changes.

On macOS or Linux, use `.venv-docs/bin/python` instead of `.venv-docs\Scripts\python`.

## Check before publishing

```powershell
.\.venv-docs\Scripts\python -m mkdocs build --strict --config-file documentation/mkdocs.yml
```

The strict build checks navigation, local links, and heading anchors. Add each new page to `nav` in `mkdocs.yml`. Use relative Markdown links so they work both on GitHub and in the generated site.

## Hosting

The docs are published at https://www.starbounded.com/docs/ with the existing Next.js website. `npm run docs:build` writes static files to `public/docs/`; the main `dev` and `build` commands run it automatically. Generated files are ignored by Git.

The root `vercel.json` installs the pinned Python requirements before the normal Next.js build. The strict MkDocs check runs as part of every website deployment, so broken documentation links fail the build. No separate hosting project, DNS record, or credentials are needed.

MkDocs uses flat `.html` page URLs so navigation, search, and assets work within `/docs/`. Next.js redirects `/docs` to `/docs/` and serves the generated index there. The docs theme is independent of the marketing site's CSS and includes its own light/dark toggle.
