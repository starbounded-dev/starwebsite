---
name: branch-and-issue
description: Starbounded git workflow. Use before starting any new feature (cut a feature branch from the current branch) and whenever a bug is found (open a GitHub issue). Applies to interactive sessions and scheduled tasks in starbounded-dev repos.
---

# Branch and issue workflow

Two rules, set by the repo owner. Follow them without being asked.

## 1. A new feature gets its own branch

Before editing code for a new feature:

1. Note the current branch: `git branch --show-current` (usually `dev`). That is the parent.
2. If the working tree has uncommitted changes that belong to something else, stop and ask what to do with them. Don't carry them onto the feature branch silently.
3. Create the branch from the parent: `git switch -c feature/<short-kebab-slug>`.
4. Do the work and commit on that branch.
5. When it's done, offer to merge it back into the parent or open a PR against the parent (not `master`, unless the parent is `master`). Pushing, merging and opening PRs still need the owner's go-ahead.

A fix to work already on the current branch, or a small tweak the owner asked for on that branch, is not a new feature. Stay on the branch for those.

## 2. A bug gets an issue

When a bug turns up (in a test, in the browser, in a review, or from the owner):

1. Check for an existing issue first: `gh issue list --repo starbounded-dev/<repo> --search "<keywords>" --state all`.
2. If there is none, open one:
   ```bash
   gh issue create --repo starbounded-dev/<repo> --label bug --title "<what breaks, plainly>" --body-file <file>
   ```
   Body: what happens, steps to reproduce, what should happen, the files and lines involved, and the branch and commit where you saw it. Be specific. Name the component, the input and the exact error text.
3. Tell the owner the issue link.
4. If you're going to fix it now, branch `fix/<issue-number>-<slug>` from the current branch and put `Fixes #<n>` in the commit or PR body.

Creating the issue is pre-approved. Closing issues, commenting on other people's issues, and changing labels on existing ones are not. Ask first.

## Project board

The org tracks work on https://github.com/orgs/starbounded-dev/projects/3. When `gh` has the `project` scope, add new bug issues to it with `gh project item-add 3 --owner starbounded-dev --url <issue-url>`. If the scope is missing, say so and tell the owner to run `gh auth refresh -s project`.
