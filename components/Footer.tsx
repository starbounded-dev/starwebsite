import Link from "next/link";
import { Logo } from "./Logo";
import { footerGroups, type NavigationLink } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link aria-label="Starbounded home" href="/">
              <Logo />
            </Link>
            <p>Tools for people who build worlds. Made in Canada.</p>
          </div>
          {footerGroups.map((group) => (
            <nav
              className="footer-group"
              key={group.title}
              aria-labelledby={`footer-${group.title.toLowerCase()}`}
            >
              <h2 id={`footer-${group.title.toLowerCase()}`}>{group.title}</h2>
              <ul>
                {group.links.map((link: NavigationLink) => (
                  <li key={link.href}>
                    {link.document || link.external ? (
                      <a href={link.href}>{link.label}</a>
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Starbounded</span>
          <a href="#main-content">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
