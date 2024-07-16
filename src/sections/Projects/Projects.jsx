"use client";

import { useEffect, useState } from 'react';
import './Projects.css';
import Card from '../../components/Card/Card';
import data from '../../data.json'

const Projects = () => {
    const [repos, setRepos] = useState([]);
    const [limit, setLimit] = useState(7);

    useEffect(() => {
        // Load repos from GitHub
        fetch('https://api.github.com/users/rodrigosantos003/repos')
            .then(res=>res.json())
            .then(repoData => {

                // Sort the data by created_at date
                const sortedData = repoData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setRepos(sortedData);
            })
            .catch((error) => {
                console.error("Error fetching repos: ", error);
        })
    }, [])

    const currentData = repos.slice(0, limit);

    const handleLoadMore = () => {
        setLimit(prevLimit => prevLimit * 2);
    };

    return (
        <section id='Projects'>
            <h1>Projects</h1>
            {currentData.length > 0 ? <>
            <div className='card-grid'>
                {currentData.map((repo) => (
                    !data.ignoredRepos.includes(repo.name) && (
                        <Card key={repo.id} data={repo} />
                    )
                ))}
            </div>
            {currentData.length < repos.length && (
                <div className='view-more-container'>
                    <button onClick={handleLoadMore} className='view-more'>
                        View More
                    </button>
                </div>
                )}
                </>

        : <p>No data available</p>}
        </section>
    );
}

export default Projects;
