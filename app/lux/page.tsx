import type { Metadata } from "next";
import Image from "next/image";
import { FeatureCard } from "@/components/FeatureCard";
import { Footer } from "@/components/Footer";
import { MetricChip } from "@/components/MetricChip";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "LuxEngine",
  description:
    "LuxEngine is Starbounded Studio's early-stage open-source C++ interactive application and rendering engine for Windows.",
  openGraph: {
    title: "LuxEngine | Starbounded Studio",
    description:
      "An early-stage open-source C++ interactive application and rendering engine for Windows.",
  },
};

const quickFacts = [
  {
    value: "C++",
    label: "Core language",
    detail: "Runtime, renderer, editor, and engine systems.",
    accent: "purple",
  },
  {
    value: "Windows",
    label: "Current target",
    detail: "Visual Studio 2022 is the recommended development path.",
    accent: "yellow",
  },
  {
    value: "Vulkan",
    label: "Setup requirement",
    detail: "The Vulkan SDK is part of the current rendering setup.",
    accent: "cyan",
  },
  {
    value: "GPL-3.0",
    label: "License",
    detail: "Open-source and built where contributors can follow along.",
    accent: "coral",
  },
] as const;

const focusAreas = [
  {
    title: "Rendering core",
    description:
      "The base for planned high-fidelity 3D rendering, future 2D systems, and graphics API work.",
    icon: <SparkIcon />,
    accent: "purple",
  },
  {
    title: "Editor workflows",
    description:
      "Viewer and editor applications are planned around practical scene creation and iteration.",
    icon: <ViewportIcon />,
    accent: "yellow",
  },
  {
    title: "Asset model",
    description:
      "Projects own asset managers, scenes are treated as assets, and editor/runtime boundaries are being refined.",
    icon: <LayersIcon />,
    accent: "cyan",
  },
  {
    title: "Teaching architecture",
    description:
      "LuxEngine is built to become a capable engine while also documenting how engine systems fit together.",
    icon: <BookIcon />,
    accent: "coral",
  },
] as const;

const roadmap = [
  "Fast 2D rendering for UI, particles, and sprites.",
  "Physically based 3D rendering and material systems.",
  "DirectX, Vulkan, and Metal rendering backends over time.",
  "Viewer and editor applications for real project workflows.",
  "Scripting, physics, procedural worlds, AI, and audio systems.",
  "Long-term support beyond Windows for desktop and mobile targets.",
];

const setupSteps = [
  {
    title: "Clone with submodules",
    detail: "LuxEngine depends on third-party submodules.",
    code: "git clone --recursive https://github.com/starbounded-dev/LuxEngine",
  },
  {
    title: "Run Setup.bat",
    detail:
      "The setup script checks prerequisites and prompts for Vulkan SDK when needed.",
    code: "scripts/Setup.bat",
  },
  {
    title: "Generate projects",
    detail: "Create the Visual Studio solution for Windows development.",
    code: "scripts/Win-GenProjects.bat",
  },
];

export default function LuxPage() {
  return (
    <div className="min-h-screen overflow-hidden text-ink">
      <Nav
        items={[
          { label: "Overview", href: "#overview" },
          { label: "Focus", href: "#focus" },
          { label: "Roadmap", href: "#roadmap" },
          { label: "Setup", href: "#setup" },
        ]}
        primaryCta={{
          label: "GitHub",
          href: "https://github.com/starbounded-dev/LuxEngine",
        }}
        secondaryCta={{ label: "Studio", href: "/" }}
      />

      <main>
        <section
          id="overview"
          className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10"
        >
          <div className="max-w-2xl">
            <h1 className="max-w-[12ch] text-4xl font-semibold leading-[1.05] text-ink sm:max-w-none sm:text-6xl lg:text-7xl animate-reveal">
              LuxEngine is an engine you can learn from.
            </h1>
            <p
              className="mt-6 max-w-[350px] text-base leading-7 text-muted sm:max-w-xl sm:text-lg sm:leading-8 animate-reveal"
              style={{ animationDelay: "90ms" }}
            >
              Starbounded Studio&apos;s first engine is an early-stage C++
              interactive application and rendering engine for Windows. The aim
              is two-part: build a serious 3D engine and make the architecture
              understandable as it grows.
            </p>
            <div
              className="mt-8 flex max-w-[350px] flex-col gap-3 sm:max-w-none sm:flex-row animate-reveal"
              style={{ animationDelay: "170ms" }}
            >
              <a
                href="https://github.com/starbounded-dev/LuxEngine"
                className="inline-flex w-full items-center justify-center rounded-lg bg-purple px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-purple-deep sm:w-auto"
              >
                View repository
              </a>
              <a
                href="https://app.milanote.com/1VLFym1ub26A5N?p=uYsX1JOqo0h"
                className="inline-flex w-full items-center justify-center rounded-lg border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition hover:border-purple/35 hover:text-purple sm:w-auto"
              >
                View roadmap
              </a>
            </div>
          </div>

          <LuxHeroVisual />
        </section>

        <section id="focus" className="section-band border-y border-line">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <h2 className="text-4xl font-semibold text-ink sm:text-5xl">
                  What and why.
                </h2>
                <p className="mt-5 text-base leading-7 text-muted">
                  LuxEngine exists to make engine architecture visible while it
                  grows into useful technology. The current center of gravity is
                  rendering, editor tooling, project structure, and asset
                  workflows.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {quickFacts.map((fact) => (
                  <MetricChip key={fact.label} {...fact} />
                ))}
              </div>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {focusAreas.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <ArchitectureTablet />
          <div>
            <h2 className="text-4xl font-semibold text-ink sm:text-5xl">
              Built around projects, assets, and scenes.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              LuxEngine&apos;s editor direction is more than a renderer window. The
              project owns the active asset manager, scenes move through the
              asset system, and editor/runtime asset managers define where
              registry data and loaded resources live.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "Project-owned asset access through the active project.",
                "Scenes handled as first-class assets before editing copies.",
                "Separate editor and runtime paths for asset ownership.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-line bg-surface px-4 py-3 shadow-soft"
                >
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-purple" />
                  <span className="text-sm leading-6 text-muted">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="border-y border-line bg-surface">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
            <div>
              <h2 className="text-4xl font-semibold text-ink sm:text-5xl">
                The roadmap is ambitious by design.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted">
                The public plan spans rendering, editor applications, scripting,
                physics, procedural generation, AI, audio, and more platform
                support. The site now frames that as a roadmap, not a claim that
                everything is finished.
              </p>
              <a
                href="https://app.milanote.com/1VLFym1ub26A5N?p=uYsX1JOqo0h"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-engine px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-deep"
              >
                Open Milanote roadmap
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {roadmap.map((item, index) => (
                <article
                  key={item}
                  className="rounded-lg border border-line bg-paper p-5 shadow-soft"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow text-sm font-semibold text-ink">
                    {index + 1}
                  </div>
                  <p className="mt-5 text-sm leading-6 text-muted">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="setup"
          className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10"
        >
          <div>
            <h2 className="text-4xl font-semibold text-ink sm:text-5xl">
              Build it locally on Windows.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              The current README recommends Visual Studio 2022 and a
              Windows-focused workflow. Setup downloads prerequisites, handles
              Vulkan SDK checks, and generates the solution.
            </p>
          </div>
          <div className="grid gap-4">
            {setupSteps.map((step) => (
              <article
                key={step.title}
                className="rounded-lg border border-line bg-surface p-5 shadow-soft"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {step.detail}
                    </p>
                  </div>
                  <span className="rounded-md bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">
                    Windows
                  </span>
                </div>
                <pre className="mt-4 overflow-x-auto rounded-lg border border-line bg-engine px-4 py-3 text-xs text-white">
                  <code>{step.code}</code>
                </pre>
              </article>
            ))}
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-lg bg-purple p-8 text-white shadow-tablet sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-4xl font-semibold">
                Follow LuxEngine while it is still being shaped.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
                The engine is early enough for design decisions to matter and
                public enough for builders to learn from the process.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/starbounded-dev/LuxEngine"
                className="inline-flex items-center justify-center rounded-lg bg-yellow px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white"
              >
                GitHub
              </a>
              <a
                href="mailto:hello@starbounded.com"
                className="inline-flex items-center justify-center rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:border-white"
              >
                Contact
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer
        links={[
          { label: "Overview", href: "#overview" },
          { label: "Focus", href: "#focus" },
          { label: "Roadmap", href: "#roadmap" },
          { label: "Setup", href: "#setup" },
        ]}
        socials={[
          { label: "Email", href: "mailto:hello@starbounded.com" },
          {
            label: "GitHub",
            href: "https://github.com/starbounded-dev/LuxEngine",
          },
          {
            label: "Roadmap",
            href: "https://app.milanote.com/1VLFym1ub26A5N?p=uYsX1JOqo0h",
          },
        ]}
      />
    </div>
  );
}

function LuxHeroVisual() {
  return (
    <div
      className="relative mx-auto min-h-[470px] w-full max-w-[350px] animate-reveal sm:max-w-none lg:min-h-[560px]"
      style={{ animationDelay: "150ms" }}
    >
      <div className="absolute left-8 top-6 z-20 w-48 rounded-lg bg-yellow p-4 text-ink shadow-tablet sm:left-2">
        <div className="text-xs font-semibold uppercase text-ink/70">
          Current path
        </div>
        <div className="mt-5 space-y-3 text-sm font-semibold">
          <div>Visual Studio 2022</div>
          <div>Vulkan SDK</div>
          <div>Premake projects</div>
        </div>
      </div>

      <div className="absolute right-0 top-20 w-[84%] rounded-lg bg-engine p-4 text-white shadow-tablet">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-semibold text-white/60">
            LuxEngine workspace
          </span>
          <span className="rounded-md bg-cyan px-2 py-1 text-xs font-semibold text-ink">
            C++
          </span>
        </div>
        <div className="tablet-grid mt-4 grid min-h-72 gap-4 rounded-md bg-purple-deep p-4 md:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-3">
            {["Core", "Editor", "Sandbox", "ScriptCore"].map((item) => (
              <div
                key={item}
                className="rounded-md bg-white/10 px-3 py-3 text-xs font-semibold text-white/75"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="rounded-md bg-surface p-4 text-ink">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Scene asset</span>
              <span className="rounded-md bg-purple/10 px-2 py-1 text-xs font-semibold text-purple">
                active
              </span>
            </div>
            <div className="mt-5 h-36 rounded-md bg-paper">
              <div className="grid h-full grid-cols-3 gap-3 p-3">
                <div className="rounded-md bg-purple/15" />
                <div className="rounded-md bg-yellow/40" />
                <div className="rounded-md bg-cyan/20" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {["Asset", "Scene", "Editor"].map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-line px-2 py-2 text-center text-xs font-semibold"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-4 z-30 flex h-36 w-36 items-center justify-center rounded-lg bg-purple p-3 shadow-tablet sm:left-16">
        <Image
          src="/luxengine-logo.png"
          alt="LuxEngine logo"
          width={140}
          height={112}
          className="h-full w-full object-contain"
          priority
        />
      </div>
    </div>
  );
}

function ArchitectureTablet() {
  return (
    <div className="rounded-lg border border-line bg-surface p-4 shadow-tablet">
      <div className="rounded-lg bg-engine p-4 text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-semibold text-white/60">
            Asset manager map
          </span>
          <span className="rounded-md bg-yellow px-2 py-1 text-xs font-semibold text-ink">
            editor
          </span>
        </div>
        <div className="mt-5 grid gap-4">
          {[
            ["Project", "owns active AssetManager"],
            ["EditorAssetManager", "registry plus loaded editor resources"],
            ["RuntimeAssetManager", "runtime loading boundary"],
            ["Scene", "asset copied into editable scene state"],
          ].map(([title, detail]) => (
            <div
              key={title}
              className="grid gap-3 rounded-lg bg-white/10 p-4 sm:grid-cols-[0.5fr_1fr]"
            >
              <div className="text-sm font-semibold">{title}</div>
              <div className="text-sm text-white/70">{detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SparkIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M12 3l2.2 4.8L19 10l-4.8 2.2L12 17l-2.2-4.8L5 10l4.8-2.2L12 3Z" />
    </svg>
  );
}

function ViewportIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 5v14" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M4 7l8-4 8 4-8 4-8-4Z" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 17l8 4 8-4" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 0-4-4V4Z" />
      <path d="M5 16V6a2 2 0 0 1 2-2" />
    </svg>
  );
}
