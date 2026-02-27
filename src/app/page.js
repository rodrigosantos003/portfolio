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

    return () => {
      window.removeEventListener('scroll', logPageView)
    }
  }, [])

  function displayPrivacyPolicy() {
    setPrivacyPolicy(!privacyPolicy);
  }

  return <main>
    <NavBar isPrivacyPolicyOn={privacyPolicy} />

    <CookieConsent
      style={{
        backgroundColor: 'rgba(11, 15, 26, 0.85)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(148, 163, 184, 0.12)',
        padding: '16px 24px',
        fontSize: '0.9rem',
      }}
      buttonStyle={{
        background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
        color: '#0b0f1a',
        borderRadius: '8px',
        padding: '10px 24px',
        fontWeight: '600',
        fontSize: '0.85rem',
        border: 'none',
      }}
      declineButtonStyle={{
        background: 'transparent',
        border: '1px solid rgba(148, 163, 184, 0.3)',
        color: '#cbd5e1',
        borderRadius: '8px',
        padding: '10px 24px',
        fontSize: '0.85rem',
      }}>
      This website uses cookies. By browsing the site you consent to its use.

      <Link href='#' onClick={displayPrivacyPolicy}
        style={{
          color: '#38bdf8',
          float: 'right',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
          marginLeft: '12px',
        }}>
        Privacy Policy
      </Link>
    </CookieConsent>

    {privacyPolicy ? <PrivacyPolicy /> : <>
      <About />
      <Experience />
      <Projects />
      <Contact />
    </>}
  </main>
}