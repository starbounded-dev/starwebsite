# Profiling and debugging

LuxEngine ships with its measuring tools switched on in every build except `dist`. The rule the renderer work follows is simple: no "looks faster", only before and after numbers on the same scene, from the same camera.

## Which tool answers which question

| Question | Tool |
| --- | --- |
| Is this frame CPU-bound or GPU-bound? | **Renderer Debugger** panel |
| Which render pass got slower? | **Renderer Debugger** panel |
| What is the CPU doing, thread by thread? | **Tracy** |
| Why is this pass slow: overdraw, barriers, occupancy? | **RenderDoc** or **Nsight Graphics** |
| Why did the GPU crash? | **Nvidia Aftermath** dumps |
| Where's the frame time going, at a glance? | **Profiler** panel |

Start with the lightest tool that answers the question.

## In the editor

**Renderer Debugger** (closed by default; open it from **View**) reads real GPU timestamp queries for each render pass, not CPU-side guesses. It shows:

- GPU and CPU milliseconds for each pass, with history graphs;
- the total GPU time for the scene, the sum of the profiled passes, and the **CPU/GPU delta**, which is the fastest way to see whether a frame is CPU- or GPU-bound;
- work against wait time for the main and render threads, which tells you whether the render thread is starved or saturated.

**Profiler** puts the frame on one screen: CPU frame time against a 60 fps budget, with the per-pass GPU timings beside it. It only shows data the engine already collects.

The viewport also has a small **performance HUD** with frame rate and frame time, which you can toggle from its overlay settings.

## Tracy

[Tracy](https://github.com/wolfpld/tracy) is compiled into every build but `dist`, in on-demand mode, so it costs almost nothing until you connect the Tracy profiler. Every render pass is a named zone, as are `BeginScene`, `EndScene`, `FlushDrawList` and the render graph's build-and-compile step.

Tracy covers **CPU time only**. GPU time comes from the engine's own per-pass queries in the Renderer Debugger. A Tracy GPU integration was tried and taken out because its calibration step crashed at startup, and the engine already attributes GPU cost per pass.

Build with `--no-tracy` to leave it out entirely. Pass the flag on every project generation, or you'll get undefined references.

## RenderDoc and Nsight

Every render pass is emitted as a named GPU debug marker, so a capture shows a labelled pass tree (`ShadowMapPass`, `GBufferPass`, `GTAO` and so on) with no extra setup. The engine has scripts that start the editor inside RenderDoc, already hooked:

```bash
./scripts/Linux-RenderDoc.sh debug     # Linux
scripts\Win-RenderDoc.bat debug        # Windows; build the configuration first
```

Capture with **F12** or **Print Screen** in the editor, or **Trigger Capture** in RenderDoc. On Linux the editor runs under XWayland for this, because RenderDoc can't read a Wayland window's keyboard; set `LUX_RENDERDOC_WAYLAND=1` to stay on Wayland and use Trigger Capture instead. RenderDoc isn't bundled.

Use **Nsight Graphics** on NVIDIA hardware when you need GPU occupancy and stall analysis.

## Crashes and validation

- **Nvidia Aftermath** writes GPU crash dumps in builds that include it. Leave it out with `--no-aftermath`.
- **Vulkan validation layers** are on in `debug` builds, along with assertions and Jolt floating-point exceptions.
- **AddressSanitizer** comes with the `debug-as` configuration on Windows.
- **Memory tracking** is built in, and on Linux crash backtraces come from libdw and libunwind.

## Shader hot reload

**Ctrl+Shift+R** reloads every shader. Shaders compile to SPIR-V with a reflection cache, so a reload only redoes the work that changed.

## Headless tests

The engine has regression suites that run without a window, a GPU device or a sound card:

```bash
python tests/audio/run.py
python tests/audio/run_managed.py
python tests/audio/run_sdk_layout.py
python tests/rendering/run_shadow_shader.py
python tests/runtime/run_resources.py
```

## Measuring honestly

If you report a performance change, include the hardware, driver, resolution, build configuration, scene and camera, and give before and after numbers from the same setup. The engine's [renderer performance baseline](https://github.com/starbounded-dev/LuxEngine/blob/dev/docs/RENDERER_PERF_BASELINE.md) describes the harness the renderer work is measured against. Most recorded numbers so far come from a single NVIDIA RTX 4070 Ti, which is why testing on AMD and Intel GPUs is a 2027.1 must-have (M9).
