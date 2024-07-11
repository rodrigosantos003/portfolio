"use client"

import { useEffect, useState } from 'react'
import NavBar from '@/components/Navbar/Navbar'
import CookieConsent from 'react-cookie-consent'
import About from '@/sections/About/About'
import Contact from '@/sections/Contact/Contact'
import Experience from '@/sections/Experience/Experience'
import Projects from '@/sections/Projects/Projects'
import PrivacyPolicy from '@/components/PrivacyPolicy/PrivacyPolicy'
import { initGA, logPageView } from './google-analytics'
import Link from 'next/link'

export default function Home() {
  const [privacyPolicy, setPrivacyPolicy] = useState(false);

  useEffect(() => {

    initGA()
    logPageView()

    // Clean up
    return () => {
      window.removeEventListener('scroll', logPageView)
    }
  }, [])

  // Display privacy policy
  function displayPrivacyPolicy() {
    setPrivacyPolicy(!privacyPolicy);
  }

  return <main>
    <NavBar isPrivacyPolicyOn={privacyPolicy} />

    <CookieConsent
      style={{ backgroundColor: '#f4f4f4' }}
      buttonStyle={{ background: '#000000', color: '#f4f4f4' }}
      declineButtonStyle={{ background: '#fff' }}>
      This website uses cookies. By browsing the site you consent to its use

      <Link href='#' onClick={displayPrivacyPolicy}
        style={{ color: '#000000', float: 'right', textDecoration: 'underline' }}>
        Privacy Policy
      </Link>
    </CookieConsent>

    {privacyPolicy ? <PrivacyPolicy /> : <>
      <About />
      <Experience />
      <Projects />
      <Contact />
    </>}
  </main >
}