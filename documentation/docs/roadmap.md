# Roadmap to 2027.1

The plan for the next release lives on the [LuxEngine project board](https://github.com/orgs/starbounded-dev/projects/3) on GitHub, and every item on it is an issue in the [`2027.1` milestone](https://github.com/starbounded-dev/LuxEngine/milestone/1). This page explains how to read it. The board itself is always more current than this page.

## When 2027.1 is done

2027.1 is ready when someone who has never seen the engine can download **one zip**, install only the **.NET SDK**, and make and export:

- a small **3D game**: an animated character walking a lit level, a menu and a HUD, sound, saved progress and rebindable controls;
- a small **2D game**: animated sprites on a tilemap;

on **Windows and on Linux**, and the exported game runs on a PC with nothing installed.

Measured against that, the engine today is strong in rendering, audio, physics and asset packing, and has four holes: no animation, no game UI, a thin C# API, and a lot of code that builds but has never been run.

## The must-haves

The [roadmap on the LuxEngine page](https://www.starbounded.com/lux#roadmap) reads the project board and shows the current must-haves, their sub-issues, sizes and progress. Open a card to see its issue and the latest discussion. This guide describes the release goal; the board owns the changing list of work.

## Wanted, if there's time

The roadmap's **Wanted** column contains P1 work for the release. These items are the first to drop if the must-haves run late; their current list and status are on the live board.

## Not in 2027.1

Some things are deliberately left for 2028.1 or later: navigation meshes, terrain, baked global illumination, ray tracing, a launcher for multiple engine versions, and a cutscene sequencer. If animation, game UI and 2D aren't all done and used by the two sample games by about September 2027, the release becomes 2028.1 and pulls some of those in.

Some things are never planned: temporal rendering (TAA or temporal upscalers), anything a game maker has to install besides the .NET SDK, ImGui as a game's UI, visual scripting alongside C#, an asset store, accounts or telemetry.

## Following along

The roadmap section on the [LuxEngine page](https://www.starbounded.com/lux#roadmap) shows the same board: wanted items, must-haves not started, what's in progress, and the latest merged work. Each card links to its issue.
