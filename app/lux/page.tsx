import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Arrow } from "@/components/Icons";
import { ScenePreview } from "@/components/ScenePreview";
import { Roadmap } from "@/components/Roadmap";
import { SetupGuide } from "@/components/SetupGuide";

export const metadata: Metadata = {
  title: "LuxEngine",
  description:
    "Inside LuxEngine: Starbounded’s open-source C++ engine, editor, rendering experiments, and the work ahead.",
};

export default function LuxPage() {
  return (
    <>
      <Nav engine />
      <main id="main-content" className="engine-page">
        <section className="engine-intro wrap" id="overview">
          <Link href="/" className="breadcrumb">
            ← Starbounded Studio
          </Link>
          <div className="engine-title-row">
            <div className="engine-title">
              <Image
                src="/luxengine-logo.png"
                alt="LuxEngine logo"
                width={112}
                height={112}
                priority
              />
              <div>
                <span className="label">A STARBOUNDED PROJECT</span>
                <h1>LuxEngine</h1>
              </div>
            </div>
            <span className="work-status">
              <i className="status-dot" /> In development
            </span>
          </div>
          <div className="engine-intro-bottom">
            <p>
              An engine we can build with.
              <br />
              <span>And understand along the way.</span>
            </p>
            <div>
              <p>
                Our C++ engine for Windows, with a working renderer, editor, and
                material tools. It’s early, the source is open, and there’s a
                lot we want to do.
              </p>
              <div className="button-row">
                <a href="#setup" className="button button-primary">
                  Get the source <Arrow />
                </a>
                <a
                  href="https://github.com/starbounded-dev/LuxEngine"
                  className="text-link"
                >
                  GitHub <Arrow diagonal />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="wrap engine-showcase" id="screenshots">
          <ScenePreview />
        </section>
        <section className="wrap section engine-detail-section" id="focus">
          <div>
            <span className="label">INSIDE THE PROJECT</span>
            <h2>
              A renderer.
              <br />
              An editor.
              <br />A lot of questions.
            </h2>
          </div>
          <div className="engine-detail-copy">
            <p className="lead">
              The best way to understand an engine is to build one.
            </p>
            <p>
              The editor brings a scene hierarchy, content browser, material
              editing, and rendering settings together. We’re refining those
              tools one piece at a time, keeping the code understandable as the
              engine grows.
            </p>
            <p>
              There are rough edges, and some ideas are still just plans. The
              repository is the best place to see what works today and what
              needs attention.
            </p>
            <a
              href="https://github.com/starbounded-dev/LuxEngine#readme"
              className="text-link"
            >
              Read the project notes <Arrow diagonal />
            </a>
          </div>
        </section>
        <section className="forward-section wrap section" id="roadmap">
          <div className="forward-intro">
            <span className="label">THE WORK DOESN’T STOP HERE</span>
            <h2>Forward.</h2>
            <p>
              Building on what works, making the tools easier to use, and
              leaving room to explore.
            </p>
            <a
              href="https://app.milanote.com/1VLFym1ub26A5N?p=uYsX1JOqo0h"
              className="text-link"
            >
              Open the roadmap <Arrow diagonal />
            </a>
          </div>
          <Roadmap />
        </section>
        <section className="setup-band" id="setup">
          <div className="setup-section wrap section">
            <div>
              <span className="label">MAKE A START</span>
              <h2>
                Pull the code.
                <br />
                Try a change.
              </h2>
              <p>
                There’s no packaged installer yet. Start with the repository and
                follow the Windows setup workflow.
              </p>
              <div className="requirements">
                <span>Windows</span>
                <span>Visual Studio 2022</span>
                <span>Vulkan SDK</span>
              </div>
              <a
                className="text-link"
                href="https://github.com/starbounded-dev/LuxEngine#readme"
              >
                Full setup instructions <Arrow diagonal />
              </a>
            </div>
            <SetupGuide />
          </div>
        </section>
        <section className="contact-strip wrap">
          <div>
            <span className="label">
              A QUESTION COUNTS AS A CONTRIBUTION, TOO
            </span>
            <h2>Take a look. Join in.</h2>
          </div>
          <a
            href="https://github.com/starbounded-dev/LuxEngine"
            className="button button-outline"
          >
            Explore the repository <Arrow diagonal />
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
