import './About.css';
import Image from 'next/image';
import data from '../../data.json';

const calculateExperience = () => {
    const months = data.experiences.map(item => {
        let count = 0;

        item.experiences.forEach(experience => count += experience.month_duration);

        return count;
    });

    var sum = months.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      },0);
    
    return Math.ceil(sum / 12);
}

const About = () => {
    return (
        <section id='About Me'>
            <h1>About Me</h1>

            <div className='wrapper'>
                <Image
                    src='/Rodrigo_Santos.webp'
                    width={270}
                    height={350}
                    alt='About Rodrigo Santos'
                    style={{ height: 'auto' }}
                />

                <div className='text-block'>
                    As a software developer with {calculateExperience()} years of experience, I like to turn innovative ideas into practical solutions.
                    My journey into the world of technology has been marked by a curiosity and passion for programming.
                    My knowledge spans several programming languages, including JavaScript, C#, C and Java.
                    These languages are not just tools in my hands, they are the means by which I bring ideas to life and solve complex problems.
                    I enjoy the challenge of creating efficient code needed for real-world applications. Being a tech enthusiast, I&apos;m always on the lookout for the latest trends and advances in the industry.
                    I&apos;m currently studying Software Engineering at the Polytechnic Institute of Setúbal.
                </div>
            </div>
        </section>
    );
}

export default About;