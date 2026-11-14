## What changed

<!-- One or two sentences on what a visitor or a contributor will notice. -->

## Why

<!-- The problem this solves. Link the issue: "Fixes #12". -->

## Required

Every box here must be ticked before this can merge. The "PR checklist" check fails until they are. If an item truly doesn't apply, tick it and say why on the same line.

- [ ] Tests, lint and typecheck pass locally (`npm test`, `npm run lint`, `npx tsc --noEmit`), and new behaviour has a test
- [ ] The production build passes (`npm run build`, which also runs the strict docs build)
- [ ] Every new or changed claim about LuxEngine has a source: its README, its code, or a recorded measurement, on the branch where current work lives (see `.claude/skills/website-copy`)
- [ ] Checked in a browser at desktop and phone width, in dark and light themes, with no console errors (or: no visible change)
- [ ] The linked issue is in "Why", or there's no issue for this
- [ ] This branch was cut from `dev` and targets `dev` (or it's a `dev` → `master` release)

## When it applies

- [ ] Ran `npm run roadmap:sync` and committed `lib/roadmap.json` after moving cards on the project board
- [ ] Screenshots or a short recording of the visible change are below
- [ ] Docs pages say which LuxEngine branch they describe

## Screenshots

<!-- Before and after, desktop and phone. -->
