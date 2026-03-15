"use client";

import { useState, useMemo } from "react";
import Card from "../../components/Card/Card";

export default function ProjectsClient({ repos }) {
  const [limit, setLimit] = useState(6);

  const currentData = useMemo(() => repos.slice(0, limit), [repos, limit]);
  const showLoadMore = currentData.length < repos.length;

  return (
    <>
      <div className="card-grid scrollable">
        {currentData.length > 0 ? (
          currentData.map((repo) => <Card key={repo.id} data={repo} />)
        ) : (
          <p>No data available</p>
        )}
      </div>
      {showLoadMore && (
        <div className="view-more-container">
          <button
            onClick={() => setLimit((prev) => prev * 2)}
            className="view-more"
          >
            View More
          </button>
        </div>
      )}
    </>
  );
}
