"use client"

import * as React from 'react';
import './Navbar.css'

const pages = ['About', 'Experience', "Projects", "Contact"];

export default function NavBar() {

    return (
        <nav className='navbar'>
            <a className='logo' href='/'><img src="Rodrigo_Santos_Logo.png" alt="Rodrigo Santos" /></a>

            <ul className="nav-links">
                {pages.map((page, index) => {
                    return <li key={index} className="nav-item"><a href={`#${page}`}>{page}</a></li>
                })}
            </ul>
        </nav>
    );

}
