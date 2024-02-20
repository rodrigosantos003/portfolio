import { useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';
import About from './sections/About/About';
import Contact from './sections/Contact/Contact';
import Experience from './sections/Experience/Experience';
import Projects from './sections/Projects/Projects';
import { initGA, logPageView } from './google-analytics';
import strings from './data/strings.json';

export default function Home() {
  const language = navigator.language.split('-')[0].toUpperCase();

  useEffect(() => {
    initGA();
    logPageView();

    // Clean up
    return () => {
      window.removeEventListener('scroll', logPageView);
    }
  }, [])

  return <main>
    <CookieConsent
      style={{ backgroundColor: '#f4f4f4' }}
      buttonStyle={{ background: '#000000', color: '#f4f4f4' }}
      declineButtonStyle={{ background: '#fff' }}>
      This website uses cookies. By browsing the site you consent to its use

      <a href='/privacy-policy' style={{ color: '#000000', float: 'right', textDecoration: 'underline' }}>Privacy Policy</a>
    </CookieConsent>

    <About pageStrings={strings[language as keyof typeof strings].About} />
    <Experience pageStrings={strings[language as keyof typeof strings].Experience} />
    <Projects pageStrings={strings[language as keyof typeof strings].Projects} />
    <Contact pageStrings={strings[language as keyof typeof strings].Contact} />
  </main >
}
