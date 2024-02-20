import { useEffect, useState } from 'react'
import './Navbar.css'
import strings from '../../data/strings.json';

interface NavBarProps {
    privacyPolicy: boolean;
    displayPrivacyPolicy: () => void;
}

const NavBar = ({ privacyPolicy, displayPrivacyPolicy }: NavBarProps) => {
    const [language, setLanguage] = useState("EN");
    const pageStrings = strings[language as keyof typeof strings];
    const pages = [pageStrings.About.title, pageStrings.Experience.title, pageStrings.Projects.title, pageStrings.Contact.title]

    useEffect(() => {
        setLanguage(navigator.language.split('-')[0].toUpperCase());
    }, []);

    return (
        <nav className='navbar'>
            <a className='logo' href='/'>
                <img
                    src='/Rodrigo_Santos_Logo.webp'
                    width={70}
                    height={65}
                    alt='Rodrigo Santos'
                />
            </a>

            <ul className='nav-links'>
                {!privacyPolicy ? pages.map((page, index) => {
                    return <li key={index} className='nav-item'>
                        <a href={`#${page}`}>{page}</a>
                    </li>
                }) : <li key={'1'} className='nav-item'><a href='#' onClick={displayPrivacyPolicy}>Back to Home</a></li>}
            </ul>

        </nav>
    )
}

export default NavBar;
