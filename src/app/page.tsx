import { useEffect } from 'react';
import ReactGA from 'react-ga';

import About from "@/sections/About/About";
import Contact from "@/sections/Contact/Contact";
import Experience from "@/sections/Experience/Experience";
import Projects from "@/sections/Projects/Projects";

export default function Home() {
  useEffect(() => {
    // Track page view on route change
    ReactGA.initialize('G-3728W3QDVY');
    ReactGA.pageview(window.location.pathname);
  }, []);

  return <main>
    <About />
    <Experience />
    <Projects />
    <Contact />
  </main>
}
