"use client";

import { useState, useMemo } from "react";
import "./Projects.css";
import Card from "../../components/Card/Card";
import { useQuery } from "@tanstack/react-query";
import data from "../../data.json";

const Projects = () => {
  const [limit, setLimit] = useState(6);

  const { data: repos, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch(
        "https://api.github.com/users/rodrigosantos003/repos",
      );

      const data = await res.json();

      const sortedData = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );

      return sortedData;
    },
    initialData: [],
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  const filteredRepos = useMemo(() => {
    return (repos ?? []).filter(
      (repo) => !data.ignoredRepos.includes(repo.name),
    );
  }, [repos]);

  const currentData = useMemo(() => {
    return filteredRepos.slice(0, limit);
  }, [filteredRepos, limit]);

  const showLoadMore = useMemo(() => {
    return currentData.length < filteredRepos.length;
  }, [currentData.length, filteredRepos.length]);

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit * 2);
  };

  const renderSkeletonCards = () => {
    return Array.from({ length: 6 }, (_, index) => (
      <div key={index} className="card skeleton-card">
        <div className="skeleton-title" />
        <div className="skeleton-topics" />
        <div className="skeleton-description" />
      </div>
    ));
  };

  return (
    <section id="Projects">
      <h1>Projects</h1>
      <div className="card-grid scrollable">
        {isLoading ? (
          renderSkeletonCards()
        ) : currentData.length > 0 ? (
          currentData.map((repo) => <Card key={repo.id} data={repo} />)
        ) : (
          <p>No data available</p>
        )}
      </div>
      {!isLoading && showLoadMore && (
        <div className="view-more-container">
          <button onClick={handleLoadMore} className="view-more">
            View More
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
