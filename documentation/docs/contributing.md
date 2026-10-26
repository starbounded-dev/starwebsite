# Contributing

You can help LuxEngine by reporting a problem, improving a guide, or making a focused code change. A clear question or a small reproduction is useful, too.

Engine work belongs in [starbounded-dev/LuxEngine](https://github.com/starbounded-dev/LuxEngine/tree/dev). These guides target its `dev` branch. This documentation is maintained with the website in [starbounded-dev/starwebsite](https://github.com/starbounded-dev/starwebsite).

## Report an engine problem

Search the [existing engine issues](https://github.com/starbounded-dev/LuxEngine/issues) first. If the problem is new, describe what you were trying to do, what happened, and what you expected instead.

Include:

- The branch and commit you built.
- Your operating system, GPU, and driver version when relevant.
- Your build configuration and any local changes.
- The smallest set of steps that reproduces the problem.
- Relevant log output, error text, or screenshots.
- Whether it also happens in an unmodified sample scene.

For a rendering issue, add the scene name, viewport resolution, camera view, and relevant renderer or material settings. Before-and-after images from the same view are easier to compare. The [rendering guide](rendering.md) has a practical comparison workflow.

Check logs and attachments for personal paths, credentials, and unrelated private information before sharing them.

## Propose a code change

For a larger change, open an issue to explain the problem and proposed approach before spending a lot of time on it. Keep a pull request focused on one change where possible.

In the pull request description, explain:

1. The problem it addresses.
2. What changes for someone using or building the engine.
3. How you checked it, including the build configuration and scenes used.
4. Any known limitations or follow-up work.

Include comparison images for visible rendering or editor changes. Follow the [`dev` branch setup instructions](https://github.com/starbounded-dev/LuxEngine/blob/dev/README.md). The older `master` README uses some legacy names.

Browse [engine pull requests](https://github.com/starbounded-dev/LuxEngine/pulls) to see work already in progress.

## Improve these docs

The Markdown sources live in [`documentation/docs` on the website's `dev` branch](https://github.com/starbounded-dev/starwebsite/tree/dev/documentation/docs). Edit the relevant page there and submit the change to the website repository. Engine source changes belong in the engine repository.

Good documentation changes include clearer setup steps, a correction verified against a named revision, or a short explanation of a tool you have used. Describe what you actually tested and distinguish working behavior from plans.

If an editor layout has changed, include the engine revision with your correction. The screenshots in these guides are development captures, so a different layout alone does not mean your build is broken.

For documentation or website problems, use the [website issue tracker](https://github.com/starbounded-dev/starwebsite/issues).
