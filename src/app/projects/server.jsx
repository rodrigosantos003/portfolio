"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "../../components/card";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function ProjectsClient({ repos, techStack }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSlide, setPageSlide] = useState(null);
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
    setPageSlide(null);
  }, [selectedTech]);

  function goToPage(page) {
    setPageSlide(page > currentPage ? "next" : "prev");
    setCurrentPage(page);
  }

  function toggleTech(tech) {
    setSelectedTech((prev) => {
      if (prev.includes(tech)) return prev.filter((t) => t !== tech);
      return [...prev, tech];
    });
  }

  return (
    <>
      <div
        className="projects-filters"
        role="group"
        aria-label="Filter projects by language"
      >
        <button
          type="button"
          className={`projects-chip ${selectedTech.length === 0 ? "is-active" : ""}`}
          aria-pressed={selectedTech.length === 0}
          onClick={() => setSelectedTech([])}
        >
          All
        </button>
        {techOptions.map((tech) => {
          const active = selectedTech.includes(tech);
          return (
            <button
              key={tech}
              type="button"
              className={`projects-chip ${active ? "is-active" : ""}`}
              aria-pressed={active}
              onClick={() => toggleTech(tech)}
            >
              {tech}
            </button>
          );
        })}
      </div>

      <div
        key={currentPage}
        className={`card-grid${pageSlide ? ` is-page-${pageSlide}` : ""}`}
      >
        {currentData.length > 0 ? (
          currentData.map((repo) => <Card key={repo.id} data={repo} />)
        ) : (
          <p className="projects-empty">
            No projects match the selected languages.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            onClick={() => goToPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ArrowLeft size={16} style={{ marginBottom: 0 }} />
          </button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </>
  );
}
