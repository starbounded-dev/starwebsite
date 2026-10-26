import Link from "next/link";
import { Logo } from "./Logo";
import { Arrow } from "./Icons";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <Link aria-label="Starbounded Studio home" href="/">
            <Logo />
          </Link>
          <p>
            An independent studio in Canada. Building LuxEngine, and sharing the
            work as we go.
          </p>
          <a className="text-link" href="mailto:hello@starbounded.com">
            hello@starbounded.com <Arrow diagonal />
          </a>
        </div>
        <div className="footer-links">
          <div>
            <Link href="/#studio">Studio</Link>
            <Link href="/lux">LuxEngine</Link>
            <Link href="/#roadmap">Forward</Link>
            <Link href="/#get-started">Get started</Link>
          </div>
          <a href="#main-content">Back to top ↑</a>
        </div>
        <div className="footer-bottom mono">
          <span>© {new Date().getFullYear()} Starbounded Studio</span>
          <span>Made in Canada</span>
          <a href="https://github.com/starbounded-dev">Source on GitHub ↗</a>
        </div>
      </div>
    </footer>
  );
}
