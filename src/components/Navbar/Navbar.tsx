"use client"

import * as React from 'react';
import './Navbar.css'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link';

const pages = ['About', 'Experience', "Projects", "Contact"];

export default function NavBar() {
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

            <ul className="nav-links">
                {usePathname() != "/privacy-policy" ?
                    pages.map((page, index) => {
                        return <li key={index} className="nav-item">
                            <Link href={`#${page}`}>{page}</Link>
                        </li>
                    })
                    :
                    <li key={"1"} className="nav-item"><Link href="/">Back to Home</Link></li>}
            </ul>

        </nav>
    );
}
