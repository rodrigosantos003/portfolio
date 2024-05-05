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
import strings from '@/data/strings'

export default function Home() {
  const [language, setLanguage] = useState("EN");
  const [privacyPolicy, setPrivacyPolicy] = useState(false);

  useEffect(() => {
    // Set language based on browser language
    const preferredLanguage = navigator.language.split('-')[0].toUpperCase();
    if (preferredLanguage === 'PT' || preferredLanguage === 'EN') {
      setLanguage(preferredLanguage);
    }

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
    <NavBar />

    <CookieConsent
      style={{ backgroundColor: '#f4f4f4' }}
      buttonStyle={{ background: '#000000', color: '#f4f4f4' }}
      declineButtonStyle={{ background: '#fff' }}>
      {strings[language].Cookie.description}

      <Link href='#' onClick={displayPrivacyPolicy}
        style={{ color: '#000000', float: 'right', textDecoration: 'underline' }}>
        {strings[language].Cookie.link}
      </Link>
    </CookieConsent>

    {privacyPolicy ? <PrivacyPolicy /> : <>
      <About pageStrings={strings[language].About} />
      <Experience pageStrings={strings[language].Experience} />
      <Projects pageStrings={strings[language].Projects} />
      <Contact pageStrings={strings[language].Contact} />
    </>}
  </main >
}