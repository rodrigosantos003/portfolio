import './About.css'
import Image from 'next/image'

export default function About() {
    return (
        <section id='About'>
            <h1>About Me</h1>

            <div className='wrapper'>
                <Image
                    src='/Rodrigo_Santos.webp'
                    width={270}
                    height={350}
                    alt='About Rodrigo Santos'
                    priority={true}
                />

                <div className='text-block'>
                    As a software developer with 2 years' experience, I like to turn innovative ideas into practical solutions.
                    My journey into the world of technology has been marked by a curiosity and passion for programming.
                    <br />
                    My knowledge spans several programming languages, including JavaScript, C#, C and Java.
                    These languages are not just tools in my hands, they are the means by which I bring ideas to life and solve
                    complex problems. I enjoy the challenge of creating efficient code needed for real-world applications.
                    <br />
                    Being a tech enthusiast, I'm always on the lookout for the latest trends and advances in the industry.
                    <br />
                    I'm currently studying Software Engineering at the Polytechnic Institute of Setúbal.
                </div>
            </div>
        </section>
    )
}