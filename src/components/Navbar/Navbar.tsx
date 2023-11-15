"use client"

import * as React from 'react';
import './Navbar.css'
import { usePathname } from 'next/navigation'

const pages = ['About', 'Experience', "Projects", "Contact"];

export default function NavBar() {
    return (
        <nav className='navbar'>
            <a className='logo' href='/'><img src="Rodrigo_Santos_Logo.webp" alt="Rodrigo Santos" /></a>


            <ul className="nav-links">
                {usePathname() != "/privacy-policy" ?
                    pages.map((page, index) => {
                        return <li key={index} className="nav-item"><a href={`#${page}`}>{page}</a></li>
                    })
                    :
                    <li key={"1"} className="nav-item"><a href="/">Back to Home</a></li>}
            </ul>

        </nav>
    );
}
