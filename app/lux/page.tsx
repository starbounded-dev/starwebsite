import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Arrow } from "@/components/Icons";
import { Bounds } from "@/components/Bounds";
import { ScenePreview } from "@/components/ScenePreview";
import { Roadmap } from "@/components/Roadmap";
import { SetupGuide } from "@/components/SetupGuide";
import { luxRepoUrl } from "@/lib/navigation";
import {
  RELEASE,
  board,
  formatDate,
  releaseCounts,
  syncedAt,
} from "@/lib/roadmap";

export const metadata: Metadata = {
  title: "LuxEngine",
  description:
    "LuxEngine is Starbounded’s 3D game engine and editor: C++20, Vulkan through NVIDIA NRI, Jolt physics, C# scripting on .NET 10 and a built-in audio engine with its own ray-traced acoustics, for Windows and Linux. See what works today, what is planned for 2027.1, and how to build it.",
};

const specs = [
  { term: "Language", detail: "C++20" },
  { term: "Graphics", detail: "Vulkan, through NVIDIA NRI" },
  { term: "Platforms", detail: "Windows, Linux" },
  { term: "License", detail: "Apache-2.0" },
  { term: "Status", detail: "In development" },
];

// Sources: "What works today" in the LuxEngine README on feature/lucky-merge
// (PR 36, on its way into dev: the built-in audio engine, Soundwave and .NET 10),
// plus the render features merged in PR 35 (area lights, FFT bloom, glass
// refraction), which the README does not list yet.
const systems = [
  {
    term: "Rendering",
    detail:
      "Deferred PBR with a G-buffer, and point and spot lights culled per froxel cluster before shading. Transparents draw in their own forward pass, with glass refraction. A render graph skips any pass whose feature is off.",
  },
  {
    term: "Lights and shadows",
    detail:
      "Rect, disk, sphere and tube area lights, shaded with Linearly Transformed Cosines. Cascaded shadow maps for the sun, shadow maps for spot lights, and a Preetham sky or an HDR environment map for ambient light.",
  },
  {
    term: "Image",
    detail:
      "GTAO, screen-space reflections, FFT convolution bloom and depth of field. Exposure is manual, EV100, a physical camera (aperture, shutter, ISO) or histogram auto-exposure, tonemapped with ACES or AgX.",
  },
  {
    term: "Audio",
    detail:
      "A built-in engine on miniaudio. You author Sounds in the editor from clips and containers (random, sequence, layer, switch), group them into Sound Banks that load together, and mix them with buses, effects, snapshots and a reverb return. Soundwave, the engine’s own acoustics, muffles sound through walls by material, carries it around corners and through doorways, and measures each room’s reverb on the GPU.",
  },
  {
    term: "Editor",
    detail:
      "A docking ImGui editor with gizmos, snapshot undo and redo with a History panel, a command palette, a content browser, a material editor, Beam for editing text files, a profiler and an audio debugger.",
  },
  {
    term: "Scenes and prefabs",
    detail:
      "EnTT scenes with entity hierarchies and folders. Prefabs have variants that keep per-component overrides. Scenes save as YAML, and the editor can Play, Simulate and Stop them.",
  },
  {
    term: "Physics",
    detail:
      "Jolt for 3D: rigid bodies, box, sphere, capsule, mesh and compound colliders, physics layers and a character controller. Box2D for 2D, with box and circle colliders only.",
  },
  {
    term: "Scripting",
    detail:
      "C# on .NET 10 through Coral, with hot reload and inspectors driven by attributes like [Range] and [Tooltip]. Scripts can reach entities, transforms, input, assets and audio. Physics and renderer bindings don’t exist yet.",
  },
  {
    term: "Assets and runtime",
    detail:
      "Assets are addressed by UUID. Meshes come in through Assimp. A project packs into binary asset and shader packs, and Lux-Runtime plays the packed project without the editor.",
  },
];

export default function LuxPage() {
  return (
    <>
      <Nav engine />
      <main id="main-content" data-product="lux">
        <section className="wrap product-hero" id="overview">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/#products">Products</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">LuxEngine</span>
          </nav>
          <div className="product-title">
            <Image
              src="/luxengine-logo.png"
              alt=""
              width={208}
              height={208}
              priority
            />
            <h1>LuxEngine</h1>
          </div>
          <div className="product-pitch">
            <p>A 3D game engine and editor you can read, build, and change.</p>
            <div>
              <p className="lede">
                LuxEngine is written in C++20 and renders with Vulkan through
                NVIDIA’s NRI. It has a deferred, clustered PBR renderer, Jolt
                physics, C# scripting and a docking editor. One person builds it,
                partly to learn how engines fit together. It isn’t
                production-ready, and it doesn’t pretend to be.
              </p>
              <div className="button-row">
                <a href="#setup" className="button button-primary">
                  Get the source <Arrow />
                </a>
                <a href={luxRepoUrl} className="text-link">
                  View on GitHub <Arrow diagonal />
                </a>
              </div>
            </div>
          </div>
          <dl className="spec-strip">
            {specs.map((spec) => (
              <div key={spec.term}>
                <dt>{spec.term}</dt>
                <dd>{spec.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="wrap product-gallery" id="screenshots">
          <ScenePreview />
        </section>

        <section className="wrap section" id="inside">
          <div className="section-head">
            <h2>What works today.</h2>
            <p>
              The engine is early, so the list is specific. Everything here is
              in the code. The built-in audio and .NET 10 are in pull request
              36, which is on its way into the dev branch.
            </p>
          </div>
          <dl className="inside-grid">
            {systems.map((system) => (
              <div key={system.term}>
                <dt>{system.term}</dt>
                <dd>{system.detail}</dd>
              </div>
            ))}
          </dl>
          <div className="inside-note">
            <p>
              Not here yet: skeletal animation, game UI, particles, terrain,
              navigation and networking. No macOS, consoles or mobile, and no
              DirectX backend.
            </p>
            <a
              href={`${luxRepoUrl}/blob/dev/README.md#what-works-today`}
              className="text-link"
            >
              Read the full status <Arrow diagonal />
            </a>
          </div>
        </section>

        <section className="band" id="roadmap">
          <div className="wrap section">
            <div className="section-head board-head">
              <div>
                <h2>The road to {RELEASE}.</h2>
                <p>
                  {RELEASE} is done when someone new to the engine can download
                  one zip, install only the .NET SDK, and make and export a small
                  3D game and a small 2D game on Windows and on Linux: an
                  animated character in a lit level, a menu and a HUD, sound,
                  saved progress, and rebindable controls.
                </p>
                <p className="board-sync">
                  {releaseCounts.issues} issues in the {RELEASE} milestone:{" "}
                  {releaseCounts.mustHaves} must-haves, {releaseCounts.wanted}{" "}
                  wanted, {releaseCounts.cuts} removals. Synced from the project
                  board on <time dateTime={syncedAt}>{formatDate(syncedAt)}</time>.
                </p>
              </div>
              <a href={board.url} className="text-link">
                Open the project board <Arrow diagonal />
              </a>
            </div>
            <Roadmap />
          </div>
        </section>

        <section className="wrap section split" id="setup">
          <div className="split-copy">
            <h2>Build it from source.</h2>
            <p className="lede">
              There’s no packaged build yet, so you build it yourself. You need
              a C++ toolchain, Python, the Vulkan SDK and .NET 10. Audio is built
              into the engine, so there’s nothing else to install.
            </p>
            <p className="setup-note">
              The dev branch still asks for FMOD until pull request 36 merges.
              To build the version described here today, clone{" "}
              <code>feature/lucky-merge</code> instead.
            </p>
            <ul className="requirements" role="list">
              <li>Visual Studio 2022 or 2026</li>
              <li>Python 3.9+</li>
              <li>Vulkan SDK 1.4.335</li>
              <li>.NET SDK 10</li>
            </ul>
            <div className="split-links">
              <a href="/docs/getting-started.html" className="text-link">
                Read the setup guide <Arrow />
              </a>
              <a href="/docs/getting-started.html#linux" className="text-link">
                Building on Linux <Arrow />
              </a>
            </div>
          </div>
          <SetupGuide />
        </section>

        <section className="wrap closing" aria-labelledby="closing-title">
          <div className="closing-panel">
            <Bounds />
            <h2 id="closing-title">Found a rough edge? Tell us.</h2>
            <p>
              Questions, bug reports and pull requests are all welcome. A small
              scene that shows the problem helps more than anything else.
            </p>
            <div className="button-row">
              <a href={luxRepoUrl} className="button button-outline">
                Open the repository <Arrow diagonal />
              </a>
              <a href={`${luxRepoUrl}/issues`} className="text-link">
                Report an issue <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
