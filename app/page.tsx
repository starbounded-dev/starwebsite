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
              Starbounded is an independent software company. Our first product
              is LuxEngine, an open-source 3D game engine and editor. More are
              in the works.
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
                The best way to understand an engine is to build one, so we did.
                LuxEngine has a deferred renderer, physics, C# scripting, and a
                full editor, and every line of it is open to read.
              </p>
              <dl className="feature-list">
                <div>
                  <dt>Renderer</dt>
                  <dd>
                    Deferred, clustered PBR on Vulkan, with a render graph,
                    cascaded shadows, and screen-space reflections.
                  </dd>
                </div>
                <div>
                  <dt>Editor</dt>
                  <dd>
                    A docking workspace with a scene hierarchy, content browser,
                    material editor, and undo history.
                  </dd>
                </div>
                <div>
                  <dt>Runtime</dt>
                  <dd>
                    Jolt physics, C# scripts on .NET 9, and a standalone player
                    for packaged projects.
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
                LuxEngine’s source, docs, and roadmap are all public. A question
                counts as a contribution.
              </dd>
            </div>
            <div>
              <dt>Understandable on purpose</dt>
              <dd>
                We would rather ship a system you can follow than one that only
                looks finished. The code is meant to be read.
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
              LuxEngine builds from source on Windows and Linux. Clone it, open
              the editor, and change something.
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
