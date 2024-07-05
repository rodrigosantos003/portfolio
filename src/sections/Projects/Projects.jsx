"use client";

import { useCallback, useEffect, useState } from 'react';
import './Projects.css';
import Card from '../../components/Card/Card';
import ignoredRepos from '@/data/ignored_repos.json'

const Projects = ({ pageStrings }) => {
    const [repos, setRepos] = useState([]);
    const [limit, setLimit] = useState(7);

    const fetchGitHubRepos = useCallback(async () => {
        try {
            const response = await fetch('https://api.github.com/users/rodrigosantos003/repos');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            // Sort the data by created_at date
            const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setRepos(sortedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        fetchGitHubRepos();
    }, [fetchGitHubRepos]);

    const currentData = repos.slice(0, limit);

    const handleLoadMore = () => {
        setLimit(prevLimit => prevLimit * 2);
    };

    return (
        <section id={pageStrings.title}>
            <h1>{pageStrings.title}</h1>
            <div className='card-grid'>
                {currentData.map((repo) => (
                    !ignoredRepos.repos.includes(repo.name) && (
                        <Card key={repo.id} data={repo} />
                    )
                ))}
            </div>
            {currentData.length < repos.length && (
                <div className='view-more-container'>
                    <button onClick={handleLoadMore} className='view-more'>
                        {pageStrings.viewMore}
                    </button>
                </div>
            )}
        </section>
    );
}

export default Projects;
