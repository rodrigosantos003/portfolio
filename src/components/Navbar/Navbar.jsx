'use client'

import {useState, useEffect} from 'react'
import './Navbar.css'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import strings from '../../data/strings.json'

export default function NavBar() {
    const [language, setLanguage] = useState("EN");
    const pageStrings = strings[language];
    const pages = [pageStrings.About.title, pageStrings.Experience.title, pageStrings.Projects.title, pageStrings.Contact.title]

    useEffect(() => {
        setLanguage(navigator.language.split('-')[0].toUpperCase());
    }, []);

    return (
        <nav className='navbar'>
            <Link className='logo' href='/'>
                <Image
                    src='/Rodrigo_Santos_Logo.webp'
                    width={70}
                    height={65}
                    alt='Rodrigo Santos'
                />
            </Link>

            <ul className='nav-links'>
                {usePathname() != '/privacy-policy' ?
                    pages.map((page, index) => {
                        return <li key={index} className='nav-item'>
                            <Link href={`#${page}`}>{page}</Link>
                        </li>
                    })
                    :
                    <li key={'1'} className='nav-item'><Link href='/'>Back to Home</Link></li>}
            </ul>
        </nav>
    )
}