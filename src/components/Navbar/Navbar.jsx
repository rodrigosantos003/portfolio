'use client'

import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'
import data from '../../data.json'

export default function NavBar({isPrivacyPolicyOn}) {
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
                {!isPrivacyPolicyOn ?
                    data.pages.map((page, index) => {
                        return <li key={index} className='nav-item'>
                            <Link href={`#${page}`}>{page}</Link>
                        </li>
                    })
                    :
                    <li key={'1'} className='nav-item'><Link href='/' onClick={() => window.location.reload()}>Back to Home</Link></li>}
            </ul>
        </nav>
    )
}