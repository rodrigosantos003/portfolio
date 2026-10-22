import data from "@/lib/data.json";
import "./styles.css";
import ProjectsClient from "./server";
import { extractTechStack } from "@/lib/helpers";

export default async function Projects() {
  const res = await fetch(
    "https://api.github.com/users/rodrigosantos003/repos?per_page=100&sort=created&direction=desc",
    {
      headers: { Accept: "application/vnd.github+json" },
      next: { tags: ["repos"] },
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

  const filteredRepos = repos.filter(
    (repo) => !data.ignoredRepos.includes(repo.name),
  );

  const techStack = extractTechStack(filteredRepos);

  return (
    <section id="Projects">
      <h1>Projects</h1>
      <ProjectsClient repos={filteredRepos} techStack={techStack} />
    </section>
  );
}
