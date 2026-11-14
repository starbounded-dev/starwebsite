# Troubleshooting

These notes match the [getting started guide](getting-started.md), which follows the newest work on `feature/lucky-merge` (on its way into `dev`). Check your branch first: `master` contains the older StarEngine / StarEditor project and uses a different setup.

## There is no `Lux.sln` or `Editor` project

Check your checkout:

```powershell
git branch --show-current
git rev-parse --short HEAD
```

Current LuxEngine generates `Lux.sln` for VS2022 or `Lux.slnx` for VS2026. Its startup application is `Editor`. If you see `StarEngine.sln` and `StarEditor`, you have the older tree. Use a separate `dev` checkout if you want to keep that existing work.

If no solution was generated, correct setup's first reported error and rerun `.\scripts\Setup.bat` from the repository root.

## `python` or pip is unavailable

Install Python 3.9 or newer with pip and make `python` available on PATH. Open a new terminal and check:

```powershell
python --version
python -m pip --version
```

Setup uses that same interpreter to install its helper packages. If Windows opens the Store instead, select your installed Python interpreter or adjust the Windows Python app execution alias, then rerun setup.

## Vulkan SDK is missing or rejected

The README pins **Vulkan SDK 1.4.335.0**. The Windows setup script checks that `VULKAN_SDK` points to a 1.4 installation and offers the installer if it doesn't; the Linux script downloads 1.4.335.0 into `Core/vendor/VulkanSDK/`. If the versions in your checkout differ, the scripts there are the authority.

After installing the SDK, open a new terminal and inspect:

```powershell
$env:VULKAN_SDK
```

It should be the actual SDK directory. Rerun setup after installation finishes. On Linux, an explicitly set `VULKAN_SDK` pointing to a missing directory is an error; correct it, or unset it to let the script use its default download location.

## Shader debug libraries are missing

The Windows script checks for `Lib\shaderc_sharedd.lib` under `VULKAN_SDK`. Install the matching SDK's shader debug libraries to build Debug. Start with **Release** while resolving a Debug-only library issue.

## An Audio Source is silent and logs "has an FMOD event but no Sound"

The scene was made when LuxEngine used FMOD. FMOD references never play now. Assign a Sound to the source; the inspector still shows the old event so you know what it was. To clear every old reference at once, use **Project Settings → Audio → Legacy FMOD Data**; see [Audio](audio.md#projects-made-with-fmod).

## A Sound plays late or stalls a frame

The Sound isn't in a loaded Sound Bank, so it loads the first time it plays. Add it to a bank and list that bank under **Scene Sound Banks** in the Audio Mixer. Debug builds warn about this once, and the Audio Debugger's validation lists Sounds in no bank.

## The build asks for FMOD or Asterwave

You're on a branch from before the built-in audio engine, such as `dev` before pull request 36 merges. Clone or switch to `feature/lucky-merge`, which needs neither; see [Getting started](getting-started.md).

## .NET host is missing, or `NETSDK1004` appears

If the editor stops at startup with a `hostfxr` or "runtime not found" error, you have an older .NET (8 or 9) instead of 10. Install the **.NET 10 SDK**. On Linux the package is `dotnet-sdk` on Arch and `dotnet-sdk-10.0` on Debian, Ubuntu and Fedora.

```powershell
dotnet --list-sdks
dotnet --list-runtimes
```

For `NETSDK1004`, build with NuGet restore enabled:

```powershell
MSBuild Lux.sln /restore /m /p:Configuration=Release /p:Platform="Mixed Platforms"
```

## A vendor folder or large asset is missing

From the repository root:

```powershell
git submodule update --init --recursive
git lfs pull
git submodule status --recursive
```

Keep the first failing URL and error if a download stops. Authentication, an unavailable upstream repository, and a compiler failure need different fixes. Do not replace a pinned submodule with an arbitrary newer revision to get past a failed download.

## New source files are missing or produce unresolved symbols

Premake does not regenerate the solution during a normal build. On Windows:

```powershell
.\scripts\Win-GenProjects.bat --last
```

Reload the solution and rebuild. Keep the same feature options between generation runs, especially `no-tracy`. On Linux, rerun the build script with the same options. If the failure remains, inspect the actual compiler or linker error; regeneration does not supply missing implementations or libraries.

## Visual Studio tries to run `Core`

`Core` is a static library and is the workspace's initial startup selection. In Solution Explorer, set **Editor → Set as Startup Project**, then build and run it.

## The executable cannot find resources or shared libraries

For a manual Windows launch, use the repository's `Editor/` directory as the working directory. Keep the runtime libraries copied by the build beside the executable.

On Linux, use `./scripts/Linux-Run.sh release`. It prepares the Vulkan and library environment and checks the build. An executable launched directly from `bin/` can miss that environment.

## Linux reports missing GTK

The file-dialog library (NFD-Extended) needs the `gtk+-3.0` development files. Install them from the [package list for your distribution](https://github.com/starbounded-dev/LuxEngine/blob/dev/README.md#building-on-linux).

Older guides mentioned a glibc 2.43 requirement. That came from a prebuilt audio library the engine no longer uses; audio is now compiled from source with your own toolchain. Ubuntu 26.04 is what CI uses; older distributions haven't been checked.

## `llvm-ar: not found` in a `dist` build

Ubuntu ships `llvm-ar` with a version suffix, and Premake calls the plain name. Link it once:

```bash
sudo ln -sf "$(ls -1 /usr/bin/llvm-ar-* | sort -V | tail -1)" /usr/bin/llvm-ar
```

## "Script project file not found" in the editor

The sample project's `.csproj` is generated, not committed. Run `Editor/LuxSampleProject/Assets/Scripts/Linux-GenProjects.sh` on Linux, or rerun `Linux-Build.sh`. On Windows, rerun `Setup.bat` or `Win-GenProjects.bat --last`.

## Reporting an issue

Include:

- Operating system, compiler or Visual Studio version, and selected build configuration.
- Branch and commit, using the commands at the top of this page.
- The command you ran and the first complete error message.
- Whether submodules, Git LFS assets, and the required SDKs are installed.

Open an issue in the [LuxEngine repository](https://github.com/starbounded-dev/LuxEngine/issues). Remove access tokens and proprietary SDK contents from any attached logs.

## Source references

- [Setup implementation](https://github.com/starbounded-dev/LuxEngine/blob/dev/scripts/Setup.py)
- [Vulkan checks](https://github.com/starbounded-dev/LuxEngine/blob/dev/scripts/Vulkan.py)
- [Managed project target](https://github.com/starbounded-dev/LuxEngine/blob/dev/ScriptCore/ScriptCore.csproj)
- [SDK validation](https://github.com/starbounded-dev/LuxEngine/blob/dev/Dependencies.lua)
- [Linux build and launch instructions](https://github.com/starbounded-dev/LuxEngine/blob/dev/README.md#running)
