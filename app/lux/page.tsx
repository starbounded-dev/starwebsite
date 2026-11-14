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
    "LuxEngine is Starbounded’s open-source 3D game engine and editor, written in C++20 on Vulkan for Windows and Linux. See what works today and build it from source.",
};

const specs = [
  { term: "Language", detail: "C++20" },
  { term: "Graphics", detail: "Vulkan" },
  { term: "Platforms", detail: "Windows, Linux" },
  { term: "License", detail: "Apache-2.0" },
  { term: "Status", detail: "In development" },
];

// Summarized from "What works today" in the LuxEngine README.
const systems = [
  {
    term: "Rendering",
    detail:
      "A deferred PBR pipeline with clustered light culling, a render graph, cascaded shadow maps, GTAO, screen-space reflections, bloom, and depth of field.",
  },
  {
    term: "Editor",
    detail:
      "A docking editor with gizmos, snapshot undo and redo, a command palette, a content browser, a profiler, and a material editor.",
  },
  {
    term: "Scenes and prefabs",
    detail:
      "ECS scenes with entity hierarchies, prefabs with variants, YAML serialization, and Play, Simulate, and Stop in the editor.",
  },
  {
    term: "Physics",
    detail:
      "3D rigid bodies, colliders, and a character controller on Jolt. 2D bodies and colliders on Box2D.",
  },
  {
    term: "Scripting",
    detail:
      "C# script components on .NET 9, with hot reload and attribute-driven inspectors. The scripting API is still partial.",
  },
  {
    term: "Assets and runtime",
    detail:
      "A UUID-based asset pipeline with binary asset packs, and a standalone runtime that plays a packaged project without the editor.",
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
                LuxEngine is written in C++20 on Vulkan, with a deferred PBR
                renderer and a docking editor. It is in active development and
                not production-ready, and the source is open.
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
              The engine is early, so this list is specific. The README keeps
              the same list for what is partial and what is missing.
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
              Not here yet: skeletal animation, particles, terrain, networking,
              and any platform beyond Windows and Linux.
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
              There is no packaged build yet. Three steps get you to the editor
              on Windows, and the setup guide covers the SDKs to install first.
            </p>
            <ul className="requirements" role="list">
              <li>Visual Studio 2022</li>
              <li>Vulkan SDK 1.4</li>
              <li>.NET SDK 9</li>
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
              Questions, bug reports, and pull requests are all welcome. A small
              scene that reproduces the problem helps the most.
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
