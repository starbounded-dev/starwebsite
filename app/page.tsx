import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Arrow } from "@/components/Icons";
import { ScenePreview } from "@/components/ScenePreview";
import { Roadmap } from "@/components/Roadmap";
import { SetupGuide } from "@/components/SetupGuide";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="home-intro wrap" aria-labelledby="home-title">
          <div className="intro-annotation">
            <span className="label">INDEPENDENT STUDIO / CANADA</span>
            <span className="work-status">
              <i className="status-dot" /> Building in the open
            </span>
          </div>
          <div className="home-headline">
            <h1 id="home-title">
              Small studio.
              <br />
              <span>Big workbench.</span>
            </h1>
            <div className="home-introduction">
              <p>
                We’re Starbounded. We’re making LuxEngine, a C++ game engine,
                and sharing the work as we go.
              </p>
              <div className="button-row">
                <Link href="/lux" className="button button-primary">
                  Meet LuxEngine <Arrow />
                </Link>
                <a
                  href="https://github.com/starbounded-dev"
                  className="text-link"
                >
                  Browse the source <Arrow diagonal />
                </a>
              </div>
            </div>
          </div>
          <div className="workbench-stage">
            <div className="stage-sidebar">
              <span className="label">CURRENTLY BUILDING</span>
              <Image
                src="/luxengine-logo.png"
                alt="LuxEngine logo"
                width={96}
                height={96}
                className="stage-logo"
              />
              <h2>LuxEngine</h2>
              <p>
                An engine for building.
                <br />A codebase for learning.
              </p>
              <Link href="/lux" className="text-link">
                Take a closer look <Arrow diagonal />
              </Link>
              <div className="stage-specs">
                <span>C++</span>
                <span>Windows</span>
                <span>GPL-3.0</span>
              </div>
            </div>
            <figure className="stage-capture">
              <Link
                href="#lux"
                aria-label="Explore screenshots of the LuxEngine editor"
              >
                <Image
                  src="/images/lux-hero.webp"
                  alt="Sponza running in the real LuxEngine editor"
                  width={2560}
                  height={1392}
                  priority
                  sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1000px) calc(100vw - 80px), (max-width: 1400px) calc(100vw - 360px), 1040px"
                />
              </Link>
              <figcaption>
                <span>On the bench: Sponza in the editor</span>
                <a href="#lux">
                  More screenshots <span aria-hidden="true">↓</span>
                </a>
              </figcaption>
            </figure>
          </div>
          <div className="intro-footnote">
            <span>Actual tools. Actual progress.</span>
            <span>Starbounded has been building in public since 2023.</span>
          </div>
        </section>

        <section className="studio-section wrap section" id="studio">
          <div className="studio-copy">
            <span className="label">THE PEOPLE BEHIND THE PIXELS</span>
            <h2>
              A place to build,
              <br />
              and understand.
            </h2>
            <p>
              Starbounded is where we work on LuxEngine and the tools around it.
              We like understanding how things work, then trying to make
              something of our own.
            </p>
            <p>
              There’s still a lot to figure out. The code is public so you can
              follow along, learn with us, or help with the next problem.
            </p>
            <a href="https://github.com/starbounded-dev" className="text-link">
              See what we’re working on <Arrow diagonal />
            </a>
          </div>
          <aside className="studio-notes" aria-label="How we work">
            <span className="label">A FEW THINGS WE CARE ABOUT</span>
            <div>
              <h3>Make it understandable.</h3>
              <p>Learn the systems, write the code, and keep asking why.</p>
            </div>
            <div>
              <h3>Leave the door open.</h3>
              <p>
                Share the source and make room for questions and contributions.
              </p>
            </div>
            <div>
              <h3>Keep working at it.</h3>
              <p>
                Small experiments, honest progress, and a useful lesson in every
                rough edge.
              </p>
            </div>
          </aside>
        </section>

        <section className="engine-section" id="lux">
          <div className="wrap section">
            <div className="section-heading">
              <div>
                <span className="label">LUXENGINE / THE CURRENT BUILD</span>
                <h2>See what’s working.</h2>
              </div>
              <p>
                Scenes, rendering, materials.
                <br />A look at the tools as they stand today.
              </p>
            </div>
            <ScenePreview />
            <div className="tool-notes">
              <article>
                <span className="tool-symbol" aria-hidden="true">
                  ⌘
                </span>
                <h3>Put a scene together.</h3>
                <p>
                  A hierarchy, a content browser, and a viewport to see what
                  you’re making.
                </p>
              </article>
              <article>
                <span className="tool-symbol" aria-hidden="true">
                  ◈
                </span>
                <h3>Work on the details.</h3>
                <p>
                  Surface, emission, and texture settings, with a material
                  preview alongside.
                </p>
              </article>
              <article>
                <span className="tool-symbol" aria-hidden="true">
                  ◐
                </span>
                <h3>Try it. Look closer.</h3>
                <p>
                  Lighting and reflection tests help us find the renderer’s next
                  problem to solve.
                </p>
              </article>
            </div>
            <div className="engine-link-row">
              <span className="work-status">
                <i className="status-dot" /> Early development. Plenty to
                explore.
              </span>
              <Link href="/lux" className="text-link">
                Get to know LuxEngine <Arrow />
              </Link>
            </div>
          </div>
        </section>

        <section className="forward-section wrap section" id="roadmap">
          <div className="forward-intro">
            <span className="label">A WORK IN PROGRESS</span>
            <h2>Forward.</h2>
            <p>
              What we’re improving now, what comes next, and the ideas we want
              to reach further down the line.
            </p>
            <a
              href="https://app.milanote.com/1VLFym1ub26A5N?p=uYsX1JOqo0h"
              className="text-link"
            >
              Open the full roadmap <Arrow diagonal />
            </a>
          </div>
          <Roadmap />
        </section>

        <section className="setup-band" id="get-started">
          <div className="wrap section setup-section">
            <div>
              <span className="label">YOUR TURN AT THE WORKBENCH</span>
              <h2>
                Start with
                <br />
                the source.
              </h2>
              <p>
                Clone it, look around, and try a change. LuxEngine currently
                follows a Windows-first development path.
              </p>
              <div className="requirements">
                <span>Windows</span>
                <span>Visual Studio 2022</span>
                <span>Vulkan SDK</span>
              </div>
              <a
                href="/docs/getting-started.html"
                className="text-link"
              >
                Read the setup guide <Arrow diagonal />
              </a>
            </div>
            <SetupGuide />
          </div>
        </section>
        <section className="contact-strip wrap">
          <div>
            <span className="label">THERE’S ROOM FOR ANOTHER PAIR OF EYES</span>
            <h2>Have a thought? Say hello.</h2>
          </div>
          <a
            href="mailto:hello@starbounded.com"
            className="button button-outline"
          >
            hello@starbounded.com <Arrow diagonal />
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
