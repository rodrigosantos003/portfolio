import data from "@/lib/data.json";
import "./Projects.css";
import ProjectsClient from "./ProjectsClient";
import { extractTechStack } from "@/lib/helpers";

export default async function Projects() {
  const res = await fetch(
    "https://api.github.com/users/rodrigosantos003/repos",
    {
      next: { revalidate: 86400 },
    },
  );

  if (!res.ok) {
    return (
      <section id="Projects">
        <h1>Projects</h1>
        <p>No data available</p>
      </section>
    );
  }

  const repos = await res.json();

  const sortedRepos = repos
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .filter((repo) => !data.ignoredRepos.includes(repo.name));

  const techStack = extractTechStack(sortedRepos);

  return (
    <section id="Projects">
      <h1>Projects</h1>
      <ProjectsClient repos={sortedRepos} techStack={techStack} />
    </section>
  );
}
