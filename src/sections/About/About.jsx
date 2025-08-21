import "./About.css";
import Image from "next/image";
import { calculateExperience } from "../../helpers";

const About = () => {
  return (
    <section id="About Me">
      <h1>About Me</h1>

      <div className="wrapper">
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

        <div className="text-block">
          As a software developer with {calculateExperience()} years of
          experience, I like to turn innovative ideas into practical solutions.
          My journey into the world of technology has been marked by a curiosity
          and passion for programming. My knowledge spans several programming
          languages, including JavaScript, C#, C and Java. These languages are
          not just tools in my hands, they are the means by which I bring ideas
          to life and solve complex problems. I enjoy the challenge of creating
          efficient code needed for real-world applications. Being a tech
          enthusiast, I&apos;m always on the lookout for the latest trends and
          advances in the industry. I&apos;m currently studying Software
          Engineering at the Polytechnic Institute of Setúbal.
        </div>
      </div>
    </section>
  );
};

export default About;
