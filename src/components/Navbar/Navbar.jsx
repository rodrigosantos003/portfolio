"use client";

import { useState } from "react";
import "./Navbar.css";
import Image from "next/image";
import Link from "next/link";
import data from "../../data.json";

export default function NavBar({ isPrivacyPolicyOn }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
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
        <span />
        <span />
        <span />
      </button>

      <ul className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>
        {!isPrivacyPolicyOn ? (
          data.pages.map((page, index) => (
            <li key={index} className="nav-item">
              <Link href={`#${page}`} onClick={closeMenu}>
                {page}
              </Link>
            </li>
          ))
        ) : (
          <li key={"1"} className="nav-item">
            <Link
              href="/"
              onClick={() => {
                closeMenu();
                window.location.reload();
              }}
            >
              Back to Home
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
