"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const INITIAL_COUNT = 3;

export default function ExperienceClient({ experiences }) {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? experiences : experiences.slice(0, INITIAL_COUNT);
  const hiddenCount = experiences.length - INITIAL_COUNT;

  return (
    <div className="experience-list">
      {visible.map((experience, index) => (
        <article
          key={`${experience.company}_${experience.role}_${experience.start}`}
          className={`tile experience-card reveal${experience.current ? " is-current" : ""}${index >= INITIAL_COUNT ? " fade-in" : ""}`}
        >
          <span className="experience-card__period">{experience.period}</span>

          <div className="experience-card__body">
            <h3>
              {experience.role}
              {experience.url ? (
                <a
                  className="experience-card__company is-link"
                  href={experience.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {experience.company}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ) : (
                <span className="experience-card__company">
                  {experience.company}
                </span>
              )}
            </h3>
            <ul>
              {experience.description.map((bullet, bulletIndex) => (
                <li key={`${bullet}_${bulletIndex}`}>{bullet}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}

      {hiddenCount > 0 && (
        <button
          type="button"
          className="experience-toggle"
          aria-expanded={showAll}
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Show less" : `Show all experience (${hiddenCount} more)`}
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={showAll ? "is-flipped" : undefined}
          />
        </button>
      )}
    </div>
  );
}
