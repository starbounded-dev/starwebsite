import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Arrow } from "@/components/Icons";
import { Bounds } from "@/components/Bounds";
import { StarField } from "@/components/StarField";
import { ProductList } from "@/components/ProductList";
import { contactEmail, githubOrgUrl } from "@/lib/navigation";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="hero" aria-labelledby="home-title">
          <StarField />
          <div className="wrap hero-inner" data-rise>
            <h1 id="home-title">Tools for people who build worlds.</h1>
            <p className="hero-lede">
              Starbounded is a small software company in Canada. Our first
              product is LuxEngine, a 3D game engine and editor written in C++20
              on Vulkan, with its source on GitHub. Others will show up here
              once they exist.
            </p>
            <div className="button-row">
              <Link href="/lux" className="button button-primary">
                Explore LuxEngine <Arrow />
              </Link>
              <a href={githubOrgUrl} className="text-link">
                Starbounded on GitHub <Arrow diagonal />
              </a>
            </div>
          </div>
          <figure className="wrap hero-shot" data-settle>
            <div className="hero-frame">
              <Bounds />
              <Link
                href="/lux#screenshots"
                className="shot"
                aria-label="See more screenshots of the LuxEngine editor"
              >
                <Image
                  src="/images/lux-hero.webp"
                  alt="The LuxEngine editor in play mode, showing the sunlit vaults of the Sponza courtyard beside the scene hierarchy and renderer settings"
                  width={2560}
                  height={1392}
                  priority
                  sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) calc(100vw - 56px), (max-width: 1280px) calc(100vw - 80px), 1200px"
                />
              </Link>
            </div>
            <figcaption className="shot-caption">
              Sponza in the LuxEngine editor, captured from the release build
              while the benchmark scene plays.
            </figcaption>
          </figure>
        </section>

        <section className="wrap section" id="products">
          <div className="section-head">
            <h2>Products</h2>
            <p>
              Everything we make is listed here, including what isn’t finished.
            </p>
          </div>
          <ProductList />
        </section>

        <section className="band" id="lux" data-product="lux">
          <div className="wrap section flagship-grid">
            <div className="flagship-copy">
              <h2>LuxEngine is where we start.</h2>
              <p className="lede">
                You learn how an engine works by building one, so that’s what
                we did. LuxEngine renders, simulates, plays sound and edits
                scenes, and you can open any of those systems and read how it
                works.
              </p>
              <dl className="feature-list">
                <div>
                  <dt>Renderer</dt>
                  <dd>
                    Deferred, clustered PBR on Vulkan. A render graph skips any
                    pass whose feature is switched off, so an unused effect
                    costs nothing.
                  </dd>
                </div>
                <div>
                  <dt>Audio</dt>
                  <dd>
                    FMOD Studio plays every sound. Asterwave traces the level’s
                    geometry, so walls muffle what’s behind them and each room
                    sets its own reverb.
                  </dd>
                </div>
                <div>
                  <dt>Editor</dt>
                  <dd>
                    A docking editor with snapshot undo and redo, a command
                    palette, a profiler, and a material editor.
                  </dd>
                </div>
                <div>
                  <dt>Gameplay</dt>
                  <dd>
                    Jolt for 3D physics, Box2D for 2D, C# scripts on .NET 9
                    with hot reload, and a player that runs packaged projects
                    without the editor.
                  </dd>
                </div>
              </dl>
              <Link href="/lux" className="text-link">
                See what’s inside LuxEngine <Arrow />
              </Link>
            </div>
            <div className="flagship-shots">
              <figure>
                <span className="shot">
                  <Image
                    src="/images/lux-material-field.webp"
                    alt="LuxEngine drawing a dense field of textured boxes, spheres, and cylinders under an evening sky"
                    width={3839}
                    height={2088}
                    sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1000px) calc(100vw - 56px), 680px"
                  />
                </span>
                <figcaption className="shot-caption">
                  6,000 meshes sharing 128 materials, one of the stress areas
                  in the benchmark scene.
                </figcaption>
              </figure>
              <figure>
                <span className="shot">
                  <Image
                    src="/images/lux-many-lights.webp"
                    alt="A grid of dark cubes on a floor covered in pools of coloured light from hundreds of point lights"
                    width={3839}
                    height={2088}
                    sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1000px) calc(100vw - 56px), 680px"
                  />
                </span>
                <figcaption className="shot-caption">
                  The many-lights test: hundreds of small point lights, culled
                  per cluster before shading.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="wrap section" id="company">
          <h2 className="company-statement">
            We’re a small, independent company in Canada.{" "}
            <span>We’ve been building in the open since 2023.</span>
          </h2>
          <dl className="principles">
            <div>
              <dt>Open by default</dt>
              <dd>
                LuxEngine’s source, docs and roadmap are public, down to every
                issue planned for the next release. Asking a question counts as
                contributing.
              </dd>
            </div>
            <div>
              <dt>Understandable on purpose</dt>
              <dd>
                We’d rather ship a system you can follow than one that only
                looks finished. The code is written to be read.
              </dd>
            </div>
            <div>
              <dt>Honest about progress</dt>
              <dd>
                Each product says what works today, what is partial, and what
                doesn’t exist yet.
              </dd>
            </div>
          </dl>
        </section>

        <section className="wrap closing" aria-labelledby="closing-title">
          <div className="closing-panel">
            <Bounds />
            <h2 id="closing-title">Start with the engine.</h2>
            <p>
              LuxEngine builds from source on Windows and Linux. For now the
              build also needs the FMOD SDK and access to our private Asterwave
              repository. The setup guide lists everything.
            </p>
            <div className="button-row">
              <Link href="/lux#setup" className="button button-primary">
                Get the source <Arrow />
              </Link>
              <a href={`mailto:${contactEmail}`} className="text-link">
                {contactEmail}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
