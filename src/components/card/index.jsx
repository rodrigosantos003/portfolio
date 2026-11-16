import { ArrowUpRight } from "lucide-react";
import "./styles.css";

const ACRONYMS = new Set(["api", "cpd", "tsp", "lan", "tp"]);

const generateTitle = (name) =>
  name
    .split("-")
    .map((word) =>
      ACRONYMS.has(word.toLowerCase())
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");

const Card = ({ data }) => {
  return (
    <a
      className="tile tile-interactive card"
      href={`https://github.com/rodrigosantos003/${data.name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="card__meta">
        <span className="card__language">{data.language ?? "Other"}</span>
        <ArrowUpRight size={18} aria-hidden="true" className="card__arrow" />
      </div>

      <h3>{generateTitle(data.name)}</h3>

      {data.description && <p className="card__description">{data.description}</p>}

      {data.topics?.length > 0 && (
        <ul className="card__topics">
          {data.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      )}
    </a>
  );
};

export default Card;
