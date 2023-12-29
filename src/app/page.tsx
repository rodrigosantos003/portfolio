'use client'

import { useEffect } from 'react'
import CookieConsent from 'react-cookie-consent'
import About from '@/sections/About/About'
import Contact from '@/sections/Contact/Contact'
import Experience from '@/sections/Experience/Experience'
import Projects from '@/sections/Projects/Projects'
import { initGA, logPageView } from './google-analytics'
import Link from 'next/link'

export default function Home() {
  useEffect(() => {
    initGA()
    logPageView()
  }, [])

  return <main>
    <CookieConsent
      style={{ backgroundColor: '#f4f4f4' }}
      buttonStyle={{ background: '#000000', color: '#f4f4f4' }}
      declineButtonStyle={{ background: '#fff' }}>
      This website uses cookies. By browsing the site you consent to its use

      <Link href='/privacy-policy' style={{ color: '#000000', float: 'right', textDecoration: 'underline' }}>Privacy Policy</Link>
    </CookieConsent>

    <About />
    <Experience />
    <Projects />
    <Contact />
  </main >
}
