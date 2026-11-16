# Getting started

Build LuxEngine from source. There's no packaged editor download yet. Once the work below reaches the `dev` branch, every push to `dev` will publish a prebuilt pre-release zip for Windows and Linux on the [Releases page](https://github.com/starbounded-dev/LuxEngine/releases).

!!! note "Which branch"
    These steps describe the public [`dev` branch](https://github.com/starbounded-dev/LuxEngine/tree/dev) as of November 2026. [Pull request 36](https://github.com/starbounded-dev/LuxEngine/pull/36) brought built-in audio, Soundwave acoustics and .NET 10 to that branch.

    The repository's default `master` branch is the older StarEngine project, with different names and scripts.

## Prerequisites

You need two SDKs, plus a toolchain. Nothing else: audio is built into the engine, and the repository doesn't vendor any licensed binaries.

For Windows, install:

- **Git and Git LFS**, for the source, submodules and large assets.
- **Visual Studio 2022** with Desktop development with C++ and a Windows SDK. CI builds with 2022; **Visual Studio 2026** also works with the v145 toolset.
- **Python 3.9 or newer** on `PATH`. The setup scripts install their own pip packages.
- **Vulkan SDK 1.4.335.0**, the pinned version, with the shader debug libraries if you plan to build Debug. Setup offers the installer if it's missing. At runtime the engine only needs a Vulkan 1.2 capable driver.
- **.NET 10 SDK.** `ScriptCore` and Coral's managed host target `net10.0`, and Coral finds the runtime through nethost. An older .NET (8 or 9) won't do.

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

## 2. Generate the solution

From the repository root:

```powershell
.\scripts\Setup.bat
```

Pick optional features and your Visual Studio version in the menus. Setup sets `LUX_DIR`, checks the Vulkan SDK, pulls submodules and Git LFS assets, warns about anything missing, and generates the engine and sample script projects. It saves your choices in `scripts/.luxsetup.json`.

If the Vulkan installer opens, finish it, open a new terminal so `VULKAN_SDK` is picked up, and run setup again.

## 3. Build and launch

1. Open **`Lux.sln`** in Visual Studio 2022, or **`Lux.slnx`** in 2026.
2. Start with **Release**. The solution uses the **Mixed Platforms** platform to combine native x64 projects with the managed C# ones.
3. Set **`Editor`** as the startup project. The generated solution starts with `Core` selected, and `Core` is a library.
4. Build, then run.

From a Visual Studio Developer terminal you can build the 2022 solution directly:

```powershell
MSBuild Lux.sln /restore /m /p:Configuration=Release /p:Platform="Mixed Platforms"
```

`/restore` is required: `ScriptCore` and `Coral.Managed` are SDK-style C# projects and fail with `NETSDK1004` without a NuGet restore. The editor lands at `bin/Release-windows-x86_64/Editor/Editor.exe`. To launch it by hand, run it from `Editor/` so resource paths resolve.

On first launch the editor opens the sample project, `Editor/LuxSampleProject/LuxSample.luxproj`. Its `AudioDemo` scene is a good first stop; see [Audio](audio.md#try-the-demo).

## Linux

Linux x64 is a supported target. CI builds it on Ubuntu 26.04, and it's developed day to day on Arch. Install the [packages for your distribution](https://github.com/starbounded-dev/LuxEngine/blob/dev/README.md#building-on-linux): Clang, GNU make, pkg-config, the .NET 10 SDK, GTK3 for file dialogs, X11 and Wayland development files, and libdw and libunwind for crash backtraces.

The .NET package is `dotnet-sdk` on Arch and `dotnet-sdk-10.0` on Debian, Ubuntu and Fedora. If your release doesn't package .NET 10, or you're on openSUSE, use Microsoft's `dotnet-install` script.

Then run from the repository root:

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

## Prebuilt editor builds

The engine's CI is set up to publish a pre-release for every push to `dev`: one zip per platform (`LuxEngine-<version>-windows-x64.zip` and `LuxEngine-<version>-linux-x64.zip`) with the Release editor, its resources, the .NET host and the sample project. Versions look like `2026.1-a3f9c1d`: the release series, then the commit. `Editor --version` prints it. Only the ten newest are kept. These are alpha builds, and the API changes between them. As of November 2026 none have been published yet.

## Source references

- [README on dev](https://github.com/starbounded-dev/LuxEngine/blob/dev/README.md)
- [Windows setup](https://github.com/starbounded-dev/LuxEngine/blob/dev/scripts/Setup.py)
- [Linux build script](https://github.com/starbounded-dev/LuxEngine/blob/dev/scripts/Linux-Build.sh)
- [Dependency definitions](https://github.com/starbounded-dev/LuxEngine/blob/dev/Dependencies.lua)
