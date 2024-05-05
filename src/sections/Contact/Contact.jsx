import './Contact.css';

const Contact = ({ pageStrings }) => {

    return <section id={pageStrings.title}>
        <h1>{pageStrings.title}</h1>

        <div className='social-links'>
            <a href='mailto:rodrigo.s.santos003@gmail.com'>Email</a>
            <a href='https://www.linkedin.com/in/rodrigosantos-softwareengineer/'>LinkedIn</a>
            <a href='https://github.com/rodrigosantos003'>GitHub</a>
        </div>

    </section>
}

export default Contact;