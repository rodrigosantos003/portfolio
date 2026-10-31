import { Fragment } from "react";
import data from "./data.json";

function toDate(value) {
  const str = String(value);
  return Temporal.PlainDate.from(/^\d{4}$/.test(str) ? `${str}-01-01` : str);
}

function monthDiff(start, end) {
  // +1 keeps your original "inclusive" counting
  return toDate(start).until(toDate(end), { largestUnit: "months" }).months + 1;
}

function getDateYear(dateString) {
  return toDate(dateString).year.toString();
}

export function calculateExperience() {
  const today = Temporal.Now.plainDateISO();

  const months = data.experiences.reduce(
    (sum, { start, end }) => sum + monthDiff(start, end ?? today),
    0,
  );

  return Math.floor(months / 12);
}

export function getCurrentRole() {
  return data.experiences[0].role;
}

export function getCurrentCompany() {
  return data.experiences[0].company;
}

export function groupExperiencesByYear() {
  const currentYear = Temporal.Now.plainDateISO().year;
  const grouped = new Map([[currentYear, []]]);

  for (const exp of data.experiences) {
    if (!exp.start) continue;

    const year = "end" in exp ? toDate(exp.start).year : currentYear;

    grouped.getOrInsertComputed(year, () => []).push(exp);
  }

  return [...grouped]
    .sort(([a], [b]) => b - a)
    .map(([year, experiences]) => ({
      year: String(year),
      experiences: experiences.toSorted((a, b) =>
        Temporal.PlainDate.compare(toDate(b.start), toDate(a.start)),
      ),
    }));
}

export function extractTechStack(repos) {
  const techStack = new Set();

  repos.forEach((repo) => {
    techStack.add(repo.language);
  });

  return Array.from(techStack);
}

const TECHNOLOGIES = [
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "observability",
];

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const highlightTechnologies = (text, technologies = TECHNOLOGIES) => {
  // Longest first, so "Node.js" wins over a hypothetical "Node"
  const pattern = technologies
    .slice()
    .sort((a, b) => b.length - a.length)
    .map(escapeRegex)
    .join("|");

  // Capturing group keeps the matches in the split result
  const regex = new RegExp(`(${pattern})`, "gi");

  return text.split(regex).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i}>{part}</strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
};