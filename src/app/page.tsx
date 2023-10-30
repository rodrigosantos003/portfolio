import { useEffect } from 'react';
import { logPageView } from '@/data/GoogleAnalytics';

import About from "@/sections/About/About";
import Contact from "@/sections/Contact/Contact";
import Experience from "@/sections/Experience/Experience";
import Projects from "@/sections/Projects/Projects";

export default function Home() {
  useEffect(() => {
    // Track page view on route change
    logPageView();
  }, [location.href]);

  return <main>
    <About />
    <Experience />
    <Projects />
    <Contact />
  </main>
}
