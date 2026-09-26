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

    const offset = navRef.current ? -navRef.current.offsetHeight : 0;
    lenis.scrollTo(`#${page}`, { offset });
    window.history.pushState(null, "", `#${encodeURIComponent(page)}`);
  };

  return (
    <nav className="navbar" ref={navRef}>
      <Link className="logo" href="/">
        <Image
          src="/Rodrigo_Santos_Logo.webp"
          width={50}
          height={47}
          alt="Rodrigo Santos"
          style={{ height: "auto" }}
        />
      </Link>

      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <X size={32} stroke="#cbd5e1" />
        ) : (
          <Menu size={32} stroke="#cbd5e1" />
        )}
      </button>

      <ul className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>
        {data.pages.map((page, index) => (
          <li key={index} className="nav-item">
            <a href={`#${encodeURIComponent(page)}`} onClick={(event) => scrollToSection(event, page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
