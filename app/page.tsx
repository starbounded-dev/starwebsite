import { FeatureCard } from "@/components/FeatureCard";
import { Footer } from "@/components/Footer";
import { MetricChip } from "@/components/MetricChip";
import { Nav } from "@/components/Nav";

const studioMetrics = [
  {
    value: "Jan 8, 2023",
    label: "First commit",
    detail: "Starbounded projects began shipping on GitHub.",
  },
  {
    value: "Canada",
    label: "Base",
    detail: "Starbounded Studio is based in Canada.",
  },
  {
    value: "Open-source",
    label: "Operating model",
    detail: "Public repositories and community contributions.",
  },
  {
    value: "Lux Engine",
    label: "Flagship",
    detail: "A C++ game engine in early development.",
  },
];

const luxRoadmap = [
  {
    title: "Fast 2D rendering",
    description: "Roadmap: UI, particles, sprites, and immediate tooling.",
    icon: <LayersIcon />,
  },
  {
    title: "Physically-based 3D",
    description: "Roadmap: high-fidelity PBR lighting and material systems.",
    icon: <SparkIcon />,
  },
  {
    title: "Cross-platform",
    description: "Roadmap: Windows, Mac, Linux, Android, and iOS targets.",
    icon: <PlatformIcon />,
  },
  {
    title: "Native APIs",
    description: "Roadmap: DirectX, Vulkan, and Metal backends.",
    icon: <KernelIcon />,
  },
  {
    title: "Viewer + editor",
    description: "Roadmap: full editor and viewer applications.",
    icon: <ViewportIcon />,
  },
  {
    title: "Scripting",
    description: "Roadmap: fully scripted interaction and behavior.",
    icon: <ScriptIcon />,
  },
  {
    title: "Physics + terrain",
    description: "Roadmap: physics integration with procedural worlds.",
    icon: <TerrainIcon />,
  },
  {
    title: "AI + audio",
    description: "Roadmap: AI tooling and integrated audio systems.",
    icon: <AudioIcon />,
  },
];

const projects = [
  {
    tag: "Engine",
    title: "Lux Engine",
    description: "Open-source game engine written in C++.",
    link: "https://github.com/starbounded-dev/LuxEngine",
  },
  {
    tag: "Launcher",
    title: "Starbounded Launcher",
    description: "Custom launcher for modded Minecraft built with Electron.",
    link: "https://github.com/starbounded-dev/starbounded-launcher",
  },
  {
    tag: "Rendering",
    title: "nvrhi fork",
    description: "Renderer abstraction forked for engine experimentation.",
    link: "https://github.com/starbounded-dev/nvrhi",
  },
  {
    tag: "UI",
    title: "Dear ImGui fork",
    description: "Immediate-mode UI tooling for editor workflows.",
    link: "https://github.com/starbounded-dev/imgui",
  },
  {
    tag: "Windowing",
    title: "GLFW fork",
    description: "Cross-platform windowing and input foundation.",
    link: "https://github.com/starbounded-dev/glfw",
  },
  {
    tag: "Audio",
    title: "SoLoud fork",
    description: "Portable audio engine for game runtime audio.",
    link: "https://github.com/starbounded-dev/soloud",
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

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden text-ink">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-teal/25 blur-3xl" />
        <div className="absolute right-[-120px] top-24 h-[420px] w-[420px] rounded-full bg-slate/30 blur-3xl" />
        <div className="absolute inset-0 bg-starfield opacity-70" />
        <div className="absolute inset-0 bg-grid-fade opacity-50" />
      </div>

      <div className="relative z-10">
        <Nav />

        <main>
          <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
            <div className="space-y-6">
              <div
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ivory-deep/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate animate-reveal"
                style={{ animationDelay: "40ms" }}
              >
                <span className="h-2 w-2 rounded-full bg-teal" />
                Starbounded Studio
              </div>
              <h1
                className="text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl animate-reveal"
                style={{ animationDelay: "110ms" }}
              >
                We build software for interactive worlds.
              </h1>
              <p
                className="text-lg leading-8 text-slate animate-reveal"
                style={{ animationDelay: "180ms" }}
              >
                Starbounded Studio is an open-source software company building
                tools for game creation and real-time rendering. Our flagship
                project is Lux Engine, a C++ game engine focused on Windows-first
                development and an approachable architecture for learning.
              </p>
              <div
                className="flex flex-col gap-3 sm:flex-row animate-reveal"
                style={{ animationDelay: "250ms" }}
              >
                <a
                  href="https://starbounded.com/lux"
                  className="inline-flex items-center justify-center rounded-full bg-teal px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-ivory transition hover:bg-teal-bright"
                >
                  Explore Lux Engine
                </a>
                <a
                  href="https://github.com/starbounded-dev"
                  className="inline-flex items-center justify-center rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-ink transition hover:border-ink/60 hover:bg-ivory-deep"
                >
                  Visit GitHub
                </a>
              </div>
              <div
                className="flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.32em] text-slate/70 animate-reveal"
                style={{ animationDelay: "320ms" }}
              >
                <span>Open-source</span>
                <span>C++ core</span>
                <span>Windows-first</span>
              </div>
            </div>

            <div
              className="relative animate-reveal"
              style={{ animationDelay: "230ms" }}
            >
              <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-teal/30 blur-3xl" />
              <div className="absolute -bottom-10 right-0 h-24 w-24 rounded-full bg-slate/30 blur-3xl" />
              <div className="relative rounded-3xl border border-ink/10 bg-ivory-deep/70 p-6 backdrop-blur">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate">
                  <span>Editor preview</span>
                  <span className="flex items-center gap-2 text-teal">
                    <span className="h-2 w-2 rounded-full bg-teal" />
                    Coming soon
                  </span>
                </div>
                <div className="mt-6 rounded-2xl border border-ink/10 bg-ivory/60 p-4">
                  <EditorPreview />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate">
                  <div className="rounded-xl border border-ink/10 bg-ivory-deep/60 px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.3em] text-slate/60">
                      License
                    </div>
                    <div className="mt-2 text-lg font-semibold text-ink">
                      GPL-3.0
                    </div>
                  </div>
                  <div className="rounded-xl border border-ink/10 bg-ivory-deep/60 px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.3em] text-slate/60">
                      Core language
                    </div>
                    <div className="mt-2 text-lg font-semibold text-ink">C++</div>
                  </div>
                  <div className="rounded-xl border border-ink/10 bg-ivory-deep/60 px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.3em] text-slate/60">
                      Primary target
                    </div>
                    <div className="mt-2 text-lg font-semibold text-ink">
                      Windows
                    </div>
                  </div>
                  <div className="rounded-xl border border-ink/10 bg-ivory-deep/60 px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.3em] text-slate/60">
                      Focus
                    </div>
                    <div className="mt-2 text-lg font-semibold text-ink">
                      Rendering
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="studio"
            className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10"
          >
            <div className="space-y-6">
              <div className="text-xs font-semibold uppercase tracking-[0.32em] text-slate">
                Studio
              </div>
              <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
                Starbounded Studio is a home for experimental software.
              </h2>
              <p className="text-base leading-7 text-slate">
                We have been building multiple projects simultaneously since our
                first commit on January 8, 2023. Starbounded Studio is based in
                Canada and maintains open-source projects across engines,
                tooling, and platform support.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate">
                <span className="rounded-full border border-ink/10 bg-ivory-deep/70 px-4 py-2">
                  Game engines
                </span>
                <span className="rounded-full border border-ink/10 bg-ivory-deep/70 px-4 py-2">
                  Rendering tools
                </span>
                <span className="rounded-full border border-ink/10 bg-ivory-deep/70 px-4 py-2">
                  Open-source
                </span>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {studioMetrics.map((metric) => (
                <MetricChip key={metric.label} {...metric} />
              ))}
            </div>
          </section>

          <section
            id="lux"
            className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-10"
          >
            <div className="space-y-6">
              <div className="text-xs font-semibold uppercase tracking-[0.32em] text-slate">
                Lux Engine
              </div>
              <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
                A C++ game engine built to teach and evolve.
              </h2>
              <p className="text-base leading-7 text-slate">
                Lux Engine is an early-stage interactive application and
                rendering engine for Windows. The goal is two-fold: build a
                powerful 3D engine and make the architecture approachable for
                learning modern engine design.
              </p>
              <ul className="space-y-4 text-sm text-slate">
                {[
                  "Windows-first development with Visual Studio 2022.",
                  "Vulkan SDK required for rendering workflows.",
                  "Builds generated via Setup.bat and Win-GenProjects.bat.",
                  "GPL-3.0 licensed, open for community contributions.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate">
                <a
                  href="https://github.com/starbounded-dev/LuxEngine"
                  className="rounded-full border border-ink/10 bg-ivory-deep/70 px-4 py-2 transition hover:border-ink/50"
                >
                  Repository
                </a>
                <a
                  href="https://starbounded.com/lux"
                  className="rounded-full border border-ink/10 bg-ivory-deep/70 px-4 py-2 transition hover:border-ink/50"
                >
                  Lux landing
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-teal/30 blur-3xl" />
              <div className="relative rounded-3xl border border-ink/10 bg-ivory-deep/70 p-6 backdrop-blur">
                <LuxStack />
              </div>
            </div>
          </section>

          <section id="roadmap" className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.32em] text-slate">
                Lux Engine roadmap
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
                Planned systems and features.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate">
                These are the key capabilities outlined for Lux Engine as the
                engine matures.
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

          <section id="projects" className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.32em] text-slate">
                Projects
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
                Starbounded repositories.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate">
                From the Lux Engine core to supporting forks, each repo helps
                shape the studio stack.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  className="group rounded-2xl border border-ink/10 bg-ivory-deep/70 p-6 shadow-[0_24px_60px_-50px_rgba(6,10,18,0.7)] transition hover:-translate-y-1 hover:border-ink/30"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.32em] text-slate">
                    {item.tag}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate">
                    {item.description}
                  </p>
                  <div className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-ink/60 transition group-hover:text-ink">
                    View repository
                  </div>
                </a>
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
                read the Lux Engine README for the full instructions.
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

          <section id="cta" className="mx-auto max-w-6xl px-6 pb-24 lg:px-10">
            <div className="relative overflow-hidden rounded-3xl bg-ivory-deep px-8 py-12 text-ink shadow-[0_50px_90px_-70px_rgba(6,10,18,0.9)] sm:px-12">
              <div className="absolute inset-0">
                <div className="absolute -top-24 left-10 h-48 w-48 rounded-full bg-teal/30 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-slate/30 blur-3xl" />
                <div className="absolute inset-0 bg-starfield opacity-30" />
              </div>
              <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold sm:text-4xl">
                    Build with us.
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate">
                    Follow the progress of Lux Engine and the wider Starbounded
                    toolchain. Contributions, feedback, and collaborations are
                    welcome.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://github.com/starbounded-dev"
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

        <Footer />
      </div>
    </div>
  );
}

function EditorPreview() {
  return (
    <div className="overflow-hidden rounded-xl border border-ink/15 bg-ivory/80">
      <div className="flex items-center justify-between border-b border-ink/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-slate">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-ink/70" />
          <span className="h-2 w-2 rounded-full bg-ink/40" />
          <span className="h-2 w-2 rounded-full bg-ink/20" />
        </div>
        <span>Lux Editor</span>
      </div>
      <div className="relative h-40">
        <div className="absolute inset-0 bg-grid-fade opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-teal/20 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 h-16 w-24 rounded-lg border border-ink/10 bg-ivory-deep/70" />
        <div className="absolute right-5 top-8 h-10 w-32 rounded-lg border border-ink/10 bg-ivory-deep/70" />
        <div className="absolute bottom-4 left-10 h-12 w-36 rounded-lg border border-ink/10 bg-ivory-deep/70" />
        <div className="absolute bottom-4 right-4 h-16 w-24 rounded-lg border border-ink/10 bg-ivory-deep/70" />
        <div className="relative flex h-full items-center justify-center text-[10px] font-semibold uppercase tracking-[0.32em] text-slate/80">
          Editor preview (coming soon)
        </div>
      </div>
    </div>
  );
}

function LuxStack() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate">
        <span>Engine stack</span>
        <span className="text-teal">Windows build</span>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-ivory-deep/70 p-6">
        <div className="absolute inset-0 bg-starfield opacity-50" />
        <div className="relative grid gap-4">
          {[
            "Render core",
            "Editor tooling",
            "Scripting layer",
            "Asset pipeline",
          ].map((item, index) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-xl border border-ink/10 bg-ivory-deep/60 px-4 py-3"
            >
              <div className="text-sm font-semibold text-ink">{item}</div>
              <div className="text-xs uppercase tracking-[0.3em] text-slate">
                Layer {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm text-slate">
        <div className="rounded-xl border border-ink/10 bg-ivory-deep/60 px-4 py-3">
          <div className="text-xs uppercase tracking-[0.3em] text-slate/60">
            Build system
          </div>
          <div className="mt-2 text-lg font-semibold text-ink">Premake</div>
        </div>
        <div className="rounded-xl border border-ink/10 bg-ivory-deep/60 px-4 py-3">
          <div className="text-xs uppercase tracking-[0.3em] text-slate/60">
            Target
          </div>
          <div className="mt-2 text-lg font-semibold text-ink">Windows</div>
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
