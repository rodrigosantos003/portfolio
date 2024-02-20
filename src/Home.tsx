import { useEffect, useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import About from './sections/About/About';
import Contact from './sections/Contact/Contact';
import Experience from './sections/Experience/Experience';
import Projects from './sections/Projects/Projects';
import { initGA, logPageView } from './google-analytics';
import strings from './data/strings.json';
import PrivacyPolicy from './PrivacyPolicy';
import NavBar from './components/Navbar/Navbar';

export default function Home() {
  const language = navigator.language.split('-')[0].toUpperCase();

  const [privacyPolicy, setPrivacyPolicy] = useState(false);

  function displayPrivacyPolicy() {
    setPrivacyPolicy(!privacyPolicy);
  }

  useEffect(() => {
    initGA();
    logPageView();

    // Clean up
    return () => {
      window.removeEventListener('scroll', logPageView);
    }
  }, [])

  return <>
    <NavBar privacyPolicy={privacyPolicy} displayPrivacyPolicy={displayPrivacyPolicy} />

    <CookieConsent
      style={{ backgroundColor: '#f4f4f4' }}
      buttonStyle={{ background: '#000000', color: '#f4f4f4' }}
      declineButtonStyle={{ background: '#fff' }}>
      {strings[language as keyof typeof strings].Cookie.description}

      <a href='#' onClick={displayPrivacyPolicy} style={{ color: '#000000', float: 'right', textDecoration: 'underline' }}>{strings[language as keyof typeof strings].Cookie.link}</a>
    </CookieConsent>

    {privacyPolicy ? <PrivacyPolicy /> : <>
      <About pageStrings={strings[language as keyof typeof strings].About} />
      <Experience pageStrings={strings[language as keyof typeof strings].Experience} />
      <Projects pageStrings={strings[language as keyof typeof strings].Projects} />
      <Contact pageStrings={strings[language as keyof typeof strings].Contact} />
    </>}
  </>
}
