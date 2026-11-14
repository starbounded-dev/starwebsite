# Roadmap to 2027.1

The plan for the next release lives on the [LuxEngine project board](https://github.com/orgs/starbounded-dev/projects/3) on GitHub, and every item on it is an issue in the [`2027.1` milestone](https://github.com/starbounded-dev/LuxEngine/milestone/1). This page explains how to read it. The board itself is always more current than this page.

## When 2027.1 is done

2027.1 is ready when someone who has never seen the engine can download **one zip**, install only the **.NET SDK**, and make and export:

- a small **3D game**: an animated character walking a lit level, a menu and a HUD, sound, saved progress and rebindable controls;
- a small **2D game**: animated sprites on a tilemap;

on **Windows and on Linux**, and the exported game runs on a PC with nothing installed.

Measured against that, the engine today is strong in rendering, audio, physics and asset packing, and has four holes: no animation, no game UI, a thin C# API, and a lot of code that builds but has never been run.

## The must-haves

These 13 issues block the release. Each one is split into sub-issues, and the board shows how many are done.

| | Must-have | Size |
| --- | --- | --- |
| M1 | **Hardening pass.** Run every feature marked "builds, not run" in the editor and fix what breaks: the material graph, prefab sync, the character controller, fixed update, layouts, quality tiers, area light shadows, the asset upload fix. | L |
| M2 | **Skeletal animation.** Import, playback and blending, GPU skinning, a state machine, animation events, and a C# API. | XL |
| M3 | **Game UI.** A retained UI on the 2D renderer: layout, widgets, keyboard and gamepad focus, and an editor for it in the Game View. | XL |
| M4 | **C# API completion.** Physics queries, scene loading, time and maths types, entity active flags. | L |
| M5 | **Beam basics.** Never lose work, C# build errors inline, click an error to open the line. | L |
| M6 | **Export that stands alone.** Works from the release zip with no source tree, a lean layout, no .NET install for players, and the game's name and icon. | L |
| M7 | **.NET 10.** .NET 9 is leaving support. Done on `feature/lucky-merge`; lands with pull request 36. | M |
| M8 | **Project format version.** Projects made in 2027.1 have to open in 2027.2. | M |
| M9 | **AMD and Intel GPUs.** Every measurement so far is from one NVIDIA card. | M |
| M10 | **Two sample games** made only with the release zip, one 3D and one 2D. They're the acceptance test. | L |
| M11 | **2D as a full project type.** A 2D template, sprite animation, tilemaps, sorting, complete 2D physics. | XL |
| M12 | **Linux all the way.** Render thread on, a crash watchdog, and every release check run on Linux too. | L |
| M13 | **Basic particles**, drawn in 3D and 2D. | XL |

Sizes: S is hours, M a day, L several days, XL a plan of its own.

## Wanted, if there's time

Input actions, a save-game API, player settings, autosave, reflection probes, simple fog, decals, string localisation and physics joints. These are P1 on the board and the first things dropped if the must-haves run late.

## Not in 2027.1

Some things are deliberately left for 2028.1 or later: navigation meshes, terrain, baked global illumination, ray tracing, a launcher for multiple engine versions, and a cutscene sequencer. If animation, game UI and 2D aren't all done and used by the two sample games by about September 2027, the release becomes 2028.1 and pulls some of those in.

Some things are never planned: temporal rendering (TAA or temporal upscalers), anything a game maker has to install besides the .NET SDK, ImGui as a game's UI, visual scripting alongside C#, an asset store, accounts or telemetry.

## Following along

The roadmap section on the [LuxEngine page](https://www.starbounded.com/lux#roadmap) shows the same board: wanted items, must-haves not started, what's in progress, and the latest merged work. Each card links to its issue.
