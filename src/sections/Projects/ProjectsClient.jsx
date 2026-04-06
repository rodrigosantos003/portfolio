"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "../../components/Card/Card";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function ProjectsClient({ repos, techStack }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTech, setSelectedTech] = useState([]);

  const techOptions = useMemo(() => {
    const set = new Set();

    (techStack ?? []).forEach((t) => {
      const normalized = t ?? "Other";
      if (normalized) set.add(normalized);
    });

    repos.forEach((repo) => {
      const normalized = repo?.language ?? "Other";
      if (normalized) set.add(normalized);
    });

    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [techStack, repos]);

  const filteredRepos = useMemo(() => {
    if (selectedTech.length === 0) return repos;

    const selected = new Set(selectedTech);
    return repos.filter((repo) => selected.has(repo?.language ?? "Other"));
  }, [repos, selectedTech]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredRepos.length / ITEMS_PER_PAGE);
  }, [filteredRepos]);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRepos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRepos, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTech]);

  function toggleTech(tech) {
    setSelectedTech((prev) => {
      if (prev.includes(tech)) return prev.filter((t) => t !== tech);
      return [...prev, tech];
    });
  }

  return (
    <>
      <div className="projects-filters">
        <div className="projects-filters__header">
          <span className="projects-filters__label">Tech stack</span>
          {selectedTech.length > 0 && (
            <button
              type="button"
              className="projects-filters__clear"
              onClick={() => setSelectedTech([])}
            >
              Clear
            </button>
          )}
        </div>

        <div className="projects-filters__chips" role="list">
          {techOptions.map((tech) => {
            const active = selectedTech.includes(tech);
            return (
              <button
                key={tech}
                type="button"
                className={`projects-chip ${active ? "is-active" : ""}`}
                onClick={() => toggleTech(tech)}
              >
                {tech}
              </button>
            );
          })}
        </div>
      </div>

      <div className="card-grid">
        {currentData.length > 0 ? (
          currentData.map((repo) => <Card key={repo.id} data={repo} />)
        ) : (
          <p>No projects match the selected tech stack.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ArrowLeft size={16} style={{ marginBottom: 0 }} />
          </button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </>
  );
}
