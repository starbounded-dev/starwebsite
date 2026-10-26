# Getting started

Build LuxEngine from the public **`dev` branch**, which contains the current editor shown on the website. The repository's default `master` branch still contains the older StarEngine / StarEditor project. Its names, dependencies, and setup scripts differ.

These instructions follow [`dev` at commit `76062c9c`](https://github.com/starbounded-dev/LuxEngine/tree/76062c9c2089d82f9a21bba2e86ec282ecf4fa00). Check the [branch README](https://github.com/starbounded-dev/LuxEngine/blob/dev/README.md) when updating your checkout. There is no prebuilt editor download provided by this documentation site.

## Prerequisites

For Windows, install:

- **Git and Git LFS**, for source code, submodules, and large assets.
- **Visual Studio 2022** with Desktop development with C++ and a Windows SDK. The setup menu also supports Visual Studio 2026.
- **Python 3.9 or newer**, including pip, with `python` available in your terminal. Setup installs its Python helper packages.
- **.NET SDK 9**, specifically, for `ScriptCore` and Coral's managed scripting host.
- **Vulkan SDK 1.4.x**, including shader debug libraries if you plan to build Debug. The Windows setup currently offers **1.4.341.1** if the check fails; Linux's script downloads **1.4.335.0** by default.
- **FMOD Engine SDK 2.03.x** with both Core and Studio APIs, and **Vercidium Audio SDK 1.9.x**. Both are required by project generation.

Get the audio SDKs from [FMOD](https://www.fmod.com/download) and [Vercidium](https://vercidium.com/docs). They are proprietary packages supplied under their vendors' terms, and are not included in the public repository. The [engine README](https://github.com/starbounded-dev/LuxEngine/blob/dev/README.md#required-sdks) describes the expected versions and layouts. FMOD Studio's authoring application is useful for editing and building audio banks.

## 1. Clone the current source

Run these commands in PowerShell:

```powershell
git lfs install
git clone --branch dev --recursive https://github.com/starbounded-dev/LuxEngine.git
cd LuxEngine
git lfs pull
```

If you previously cloned without submodules, run this from the repository root:

```powershell
git submodule update --init --recursive
```

## 2. Supply the audio SDKs

Extract the packages into the engine's expected drop points:

```text
Core/vendor/FMOD/<package-name>/api/
Core/vendor/VA_RAY/3d/
```

Alternatively, point setup at the packages you already installed. In the same PowerShell terminal you will use for generation:

```powershell
$env:LUX_FMOD_SDK = 'C:\SDKs\FMOD Studio API Windows'
$env:LUX_VA_SDK = 'C:\SDKs\VA_RAY'
```

Use your actual paths. `LUX_FMOD_SDK` must contain `api/`; `LUX_VA_SDK` must contain `3d/`. Premake checks headers, import libraries, and runtime libraries, and reports the exact missing file if a package is incomplete. Never commit SDK packages to your repository.

## 3. Generate the solution

From the repository root:

```powershell
.\scripts\Setup.bat
```

Select optional features and your Visual Studio version in the setup menus. Setup checks Vulkan, pulls Git LFS assets and submodules, sets `LUX_DIR`, and generates the engine and sample script projects. Your selections are saved in `scripts/.luxsetup.json`.

If the Vulkan installer opens, finish it, open a new terminal to pick up `VULKAN_SDK`, and run setup again. Project generation is already part of setup; a separate generator run is useful later when source files change.

## 4. Build and launch

1. Open **`Lux.sln`** for Visual Studio 2022, or **`Lux.slnx`** for Visual Studio 2026.
2. Start with the **Release** configuration. The solution uses **Mixed Platforms** to combine native x64 projects with managed projects.
3. Set **`Editor`** as the startup project. The generated workspace initially selects `Core`, which is a library.
4. Build the solution, then run the editor from Visual Studio.

From a Visual Studio Developer terminal, the VS2022 solution can also be built with:

```powershell
MSBuild Lux.sln /restore /m /p:Configuration=Release /p:Platform="Mixed Platforms"
```

`/restore` is required for the managed projects. The editor executable is produced at `bin/Release-windows-x86_64/Editor/Editor.exe`. For a manual launch, use `Editor/` as the working directory so resource paths resolve. The bundled sample project is `Editor/LuxSampleProject/LuxSample.luxproj`.

These instructions are checked against the published source definitions. This documentation setup does not run a full native engine build on your machine; see [Troubleshooting](troubleshooting.md) for failed prerequisite checks and common build errors.

## Linux

The public `dev` tree also contains a Linux build path. Install the [distribution-specific dependencies](https://github.com/starbounded-dev/LuxEngine/blob/dev/README.md#building-on-linux), including .NET 9, Clang, GNU make, GTK3, X11/Wayland development libraries, and the two audio SDKs. For the supplied Vercidium Audio 1.9 Linux binary, the engine's build documentation specifies **glibc 2.43**, using Ubuntu 26.04 for CI; an older distribution may not link it.

Then run from the repository root:

```bash
./scripts/Linux-Build.sh release
./scripts/Linux-Run.sh release
```

The build script downloads a pinned Premake binary and the Linux Vulkan SDK when they are absent, generates makefiles, and builds. The run script also checks the build and prepares the library paths. Prefer it to launching the executable directly from `bin/`.

## Regenerate after source changes

Premake does not regenerate project files during an ordinary rebuild. After adding, removing, or renaming sources, or changing a Premake definition, run:

```powershell
.\scripts\Win-GenProjects.bat --last
```

This reuses the saved Windows configuration without the setup menus. Reload the solution in Visual Studio and rebuild. On Linux, rerun `Linux-Build.sh` with the same configuration and feature options.

## Source references

- [Development README](https://github.com/starbounded-dev/LuxEngine/blob/dev/README.md)
- [Windows setup](https://github.com/starbounded-dev/LuxEngine/blob/dev/scripts/Setup.py)
- [Windows generator options](https://github.com/starbounded-dev/LuxEngine/blob/dev/scripts/BuildOptions.py)
- [Windows Vulkan checks](https://github.com/starbounded-dev/LuxEngine/blob/dev/scripts/Vulkan.py)
- [Linux build script](https://github.com/starbounded-dev/LuxEngine/blob/dev/scripts/Linux-Build.sh)
- [SDK discovery and validation](https://github.com/starbounded-dev/LuxEngine/blob/dev/Dependencies.lua)
