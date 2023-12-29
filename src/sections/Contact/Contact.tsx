import Link from 'next/link'
import './Contact.css'

export default function Contact() {
    return <section id='Contact'>
        <h1>Contacts</h1>

        <div className='social-links'>
            <Link href='mailto:rodrigo.s.santos003@gmail.com'>Email</Link>
            <Link href='https://www.linkedin.com/in/rodrigosantos-softwareengineer/'>LinkedIn</Link>
            <Link href='https://github.com/rodrigosantos003'>GitHub</Link>
        </div>

    </section>
}