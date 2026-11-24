import { useState } from "react";

const links = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Campus News", "#news"],
  ["Student Services", "#services"],
  ["Events", "#events"]
];

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <nav className={`primary-nav ${menuOpen ? "primary-nav--open" : ""}`} aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
        <a className="nav-official" href="https://www.ctu.edu.ph/naga/" target="_blank" rel="noreferrer">
          Official CTU Naga <span aria-hidden="true">↗</span>
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span><span></span>
        </button>
      </div>
    </header>
  );
}
