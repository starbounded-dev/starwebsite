import Image from "next/image";
import type { CSSProperties } from "react";
import { FeatureCard } from "@/components/FeatureCard";
import { Footer } from "@/components/Footer";
import { MetricChip } from "@/components/MetricChip";
import { Nav } from "@/components/Nav";

const studioMetrics = [
  {
    value: "2023",
    label: "First commit",
    detail: "Starbounded projects started shipping publicly on GitHub.",
    accent: "yellow",
  },
  {
    value: "Canada",
    label: "Base",
    detail: "A small independent studio building in the open.",
    accent: "purple",
  },
  {
    value: "Open source",
    label: "Model",
    detail: "Public repositories, visible progress, and room to contribute.",
    accent: "cyan",
  },
] as const;

const lifecycle = [
  {
    title: "Create",
    description:
      "Build engine systems, editor panels, asset workflows, and tools from a practical C++ foundation.",
    accent: "bg-purple",
  },
  {
    title: "Iterate",
    description:
      "Keep the work visible through public repositories, small improvements, and honest roadmap updates.",
    accent: "bg-yellow",
  },
  {
    title: "Ship",
    description:
      "Grow LuxEngine into a platform for games, tools, education, and future Starbounded products.",
    accent: "bg-cyan",
  },
] as const;

const luxHighlights = [
  {
    title: "Renderer foundation",
    description:
      "LuxEngine is currently focused on the rendering core that will support 2D, 3D, tools, and future runtime systems.",
    icon: <SparkIcon />,
    accent: "purple",
  },
  {
    title: "Editor-first thinking",
    description:
      "The engine is being shaped around scenes, assets, project workflows, and practical editor iteration.",
    icon: <ViewportIcon />,
    accent: "yellow",
  },
  {
    title: "Learning by building",
    description:
      "The codebase is intentionally educational: a real engine used to learn architecture, not a black-box framework.",
    icon: <LayersIcon />,
    accent: "coral",
  },
  {
    title: "Windows-first setup",
    description:
      "Visual Studio 2022, Premake, submodules, and Vulkan SDK setup are the current development path.",
    icon: <PlatformIcon />,
    accent: "cyan",
  },
] as const;

const projects = [
  {
    tag: "Engine",
    title: "LuxEngine",
    description:
      "An early-stage C++ interactive application and rendering engine for Windows.",
    link: "https://github.com/starbounded-dev/LuxEngine",
    accent: "bg-purple text-white",
  },
  {
    tag: "Launcher",
    title: "Starbounded Launcher",
    description: "A custom Electron launcher for modded Minecraft projects.",
    link: "https://github.com/starbounded-dev/starbounded-launcher",
    accent: "bg-yellow text-ink",
  },
  {
    tag: "Rendering",
    title: "nvrhi fork",
    description: "Renderer abstraction experiments that help inform LuxEngine.",
    link: "https://github.com/starbounded-dev/nvrhi",
    accent: "bg-cyan text-white",
  },
  {
    tag: "UI",
    title: "Dear ImGui fork",
    description: "Immediate-mode UI foundations for editor and tooling work.",
    link: "https://github.com/starbounded-dev/imgui",
    accent: "bg-coral text-white",
  },
] as const;

const setupSteps = [
  {
    title: "Clone the source",
    detail: "Fetch the repository and all third-party submodules.",
    code: "git clone --recursive https://github.com/starbounded-dev/LuxEngine",
  },
  {
    title: "Run setup",
    detail: "Install prerequisites and let the script check for Vulkan SDK.",
    code: "scripts/Setup.bat",
  },
  {
    title: "Generate projects",
    detail: "Create the Visual Studio solution for the current Windows build.",
    code: "scripts/Win-GenProjects.bat",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden text-ink">
      <Nav />

      <main>
        <section className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
          <div className="max-w-2xl">
            <h1
              className="max-w-[11ch] text-4xl font-semibold leading-[1.05] text-ink sm:max-w-none sm:text-6xl lg:text-7xl animate-reveal"
              style={{ animationDelay: "50ms" }}
            >
              Software for interactive worlds.
            </h1>
            <p
              className="mt-6 max-w-[350px] text-base leading-7 text-muted sm:max-w-xl sm:text-lg sm:leading-8 animate-reveal"
              style={{ animationDelay: "130ms" }}
            >
              Starbounded Studio builds open-source tools for game creation,
              real-time rendering, and experimental software. LuxEngine is the
              flagship: an early-stage C++ engine growing in public.
            </p>
            <div
              className="mt-8 flex max-w-[350px] flex-col gap-3 sm:max-w-none sm:flex-row animate-reveal"
              style={{ animationDelay: "210ms" }}
            >
              <a
                href="/lux"
                className="inline-flex w-full items-center justify-center rounded-lg bg-purple px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-purple-deep sm:w-auto"
              >
                Explore LuxEngine
              </a>
              <a
                href="https://github.com/starbounded-dev"
                className="inline-flex w-full items-center justify-center rounded-lg border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition hover:border-purple/35 hover:text-purple sm:w-auto"
              >
                Visit GitHub
              </a>
            </div>
            <div
              className="mt-10 grid max-w-[350px] grid-cols-1 gap-3 sm:max-w-xl sm:grid-cols-3 animate-reveal"
              style={{ animationDelay: "290ms" }}
            >
              {["Open source", "C++ core", "Windows first"].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-line bg-surface/80 px-3 py-3 text-center text-xs font-semibold text-muted shadow-soft"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <HeroTablets />
        </section>

        <section id="studio" className="section-band border-y border-line">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
            <div>
              <h2 className="text-4xl font-semibold text-ink sm:text-5xl">
                A studio for engines, tools, and the next projects.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
                Starbounded is the company home for LuxEngine and the software
                that will surround it: launchers, renderer experiments, editor
                tooling, and future products built with the same open process.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {studioMetrics.map((metric) => (
                <MetricChip key={metric.label} {...metric} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-engine text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:px-10">
            <div>
              <h2 className="text-4xl font-semibold sm:text-5xl">
                Create. Iterate. Ship.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
                Starbounded follows the engine-builder path: build the core,
                keep the tools usable, and turn each system into something
                creators can eventually depend on.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {lifecycle.map((item) => (
                <article
                  key={item.title}
                  className="rounded-lg border border-white/20 bg-white/10 p-5"
                >
                  <div className={`h-2 w-14 rounded-full ${item.accent}`} />
                  <h3 className="mt-6 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="lux"
          className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10"
        >
          <LuxShowcase />
          <div>
            <h2 className="text-4xl font-semibold text-ink sm:text-5xl">
              LuxEngine is the first pillar.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              LuxEngine is primarily an early-stage interactive application and
              rendering engine for Windows. The long-term plan is a powerful 3D
              engine that also teaches modern engine design through real,
              readable systems.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {luxHighlights.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/lux"
                className="inline-flex items-center justify-center rounded-lg bg-engine px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-deep"
              >
                Open the LuxEngine page
              </a>
              <a
                href="https://github.com/starbounded-dev/LuxEngine"
                className="inline-flex items-center justify-center rounded-lg border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition hover:border-purple/35 hover:text-purple"
              >
                View repository
              </a>
            </div>
          </div>
        </section>

        <section id="projects" className="border-y border-line bg-surface">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-4xl font-semibold text-ink sm:text-5xl">
                  Projects in the Starbounded orbit.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                  The public repositories show the stack taking shape: engine
                  source, editor UI foundations, renderer experiments, and
                  launcher work.
                </p>
              </div>
              <a
                href="https://github.com/starbounded-dev"
                className="inline-flex w-fit items-center justify-center rounded-lg border border-line px-5 py-3 text-sm font-semibold text-ink transition hover:border-purple/35 hover:text-purple"
              >
                All repositories
              </a>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {projects.map((project) => (
                <a
                  key={project.title}
                  href={project.link}
                  className="group rounded-lg border border-line bg-paper p-5 shadow-soft transition hover:-translate-y-1 hover:border-purple/30"
                >
                  <div
                    className={`inline-flex rounded-md px-3 py-1 text-xs font-semibold ${project.accent}`}
                  >
                    {project.tag}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {project.description}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-purple">
                    View repository <ArrowIcon />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          id="get-started"
          className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10"
        >
          <div>
            <h2 className="text-4xl font-semibold text-ink sm:text-5xl">
              Start with LuxEngine.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              The current development path is Windows-first. Clone with
              submodules, run the setup script, install Vulkan SDK if prompted,
              and generate the Visual Studio project files.
            </p>
            <a
              href="https://github.com/starbounded-dev/LuxEngine"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-purple px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-purple-deep"
            >
              Read the README
            </a>
          </div>
          <div className="grid gap-4">
            {setupSteps.map((step, index) => (
              <article
                key={step.title}
                className="grid gap-4 rounded-lg border border-line bg-surface p-5 shadow-soft sm:grid-cols-[72px_1fr]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow text-lg font-semibold text-ink">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {step.detail}
                  </p>
                  <pre className="mt-4 overflow-x-auto rounded-lg border border-line bg-engine px-4 py-3 text-xs text-white">
                    <code>{step.code}</code>
                  </pre>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-engine text-white shadow-tablet">
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-4xl font-semibold">
                  Follow the build in public.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                  Starbounded is still early, which makes this the best time to
                  watch the engine, tools, and company identity take shape.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://github.com/starbounded-dev"
                  className="inline-flex items-center justify-center rounded-lg bg-yellow px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white"
                >
                  GitHub
                </a>
                <a
                  href="mailto:hello@starbounded.com"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white"
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
  );
}

function HeroTablets() {
  return (
    <div
      className="relative mx-auto min-h-[460px] w-full max-w-[350px] animate-reveal sm:max-w-none lg:min-h-[560px]"
      style={{ animationDelay: "180ms" }}
    >
      <div className="absolute left-8 top-6 z-20 w-52 rounded-lg border border-line bg-yellow p-4 shadow-tablet sm:left-0 sm:w-60">
        <div className="text-xs font-semibold uppercase text-ink/70">
          Asset flow
        </div>
        <div className="mt-5 space-y-3">
          {["Project", "Scene", "Material"].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-engine" />
              <span className="text-sm font-semibold text-ink">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute right-0 top-20 w-[86%] rounded-lg bg-engine p-3 text-white shadow-tablet animate-hover-panel"
        style={{ "--panel-rotate": "1.5deg" } as CSSProperties}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-coral" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow" />
            <span className="h-2.5 w-2.5 rounded-full bg-green" />
          </div>
          <span className="text-xs font-semibold text-white/55">
            LuxEditor
          </span>
        </div>
        <div className="tablet-grid mt-3 grid min-h-72 grid-cols-[0.65fr_1fr_0.78fr] gap-3 rounded-md bg-purple-deep p-3">
          <div className="space-y-2">
            {["Scene", "Camera", "Light", "Mesh"].map((item) => (
              <div
                key={item}
                className="rounded-md bg-white/10 px-3 py-2 text-xs font-semibold text-white/75"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-md bg-[#17172a]">
            <div className="absolute inset-x-8 bottom-8 h-24 rounded-t-full bg-cyan/80" />
            <div className="absolute left-1/2 top-12 h-28 w-28 -translate-x-1/2 rounded-lg border border-white/30 bg-white/10 rotate-12" />
            <div className="absolute bottom-5 left-5 right-5 h-2 rounded-full bg-yellow" />
          </div>
          <div className="space-y-2">
            {["Transform", "Material", "Renderer"].map((item) => (
              <div key={item} className="rounded-md bg-white p-3 text-ink">
                <div className="text-[11px] font-semibold">{item}</div>
                <div className="mt-2 h-1.5 rounded-full bg-purple/20" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-20 w-64 rounded-lg border border-line bg-surface p-4 shadow-tablet sm:bottom-10 sm:left-12">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase text-muted">
            Engine notes
          </span>
          <span className="rounded-md bg-cyan/10 px-2 py-1 text-xs font-semibold text-cyan">
            C++
          </span>
        </div>
        <pre className="mt-4 overflow-hidden text-xs leading-5 text-muted">
          <code>{`Project::GetActive()
  -> GetAssetManager()
  -> GetAsset<Scene>()`}</code>
        </pre>
      </div>

      <div className="absolute bottom-0 right-6 z-30 flex h-36 w-36 items-center justify-center rounded-lg bg-purple p-3 shadow-tablet sm:right-16">
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

function LuxShowcase() {
  return (
    <div className="relative">
      <div className="rounded-lg border border-line bg-surface p-4 shadow-tablet">
        <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="rounded-lg bg-purple p-5 text-white">
            <Image
              src="/luxengine-logo.png"
              alt="LuxEngine logo"
              width={260}
              height={210}
              className="mx-auto h-40 w-full object-contain"
            />
            <div className="mt-5 text-2xl font-semibold">LuxEngine</div>
            <p className="mt-2 text-sm leading-6 text-white/75">
              Early-stage interactive application and rendering engine.
            </p>
          </div>
          <div className="paper-grid rounded-lg border border-line bg-paper p-5">
            <div className="grid gap-3">
              {[
                ["Core", "C++ runtime and renderer"],
                ["Editor", "Scenes, panels, assets"],
                ["Pipeline", "Materials and project data"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-lg bg-surface px-4 py-3 shadow-soft"
                >
                  <span className="text-sm font-semibold text-ink">{label}</span>
                  <span className="text-sm text-muted">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {["Vulkan", "Premake", "VS 2022"].map((item) => (
                <div
                  key={item}
                  className="rounded-lg bg-yellow/30 px-3 py-3 text-center text-xs font-semibold text-ink"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4 transition group-hover:translate-x-1"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
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

function PlatformIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
    </svg>
  );
}
