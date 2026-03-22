"use client";

import { useState, useMemo } from "react";
import Card from "../../components/Card/Card";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function ProjectsClient({ repos }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(repos.length / ITEMS_PER_PAGE);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return repos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [repos, currentPage]);

  return (
    <>
      <div className="card-grid">
        {currentData.length > 0 ? (
          currentData.map((repo) => <Card key={repo.id} data={repo} />)
        ) : (
          <p>No data available</p>
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
