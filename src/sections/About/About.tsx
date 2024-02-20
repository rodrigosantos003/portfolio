import './About.css';
import { AboutPageStrings } from '../../data/PageStrings';

interface AboutProps {
    pageStrings: AboutPageStrings;
}

const About = ({ pageStrings }: AboutProps) => {
    return (
        <section id={pageStrings.title}>
            <h1>{pageStrings.title}</h1>

            <div className='wrapper'>
                <img
                    src='../../../Rodrigo_Santos.webp'
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