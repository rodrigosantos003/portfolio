import "./styles.css";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import data from "@/lib/data.json";
import {
  calculateExperience,
  getCurrentCompany,
  getCurrentRole,
  highlightTechnologies,
} from "../../lib/helpers";

const About = () => {
  const experienceYears = calculateExperience();
  return (
    <section id="About Me" className="about-section">
      <div className="hero">
        <p className="status-badge">
          <span className="status-dot" aria-hidden="true" />
          {getCurrentRole()} at {getCurrentCompany()}
        </p>
        <h1 className="hero-title">
          Rodrigo Santos
          <br />
          <span>Fullstack, integrations &amp; cloud</span>
        </h1>
        <p className="hero-lead">
          Software engineer with {experienceYears}+ years of experience building
          web and mobile apps with React and React Native, backed by REST APIs
          with Node.js, MongoDB and PostgreSQL running on AWS.
        </p>
        <div className="hero-actions">
          <a className="btn btn-light" href="#Projects">
            See my work
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a className="btn btn-outline" href="#Contacts">
            Get in touch
          </a>
        </div>
      </div>

      <h2 className="section-title">
        <span className="section-index">01 /</span>About
      </h2>

      <div className="about-grid">
        <div className="tile about-portrait reveal">
          <Image
            src="/Rodrigo_Santos.webp"
            width={270}
            height={350}
            sizes="(max-width: 768px) 240px, 360px"
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

        <div className="tile about-text reveal">
          <p>
            I'm a software engineer with {experienceYears}+ years of experience
            in software development, specialising in fullstack development,
            system integration and cloud.
          </p>
          <p>
            {highlightTechnologies(
              "My core skills include building web and mobile apps with React and React Native, and building and maintaining REST APIs using Node.js with MongoDB and PostgreSQL databases, AWS infrastructure and observability tools.",
            )}
          </p>
          <p>
            Being a tech enthusiast, I&apos;m always on the lookout for the
            latest trends and advances in the industry. I&apos;m currently
            working as a <strong>{getCurrentRole()}</strong> at{" "}
            <strong>{getCurrentCompany()}</strong>.
          </p>
        </div>

        <div className="tile about-stack reveal">
          <span className="about-stack__label">Stack</span>
          <ul>
            {data.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
