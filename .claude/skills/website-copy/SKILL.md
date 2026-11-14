---
name: website-copy
description: Rules for writing or editing any text on starbounded.com or in the LuxEngine docs (pages, feature lists, roadmap wording, MkDocs guides). Use before changing user-facing copy in app/, components/, lib/ or documentation/.
---

# Website and docs copy

Specific beats impressive. A senior graphics programmer should finish a page trusting it more, and a newcomer should still follow it.

## Rules

1. **Every technical claim needs a source.** The LuxEngine README and code on the branch where current work lives (check the last commits on every active branch, not only `dev`; in November 2026 that was `feature/lucky-merge`), a plan in its `docs/`, the code, or a measurement someone recorded. No source, no claim. Never fill a gap with something plausible. Examples of plausible-but-false claims this rule exists to stop: "targets DirectX 12" (Vulkan only; D3D branches unbuilt), "ray-traced AO" (GTAO, screen space), "NRI (NVRHI)" (two different NVIDIA libraries).
2. **Name the real systems and say what they do for the user.** Jolt, Box2D, Coral on .NET, EnTT, miniaudio, Soundwave, GTAO, clustered light culling, a render graph. One clause on what it gets the reader.
3. **What the reader gets first, how it works second, a link for depth.** One idea per sentence. Specific does not mean dense: no stacks of six noun phrases.
4. **Numbers only when measured,** with the hardware and scene ("1.81 ms GPU on an RTX 4070 Ti, Benchmark scene"). Otherwise say "not measured yet" or leave it out.
5. **Say plainly what is missing or partial.** "No skeletal animation yet." "The scripting API has no physics bindings." Honesty is the brand.
6. **Depth follows the page.** `/lux` and the docs go deep. The home page introduces the company and stays plain.
7. **No filler, marketing or technical.** Not: utilize, leverage, seamless, robust, cutting-edge, powerful, ensure, empower, next-generation, "it's not just X, it's Y".

House style from `docs/DESIGN.md` still applies: sentence case, no uppercase label text, no monospace outside code, one filled button per page.

## Before publishing a change

- Check each claim against the README section it came from. The README itself can be wrong or contradict itself (render-graph compile caching is listed as both done and ongoing); prefer the code or recent commits, and open an issue for the contradiction.
- Read it aloud. If a sentence sounds like a press release, rewrite it as you would say it to another engineer.
- Run the `humanizer` skill on long new passages.
