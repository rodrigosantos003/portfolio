import { useEffect, useState } from 'react'
import './Navbar.css'
import strings from '../../data/strings.json';

export default function NavBar() {
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
                {pages.map((page, index) => {
                    return <li key={index} className='nav-item'>
                        <a href={`#${page}`}>{page}</a>
                    </li>
                })}
            </ul>

        </nav>
    )
}
