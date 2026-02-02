import type { Metadata } from "next";
import { FeatureCard } from "@/components/FeatureCard";
import { Footer } from "@/components/Footer";
import { MetricChip } from "@/components/MetricChip";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Lux Engine",
  description:
    "Lux Engine is an open-source C++ game engine by Starbounded Studio, focused on Windows-first rendering and approachable architecture.",
  openGraph: {
    title: "Lux Engine | Starbounded Studio",
    description:
      "Lux Engine is an open-source C++ game engine by Starbounded Studio, focused on Windows-first rendering and approachable architecture.",
  },
};

const focusAreas = [
  {
    title: "Render core",
    description: "Modern rendering foundation with Vulkan-first workflows.",
    icon: <SparkIcon />,
  },
  {
    title: "Editor tooling",
    description: "Scene creation, inspector workflows, and asset iteration.",
    icon: <ViewportIcon />,
  },
  {
    title: "Scripting",
    description: "Planned scripting layer for gameplay and interactions.",
    icon: <ScriptIcon />,
  },
  {
    title: "Asset pipeline",
    description: "Import, manage, and iterate on content at scale.",
    icon: <LayersIcon />,
  },
];

const luxRoadmap = [
  {
    title: "Fast 2D rendering",
    description: "UI, particles, sprites, and immediate tooling.",
    icon: <LayersIcon />,
  },
  {
    title: "Physically-based 3D",
    description: "High-fidelity PBR lighting and material systems.",
    icon: <SparkIcon />,
  },
  {
    title: "Cross-platform",
    description: "Windows, Mac, Linux, Android, and iOS targets.",
    icon: <PlatformIcon />,
  },
  {
    title: "Native APIs",
    description: "DirectX, Vulkan, and Metal backends.",
    icon: <KernelIcon />,
  },
  {
    title: "Viewer + editor",
    description: "Full editor and viewer applications.",
    icon: <ViewportIcon />,
  },
  {
    title: "Scripting",
    description: "Fully scripted interaction and behavior.",
    icon: <ScriptIcon />,
  },
  {
    title: "Physics + terrain",
    description: "Physics integration with procedural worlds.",
    icon: <TerrainIcon />,
  },
  {
    title: "AI + audio",
    description: "AI tooling and integrated audio systems.",
    icon: <AudioIcon />,
  },
];

const quickFacts = [
  {
    value: "C++",
    label: "Core language",
    detail: "Runtime, renderer, and editor tooling.",
  },
  {
    value: "GPL-3.0",
    label: "License",
    detail: "Open-source with community contributions.",
  },
  {
    value: "Windows",
    label: "Primary target",
    detail: "Visual Studio 2022 recommended.",
  },
  {
    value: "Vulkan",
    label: "Graphics",
    detail: "SDK required during setup.",
  },
];

const setupSteps = [
  {
    title: "Clone with submodules",
    detail: "Lux Engine uses git submodules for third-party dependencies.",
    code: "git clone --recursive https://github.com/starbounded-dev/LuxEngine",
  },
  {
    title: "Run Setup.bat",
    detail:
      "Scripts download prerequisites and prompt for Vulkan SDK if missing.",
    code: "scripts/Setup.bat",
  },
  {
    title: "Generate projects",
    detail:
      "Win-GenProjects.bat builds the Visual Studio solution for Windows.",
    code: "scripts/Win-GenProjects.bat",
  },
];

const communityLinks = [
  {
    title: "Lux Engine GitHub",
    description: "Source, issues, and project discussions.",
    href: "https://github.com/starbounded-dev/LuxEngine",
  },
  {
    title: "Roadmap board",
    description: "Milestones and feature planning in Milanote.",
    href: "https://app.milanote.com/1VLFym1ub26A5N?p=uYsX1JOqo0h",
  },
  {
    title: "Starbounded Studio",
    description: "Back to the studio overview and other projects.",
    href: "/",
  },
];

export default function LuxPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-ink">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-teal/25 blur-3xl" />
        <div className="absolute right-[-120px] top-24 h-[420px] w-[420px] rounded-full bg-slate/30 blur-3xl" />
        <div className="absolute inset-0 bg-starfield opacity-70" />
        <div className="absolute inset-0 bg-grid-fade opacity-50" />
      </div>

      <div className="relative z-10">
        <Nav
          items={[
            { label: "Overview", href: "#overview" },
            { label: "Focus", href: "#features" },
            { label: "Roadmap", href: "#roadmap" },
            { label: "Get started", href: "#get-started" },
            { label: "Community", href: "#community" },
          ]}
          primaryCta={{
            label: "GitHub",
            href: "https://github.com/starbounded-dev/LuxEngine",
          }}
          secondaryCta={{ label: "Back to Studio", href: "/" }}
        />

        <main>
          <section
            id="overview"
            className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ivory-deep/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate">
                <span className="h-2 w-2 rounded-full bg-teal" />
                Lux Engine
              </div>
              <h1 className="text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl">
                An open-source engine for learning and building.
              </h1>
              <p className="text-lg leading-8 text-slate">
                Lux Engine is Starbounded Studio&apos;s C++ game engine. It is
                Windows-first, built for modern rendering workflows, and
                designed to teach engine architecture through real code.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://github.com/starbounded-dev/LuxEngine"
                  className="inline-flex items-center justify-center rounded-full bg-teal px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-ivory transition hover:bg-teal-bright"
                >
                  View repository
                </a>
                <a
                  href="https://app.milanote.com/1VLFym1ub26A5N?p=uYsX1JOqo0h"
                  className="inline-flex items-center justify-center rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-ink transition hover:border-ink/60 hover:bg-ivory-deep"
                >
                  View roadmap
                </a>
              </div>
              <div className="flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.32em] text-slate/70">
                <span>Open-source</span>
                <span>Vulkan-first</span>
                <span>Editor tooling</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-teal/30 blur-3xl" />
              <div className="absolute -bottom-10 right-0 h-24 w-24 rounded-full bg-slate/30 blur-3xl" />
              <div className="relative rounded-3xl border border-ink/10 bg-ivory-deep/70 p-6 backdrop-blur">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate">
                  <span>Lux Editor</span>
                  <span className="flex items-center gap-2 text-teal">
                    <span className="h-2 w-2 rounded-full bg-teal" />
                    Preview
                  </span>
                </div>
                <div className="mt-6">
                  <LuxEditorPreview />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate">
                  {[
                    { label: "Renderer", value: "Vulkan" },
                    { label: "Editor", value: "In progress" },
                    { label: "Scripting", value: "Planned" },
                    { label: "Pipeline", value: "Active" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-ink/10 bg-ivory-deep/60 px-4 py-3"
                    >
                      <div className="text-xs uppercase tracking-[0.3em] text-slate/60">
                        {item.label}
                      </div>
                      <div className="mt-2 text-lg font-semibold text-ink">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.32em] text-slate">
                Focus areas
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
                What Lux is building right now.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate">
                The current focus is on rendering, tooling, and the engine core
                that powers future gameplay systems.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {focusAreas.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {quickFacts.map((fact) => (
                <MetricChip key={fact.label} {...fact} />
              ))}
            </div>
          </section>

          <section id="roadmap" className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.32em] text-slate">
                Roadmap
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
                Planned systems and features.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate">
                These are the major milestones guiding Lux Engine development.
              </p>
              <a
                href="https://app.milanote.com/1VLFym1ub26A5N?p=uYsX1JOqo0h"
                className="mt-6 inline-flex items-center justify-center rounded-full border border-ink/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ink transition hover:border-ink/60 hover:bg-ivory-deep"
              >
                View Milanote roadmap
              </a>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {luxRoadmap.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </section>

          <section
            id="get-started"
            className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10"
          >
            <div className="space-y-6">
              <div className="text-xs font-semibold uppercase tracking-[0.32em] text-slate">
                Get started
              </div>
              <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
                Build Lux Engine locally.
              </h2>
              <p className="text-base leading-7 text-slate">
                Lux Engine currently targets Windows. Visual Studio 2022 is
                recommended for development. Follow the setup steps below or
                read the repository README for the full instructions.
              </p>
              <a
                href="https://github.com/starbounded-dev/LuxEngine"
                className="inline-flex items-center justify-center rounded-full border border-ink/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ink transition hover:border-ink/60 hover:bg-ivory-deep"
              >
                Read the README
              </a>
            </div>
            <div className="space-y-4">
              {setupSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-ink/10 bg-ivory-deep/70 p-5 shadow-[0_24px_60px_-50px_rgba(6,10,18,0.7)]"
                >
                  <div className="text-sm font-semibold text-ink">
                    {step.title}
                  </div>
                  <p className="mt-2 text-sm text-slate">{step.detail}</p>
                  <pre className="mt-4 overflow-x-auto rounded-xl border border-ink/10 bg-ivory/80 px-4 py-3 text-xs text-ink">
                    <code>{step.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>

          <section id="community" className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.32em] text-slate">
                Community
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
                Follow along and contribute.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate">
                Lux Engine is open for feedback, discussion, and contributions.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {communityLinks.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="group rounded-2xl border border-ink/10 bg-ivory-deep/70 p-6 shadow-[0_24px_60px_-50px_rgba(6,10,18,0.7)] transition hover:-translate-y-1 hover:border-ink/30"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.32em] text-slate">
                    Resource
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate">
                    {item.description}
                  </p>
                  <div className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-ink/60 transition group-hover:text-ink">
                    Visit
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section id="cta" className="mx-auto max-w-6xl px-6 pb-24 lg:px-10">
            <div className="relative overflow-hidden rounded-3xl bg-ivory-deep px-8 py-12 text-ink shadow-[0_50px_90px_-70px_rgba(6,10,18,0.9)] sm:px-12">
              <div className="absolute inset-0">
                <div className="absolute -top-24 left-10 h-48 w-48 rounded-full bg-teal/20 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-slate/30 blur-3xl" />
                <div className="absolute inset-0 bg-starfield opacity-20" />
              </div>
              <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold sm:text-4xl">
                    Contribute to Lux Engine.
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate">
                    Starbounded Studio welcomes contributors, testers, and
                    collaborators. Follow the repository for updates.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://github.com/starbounded-dev/LuxEngine"
                    className="inline-flex items-center justify-center rounded-full bg-teal px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-ivory transition hover:bg-teal-bright"
                  >
                    Contribute on GitHub
                  </a>
                  <a
                    href="mailto:hello@starbounded.com"
                    className="inline-flex items-center justify-center rounded-full border border-ink/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-ink transition hover:border-ink/60"
                  >
                    Email the studio
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer
          links={[
            { label: "Overview", href: "#overview" },
            { label: "Focus", href: "#features" },
            { label: "Roadmap", href: "#roadmap" },
            { label: "Get started", href: "#get-started" },
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
    </div>
  );
}

function LuxEditorPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/15 bg-ivory/80">
      <div className="flex items-center justify-between border-b border-ink/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-slate">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-ink/70" />
          <span className="h-2 w-2 rounded-full bg-ink/40" />
          <span className="h-2 w-2 rounded-full bg-ink/20" />
        </div>
        <span>Lux Editor</span>
        <span className="text-teal">Viewport</span>
      </div>
      <div className="relative h-56">
        <div className="absolute inset-0 bg-grid-fade opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-br from-teal/20 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 h-20 w-28 rounded-lg border border-ink/10 bg-ivory-deep/70" />
        <div className="absolute right-4 top-6 h-12 w-36 rounded-lg border border-ink/10 bg-ivory-deep/70" />
        <div className="absolute bottom-4 left-8 h-16 w-40 rounded-lg border border-ink/10 bg-ivory-deep/70" />
        <div className="absolute bottom-4 right-6 h-20 w-28 rounded-lg border border-ink/10 bg-ivory-deep/70" />
        <div className="relative flex h-full items-center justify-center text-[10px] font-semibold uppercase tracking-[0.32em] text-slate/80">
          Editor preview (coming soon)
        </div>
      </div>
    </div>
  );
}

function LayersIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M4 7l8-4 8 4-8 4-8-4Z" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 17l8 4 8-4" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M12 3l2.2 4.8L19 10l-4.8 2.2L12 17l-2.2-4.8L5 10l4.8-2.2L12 3Z" />
    </svg>
  );
}

function PlatformIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
    </svg>
  );
}

function KernelIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.9 4.9l2.8 2.8" />
      <path d="M16.3 16.3l2.8 2.8" />
      <path d="M19.1 4.9l-2.8 2.8" />
      <path d="M7.7 16.3l-2.8 2.8" />
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
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 5v14" />
    </svg>
  );
}

function ScriptIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M8 7H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
      <path d="M16 7h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
      <path d="M10 12h4" />
    </svg>
  );
}

function TerrainIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M3 18l5-6 4 4 5-7 4 9" />
      <path d="M3 18h18" />
    </svg>
  );
}

function AudioIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M5 9v6" />
      <path d="M9 7v10" />
      <path d="M13 5v14" />
      <path d="M17 7v10" />
      <path d="M21 9v6" />
    </svg>
  );
}
