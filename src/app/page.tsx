"use client"

import { useEffect } from 'react';

import About from "@/sections/About/About";
import Contact from "@/sections/Contact/Contact";
import Experience from "@/sections/Experience/Experience";
import Projects from "@/sections/Projects/Projects";
import { initGA, logPageView } from './google-analytics';

export default function Home() {
  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  return <main>
    <About />
    <Experience />
    <Projects />
    <Contact />
  </main>
}
