import './About.css';
import Image from 'next/image';

const About = ({ pageStrings }) => {
    return (
        <section id={pageStrings.title}>
            <h1>{pageStrings.title}</h1>

            <div className='wrapper'>
                <Image
                    src='/Rodrigo_Santos.webp'
                    width={270}
                    height={350}
                    alt='About Rodrigo Santos'
                    style={{ height: 'auto' }}
                />

                <div className='text-block'>
                    {pageStrings.text}
                </div>
            </div>
        </section>
    );
}

export default About;