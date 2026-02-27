"use client";

import { useEffect, useState, useMemo } from "react";
import "./Projects.css";
import Card from "../../components/Card/Card";
import data from "../../data.json";

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load repos from GitHub
    fetch("https://api.github.com/users/rodrigosantos003/repos")
      .then((res) => res.json())
      .then((repoData) => {
        const sortedData = repoData.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        setRepos(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching repos: ", error);
        setLoading(false);
      });
  }, []);

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => !data.ignoredRepos.includes(repo.name));
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
        {loading ? (
          renderSkeletonCards()
        ) : currentData.length > 0 ? (
          currentData.map((repo) => <Card key={repo.id} data={repo} />)
        ) : (
          <p>No data available</p>
        )}
      </div>
      {!loading && showLoadMore && (
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
