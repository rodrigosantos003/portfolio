import { groupExperiencesByYear } from "@/lib/helpers";
import ExperienceClient from "./ExperienceClient";

export default function Experience() {
  const experiences = groupExperiencesByYear();

  return (
    <section id="Experience">
      <h1>Experience</h1>
      <ExperienceClient experiences={experiences} />
    </section>
  );
}
