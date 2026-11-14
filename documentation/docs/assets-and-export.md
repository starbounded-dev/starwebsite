# Assets and exporting a game

## How assets are addressed

Every asset has a **UUID handle**. Scenes, prefabs and materials refer to assets by that handle, not by file path, so you can move or rename a file in the Content Browser without breaking what points at it. The asset registry maps each handle to its source file and type, and the **Asset Manager** panel shows the whole registry.

There are two asset managers behind one interface. The editor's reads source files and imports them as needed. The runtime's reads from packs, described below. Loading can happen asynchronously.

## What gets imported

| Asset | How it comes in |
| --- | --- |
| Meshes | Through [Assimp](https://github.com/assimp/assimp). The sample project uses glTF. glTF `alphaMode` and `doubleSided` are read, so cut-out foliage like Sponza's comes in right. |
| Textures | The texture importer, with mipmaps. Cut-out textures keep their alpha coverage at every mip, so leaves don't thin out in the distance. |
| Materials | `.lmat` material assets, edited in the Material Editor. |
| Scenes and prefabs | YAML files. |
| Scripts | C# source, built into the project's script assembly. |
| Audio | FMOD Studio banks, built from your `.fspro`. See [Audio](audio.md). |

Meshes have **levels of detail**, which the Scene Renderer's LOD settings control. Shaders compile to SPIR-V, and a reflection cache keeps shader hot reload fast.

## Packs

For a runtime build, the project is packed into binary files instead of loose assets:

- an **asset pack**, with every asset the game uses, FMOD banks included;
- a **shader pack**, with the compiled shaders.

The player loads only from these, so a shipped game doesn't need the source files or a shader compiler.

## Exporting

**File → Export Runtime…** in the editor builds a standalone player for the current project. The export runs off the main thread, and the editor shows a progress overlay and stays locked until it finishes. It packs the assets and shaders and puts them beside `Lux-Runtime`, the player that runs a packed project without the editor.

You can also run the player yourself. On Linux:

```bash
./scripts/Linux-RunRuntime.sh release
```

On Windows, set `Lux-Runtime` as the startup project in Visual Studio and run it.

On Linux you can wrap the editor or the player in an AppImage. It bundles the binary, the vendored Vulkan, Assimp and Aftermath libraries, the resources and the .NET host:

```bash
./packaging/linux/build-appimage.sh release editor    # LuxEditor.AppImage
./packaging/linux/build-appimage.sh release runtime   # LuxRuntime.AppImage
```

## Before you ship anything

- **Check Audio Validation** in the Audio Debugger. It reports the problems that make an exported game silent.
- **Licences.** FMOD and Asterwave are inside every exported game. LuxEngine's Apache-2.0 licence covers only LuxEngine's own code. Read FMOD's terms, and the licence and provenance files in the Asterwave checkout, before you distribute a build. Asterwave is linked statically, so it can't be removed by deleting a DLL.
- **Use `dist`.** The `dist` configuration has link-time optimisation and leaves out Tracy and Aftermath.

## What's missing

- **Export expects a source checkout.** As the code stands, the export looks for the engine repository and can build the runtime with MSBuild. Exporting from a plain download, with no source tree or Visual Studio, doesn't work yet.
- **Players may need .NET installed.** Whether an exported game carries its own .NET runtime hasn't been checked on a clean PC.
- **No branding fields** for the executable name, icon or version info.
- **One pack per game.** Patch and DLC packs aren't supported.
- **Same OS only.** You export for the operating system you're on.

A stand-alone export, from the release zip, with no .NET install needed by players and with the game's name and icon, is must-have M6 for 2027.1 on the [project board](https://github.com/orgs/starbounded-dev/projects/3).
