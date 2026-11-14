# Getting started

Build LuxEngine from the public **`dev` branch**, which has the current editor shown on the website. The repository's default `master` branch still holds the older StarEngine / StarEditor project, with different names, dependencies and scripts.

These instructions follow [`dev`](https://github.com/starbounded-dev/LuxEngine/tree/dev) and its [README](https://github.com/starbounded-dev/LuxEngine/blob/dev/README.md) as of November 2026. There's no packaged editor download yet; you build it yourself.

!!! warning "Building needs access to a private repository"
    Since October 2026 the acoustics library, Asterwave, compiles from source that lives in the private `starbounded-dev/asterwave` repository. FMOD and Asterwave are hard requirements with no fallback, so without read access to that repository the build stops at project generation. If you want to build LuxEngine and don't have access, open an issue and say so.

## Prerequisites

For Windows, install:

- **Git and Git LFS**, for the source, submodules and large assets.
- **Visual Studio 2022** with Desktop development with C++ and a Windows SDK. CI builds with 2022; **Visual Studio 2026** also works with the v145 toolset.
- **Python 3.9 or newer** on `PATH`. The setup scripts install their own pip packages.
- **.NET SDK 9**, exactly. Coral, the scripting host, looks for major version 9, and `ScriptCore` targets `net9.0`. .NET 8 or 10 won't do.
- **Vulkan SDK 1.4.335.0**, the pinned version, with the shader debug libraries if you plan to build Debug. Windows setup offers the installer if it's missing. At runtime the engine only needs a Vulkan 1.2 capable driver.
- **FMOD Engine 2.03.x** with the Core and Studio APIs, from [fmod.com](https://www.fmod.com/download). It's proprietary, so it isn't in the repository. The **FMOD Studio** authoring tool from the same 2.03 family is worth installing too: it edits and builds banks, and its command-line tool `fmodstudiocl` lets the editor rebuild banks when you press Play.
- **Read access to `starbounded-dev/asterwave`**. See the warning above.

FMOD and Asterwave end up inside every game you export. LuxEngine's Apache-2.0 licence covers LuxEngine's own source only. FMOD keeps its [own licence](https://www.fmod.com/licensing), and Asterwave keeps the licence and provenance records of Vercidium Audio, which it was translated from. Read those files in the Asterwave checkout and the engine's [NOTICE](https://github.com/starbounded-dev/LuxEngine/blob/dev/NOTICE) before you ship a game.

## 1. Clone the source

In PowerShell:

```powershell
git lfs install
git clone --branch dev --recursive https://github.com/starbounded-dev/LuxEngine.git
cd LuxEngine
git lfs pull
```

If you cloned without submodules, run this from the repository root:

```powershell
git submodule update --init --recursive
```

## 2. Supply FMOD and Asterwave

Fetch Asterwave with Git credentials that can read its repository. The script checks out the exact revision named in `scripts/dependencies/Asterwave.json` into `Core/vendor/Asterwave/`:

```powershell
python scripts/FetchAsterwave.py
python scripts/FetchAsterwave.py --check   # validate an existing checkout, no fetch
```

Extract FMOD into any subfolder of `Core/vendor/FMOD/`, for example `Core/vendor/FMOD/fmodstudioapi20314win/`. Or point setup at folders you already have, in the terminal you'll generate from:

```powershell
$env:LUX_FMOD_SDK = 'C:\SDKs\FMOD Studio API Windows'   # the folder that contains api/
$env:LUX_ASTERWAVE_ROOT = 'C:\Source\Asterwave'          # must be the pinned revision
$env:LUX_FMOD_STUDIO_CL = 'C:\Program Files\FMOD SoundSystem\FMOD Studio 2.03.14\fmodstudiocl.exe'   # optional
```

Premake checks the FMOD headers and libraries and the Asterwave revision when it generates the solution. It doesn't download anything at that point, and a missing or mismatched file stops generation with that file's name. Asterwave links statically, so there's no extra DLL to install. Never commit the FMOD package or the Asterwave checkout to your own repository.

## 3. Generate the solution

From the repository root:

```powershell
.\scripts\Setup.bat
```

Pick optional features and your Visual Studio version in the menus. Setup sets `LUX_DIR`, checks the Vulkan SDK, pulls submodules and Git LFS assets, warns about missing SDKs, and generates the engine and sample script projects. It saves your choices in `scripts/.luxsetup.json`.

If the Vulkan installer opens, finish it, open a new terminal so `VULKAN_SDK` is picked up, and run setup again.

## 4. Build and launch

1. Open **`Lux.sln`** in Visual Studio 2022, or **`Lux.slnx`** in 2026.
2. Start with **Release**. The solution uses the **Mixed Platforms** platform to combine native x64 projects with the managed C# ones.
3. Set **`Editor`** as the startup project. The generated solution starts with `Core` selected, and `Core` is a library.
4. Build, then run.

From a Visual Studio Developer terminal you can build the 2022 solution directly:

```powershell
MSBuild Lux.sln /restore /m /p:Configuration=Release /p:Platform="Mixed Platforms"
```

`/restore` is required: `ScriptCore` and `Coral.Managed` are SDK-style C# projects and fail with `NETSDK1004` without a NuGet restore. The editor lands at `bin/Release-windows-x86_64/Editor/Editor.exe`. To launch it by hand, run it from `Editor/` so resource paths resolve. The build copies `fmod.dll` and `fmodstudio.dll` next to it.

On first launch the editor opens the sample project at `Editor/LuxSampleProject/LuxSample.luxproj`.

## Linux

Linux x64 is a supported target. CI builds it on Ubuntu 26.04, and it's developed day to day on Arch. Install the [packages for your distribution](https://github.com/starbounded-dev/LuxEngine/blob/dev/README.md#building-on-linux): Clang, GNU make, pkg-config, the .NET 9 SDK, GTK3 for file dialogs, X11 and Wayland development files, and libdw and libunwind for crash backtraces.

Distro `dotnet-sdk` metapackages now install .NET 10, which won't work, so ask for `dotnet-sdk-9.0` by name. openSUSE doesn't package .NET 9 at all; use Microsoft's `dotnet-install` script there.

Fetch Asterwave and supply FMOD as in step 2 (`LUX_FMOD_SDK` and `LUX_ASTERWAVE_ROOT` work the same way), then run from the repository root:

```bash
./scripts/Linux-Build.sh release
./scripts/Linux-Run.sh release
```

`Linux-Build.sh` is safe to re-run; each step checks before it acts. In order, it:

1. checks for `dotnet`, `make`, `clang`, `pkg-config`, `curl`, `tar` and GTK3, and names whichever is missing;
2. updates submodules;
3. downloads Vulkan SDK 1.4.335.0 into `Core/vendor/VulkanSDK/`, unless `VULKAN_SDK` is set;
4. downloads a checksum-verified premake5 5.0.0-beta4;
5. generates the C# projects and builds `Coral.Managed` and `ScriptCore` with `dotnet`;
6. generates makefiles with `premake5 gmake2 --cc=clang` and builds `Core`, `Editor` and `Lux-Runtime`;
7. builds the sample project's script assembly.

Handy variables: `BUILD_CONFIG` skips the prompt, `JOBS` sets make's parallelism, `LUX_PREMAKE_OPTIONS` passes flags like `--no-tracy`, and `VULKAN_SDK` uses a system SDK.

Launch through `Linux-Run.sh`. It sets `VULKAN_SDK`, `VK_LAYER_PATH` and `LD_LIBRARY_PATH` and starts in `Editor/`; the binary in `bin/` can't find its libraries on its own. X11 and Wayland both work. `Linux-RunRuntime.sh` starts the standalone player, and `Linux-RenderDoc.sh` starts the editor inside RenderDoc.

For a `dist` build on Debian or Ubuntu, link the version-suffixed `llvm-ar` to the plain name, because Premake calls `llvm-ar`:

```bash
sudo ln -sf "$(ls -1 /usr/bin/llvm-ar-* | sort -V | tail -1)" /usr/bin/llvm-ar
```

## Build configurations

| Configuration | Optimisation | Symbols | What it's for |
| --- | --- | --- | --- |
| `debug` | off | on | Assertions, Jolt floating-point exceptions and Vulkan validation layers. |
| `debug-as` | off | on | AddressSanitizer, on Windows. On Linux it's a plain debug build. |
| `release` | on | default | Day-to-day work. Built for AVX2 with BMI, POPCNT, LZCNT and F16C. |
| `dist` | full | off | Shipping builds: link-time optimisation, no Tracy, no Aftermath. |

Binaries land in `bin/<Config>-<os>-x86_64/<Project>/`.

Premake options, which `Setup.bat` offers as checkboxes and Linux takes through `LUX_PREMAKE_OPTIONS`:

| Flag | Effect |
| --- | --- |
| `--no-tracy` | Leaves out Tracy instrumentation, so builds are smaller and link faster. Pass it on every generation, or you'll get undefined references. |
| `--no-aftermath` | Leaves out the Nvidia Aftermath GPU crash tracker. |
| `--discord` | Turns on the Discord Social SDK integration. Needs `Core/vendor/discord_social_sdk/`. |

## Regenerate after source changes

Premake doesn't regenerate project files during a normal rebuild. After you add, remove or rename source files, or change a Premake script, run:

```powershell
.\scripts\Win-GenProjects.bat --last
```

`--last` reuses the saved configuration without the menus. Reload the solution and rebuild. On Linux, rerun `Linux-Build.sh` with the same options.

## Source references

- [Development README](https://github.com/starbounded-dev/LuxEngine/blob/dev/README.md)
- [Windows setup](https://github.com/starbounded-dev/LuxEngine/blob/dev/scripts/Setup.py)
- [Asterwave pin](https://github.com/starbounded-dev/LuxEngine/blob/dev/scripts/dependencies/Asterwave.json)
- [Linux build script](https://github.com/starbounded-dev/LuxEngine/blob/dev/scripts/Linux-Build.sh)
- [SDK discovery and validation](https://github.com/starbounded-dev/LuxEngine/blob/dev/Dependencies.lua)
