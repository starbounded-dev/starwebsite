# Troubleshooting

These notes target the public **`dev` branch**, matching the [getting started guide](getting-started.md). Check your branch first: `master` contains the older StarEngine / StarEditor project and uses a different setup.

## There is no `Lux.sln` or `Editor` project

Check your checkout:

```powershell
git branch --show-current
git rev-parse --short HEAD
```

The newer public `dev` branch generates `Lux.sln` for VS2022 or `Lux.slnx` for VS2026. Its startup application is `Editor`. If you see `StarEngine.sln` and `StarEditor`, you have the older tree. Use a separate `dev` checkout if you want to keep that existing work.

If no solution was generated, correct setup's first reported error and rerun `.\scripts\Setup.bat` from the repository root.

## `python` or pip is unavailable

Install Python 3.9 or newer with pip and make `python` available on PATH. Open a new terminal and check:

```powershell
python --version
python -m pip --version
```

Setup uses that same interpreter to install its helper packages. If Windows opens the Store instead, select your installed Python interpreter or adjust the Windows Python app execution alias, then rerun setup.

## Vulkan SDK is missing or rejected

The Windows `dev` script checks that `VULKAN_SDK` points to a **1.4.x** installation and currently offers the **1.4.341.1** installer. Its Linux counterpart downloads **1.4.335.0** by default. Use the check from the script in your checkout when versions change.

After installing the SDK, open a new terminal and inspect:

```powershell
$env:VULKAN_SDK
```

It should be the actual SDK directory. Rerun setup after installation finishes. On Linux, an explicitly set `VULKAN_SDK` pointing to a missing directory is an error; correct it, or unset it to let the script use its default download location.

## Shader debug libraries are missing

The Windows script checks for `Lib\shaderc_sharedd.lib` under `VULKAN_SDK`. Install the matching SDK's shader debug libraries to build Debug. Start with **Release** while resolving a Debug-only library issue.

## `Required audio SDK file missing`

FMOD Engine and Vercidium Audio are mandatory on `dev`. Download the SDKs directly from their vendors and follow the [required SDKs section](https://github.com/starbounded-dev/LuxEngine/blob/dev/README.md#required-sdks).

- `LUX_FMOD_SDK` must point to the package root containing `api/`, with both Core and Studio APIs.
- `LUX_VA_SDK` must point to the package root containing `3d/`.
- Supply the package for the target platform; Windows import libraries do not satisfy a Linux build.

The generation error names the exact absent file. Fix that package or path, then regenerate the solution. These SDKs are not included by a recursive clone and must not be committed or republished with documentation.

## .NET host is missing, or `NETSDK1004` appears

Install **.NET SDK 9**. The published scripting host expects major version 9; a different major version alone does not satisfy it.

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

## Linux reports missing GTK or incompatible glibc

`gtk+-3.0` development files are required by the file-dialog library. Follow the [distribution-specific dependency list](https://github.com/starbounded-dev/LuxEngine/blob/dev/README.md#building-on-linux).

The supplied Vercidium Audio 1.9 Linux binary requires **glibc 2.43**, according to the engine's build documentation. Ubuntu 24.04's older glibc cannot satisfy it. Use a compatible environment rather than replacing system glibc manually.

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
