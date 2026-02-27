import "./About.css";
import Image from "next/image";
import {
  calculateExperience,
  getCurrentCompany,
  getCurrentRole,
} from "../../helpers";

const About = () => {
  const experienceYears = calculateExperience();
  return (
    <section id="About Me" className="about-section">
      <div className="hero-intro">
        <p className="greeting">Hello, I&apos;m</p>
        <h1 className="hero-name">Rodrigo Santos</h1>
        <p className="hero-tagline">
          Software Engineer &middot; {experienceYears}+ years of experience
        </p>
      </div>

      <div className="wrapper">
        <div className="image-container">
          <Image
            src="/Rodrigo_Santos.webp"
            width={270}
            height={350}
            alt="About Rodrigo Santos"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAQIAEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli5xJNEsKgs7yNjxCJ5l5aPg8WuYfzj8hbgUKzOOtKqZeM+0FZD9Q3CyYzxLlw/rL9O3d0/0BLFX9zTgfCKhLqbagBhfVCBOkYKpBAy6n/7c8vp0hFRJhzpPmMLEqKPr7Qb1tHYyE5nGlT+CjfJZSNZWzjQdPGpKCkZlm8O7EpFfF7v1LbBEWNjD/P8APKQDzKUWEHuKu+YKa6YUqhttjOZw1Ocp/wB6hE2tXGxmXCaOdIDXOEpVJbmOX0oVJGcyKHn6O5f7/9k="
            style={{
              height: "auto",
              aspectRatio: "270/350",
            }}
          />
        </div>

        <div className="text-block">
          <p>
            As a software developer with {experienceYears} years of experience,
            I like to turn innovative ideas into practical solutions. My journey
            into the world of technology has been marked by a curiosity and
            passion for programming.
          </p>
          <p>
            My knowledge spans several programming languages and frameworks,
            including <strong>React/React Native</strong>,{" "}
            <strong>Node.js</strong> and <strong>MongoDB</strong>. These are not
            just tools in my hands — they are the means by which I bring ideas
            to life and solve complex problems.
          </p>
          <p>
            Being a tech enthusiast, I&apos;m always on the lookout for the
            latest trends and advances in the industry. I&apos;m currently
            working as a <strong>{getCurrentRole()}</strong> at{" "}
            <strong>{getCurrentCompany()}</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
