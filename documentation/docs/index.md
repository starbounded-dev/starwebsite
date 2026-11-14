# LuxEngine docs

LuxEngine is a 3D game engine and editor from Starbounded, written in C++20 on Vulkan for Windows and Linux. These guides get you from a clean machine to a running editor, then explain what each part of the engine does and what it doesn't do yet.

They follow the **`dev` branch**, which has the current code. The repository's default `master` branch still holds the older StarEngine project.

!!! note "Before you start"
    Building LuxEngine currently needs the FMOD Engine SDK and read access to the private Asterwave repository. [Getting started](getting-started.md) explains why, and what to do if you don't have access.

<div class="grid cards" markdown>

- **Build it**

    The SDKs to install, then clone, fetch, generate and build, on Windows or Linux.

    [Getting started →](getting-started.md)

- **Find your way around**

    Edit, Play and Simulate, camera controls, shortcuts, and every panel.

    [The editor →](editor.md)

- **Rendering and materials**

    What the deferred renderer does, what it deliberately doesn't, and how to compare changes.

    [Rendering →](rendering.md)

- **Audio**

    FMOD Studio for playback, Asterwave for acoustics, and See the Sound to check them.

    [Audio →](audio.md)

- **Scripting**

    C# on .NET 9: a first script, the API you can reach, and what's missing.

    [Scripting →](scripting.md)

- **Scenes and physics**

    EnTT scenes, prefabs with variants, Jolt in 3D and Box2D in 2D.

    [Scenes and physics →](scenes-and-physics.md)

- **Assets and export**

    UUID handles, imports, asset and shader packs, and exporting a player.

    [Assets and export →](assets-and-export.md)

- **Profiling**

    The Renderer Debugger, Tracy, RenderDoc, Aftermath and the headless tests.

    [Profiling →](profiling.md)

</div>

## A look inside

![The LuxEngine editor with the Sponza scene open](assets/images/lux-editor-sponza.webp)

*A development capture of the scene, hierarchy, rendering controls and content browser in one workspace. Your checkout may look different as the editor changes.*

## What's next

The [roadmap](roadmap.md) explains the plan for 2027.1 and links to the project board, where every item is a GitHub issue.

## If something gets in the way

Start with [Troubleshooting](troubleshooting.md). If you're still stuck, open a [GitHub issue](https://github.com/starbounded-dev/LuxEngine/issues) with your branch, commit, setup output and the steps that led to the problem. [Contributing](contributing.md) has the details.

[Back to Starbounded ↗](https://www.starbounded.com/)
