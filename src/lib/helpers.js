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

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(value) {
  const str = String(value);
  if (/^\d{4}$/.test(str)) return str;

  const date = toDate(str);
  return `${MONTHS[date.month - 1]} ${date.year}`;
}

function formatPeriod({ start, end }) {
  const from = formatDate(start);
  const to = end ? formatDate(end) : "Now";

  return from === to ? from : `${from} — ${to}`;
}

// Experiences newest first, ongoing roles flagged, dates pre-formatted
export function getExperiences() {
  return data.experiences
    .filter((exp) => exp.start)
    .toSorted((a, b) =>
      Temporal.PlainDate.compare(toDate(b.start), toDate(a.start)),
    )
    .map((exp) => ({
      ...exp,
      current: !exp.end,
      period: formatPeriod(exp),
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