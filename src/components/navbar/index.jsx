"use client";

import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import "./styles.css";
import Image from "next/image";
import Link from "next/link";
import data from "@/lib/data.json";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const lenis = useLenis();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const scrollToSection = (event, page) => {
    if (!lenis) return;

    event.preventDefault();
    closeMenu();

    // The navbar floats 16px from the top; leave the same gap below it
    const offset = navRef.current ? -(navRef.current.offsetHeight + 32) : 0;
    lenis.scrollTo(`#${CSS.escape(page)}`, { offset });
    window.history.pushState(null, "", `#${encodeURIComponent(page)}`);
  };

  const lastIndex = data.pages.length - 1;

  return (
    <div className="navbar-wrapper">
      <nav className="navbar" ref={navRef} aria-label="Primary">
        <Link className="logo" href="/">
          <Image
            src="/Rodrigo_Santos_Logo.webp"
            width={36}
            height={34}
            alt="Rodrigo Santos"
            style={{ height: "auto" }}
          />
        </Link>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="nav-links"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul
          id="nav-links"
          className={`nav-links ${menuOpen ? "mobile-open" : ""}`}
        >
          {data.pages.map((page, index) => (
            <li key={page} className="nav-item">
              <a
                href={`#${encodeURIComponent(page)}`}
                className={index === lastIndex ? "nav-cta" : undefined}
                onClick={(event) => scrollToSection(event, page)}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
