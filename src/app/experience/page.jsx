import { getExperiences } from "@/lib/helpers";
import ExperienceClient from "./server";
import "./styles.css";

export default function Experience() {
  const experiences = getExperiences();

  return (
    <section id="Experience">
      <h2 className="section-title">
        <span className="section-index">02 /</span>Experience
      </h2>
      <ExperienceClient experiences={experiences} />
    </section>
  );
}
