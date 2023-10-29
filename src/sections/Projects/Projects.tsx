"use client"

import { useEffect, useState } from 'react'
import './Projects.css'
import Card from '@/components/Card/Card';
import { GitHubRepo } from '@/data/IGitHubRepo';

export default function Projects() {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [limit, setLimit] = useState(6);
    const [currentData, setCurrentData] = useState<GitHubRepo[]>([]);

    useEffect(() => {
        fetch('https://api.github.com/users/rodrigosantos003/repos', {
            method: 'GET',
        }).then(response => response.json())
            .then(data => {
                if (data.message) console.error(`Error: ${data.message}`)
                else {
                    setRepos(data);
                    setCurrentData(data.slice(0, limit));
                }
            })
            .catch(error => console.error("Error: ", error));
    }, [])

    //Uptate current data when the "View More" button is clicked
    useEffect(() => {
        setCurrentData(repos.slice(0, limit));
    }, [limit]);

    const handleLoadMore = () => {
        setLimit(limit * 2);
    }

    return <section id="Projects">
        <h1>Projects</h1>

        <div className="card-grid">
            {currentData.map((repo, index) => {
                return (
                    repo.name != "rodrigosantos003" &&
                    <Card
                        key={`${repo}_${index}`}
                        data={repo}
                    />
                );
            })}
        </div>

        <div className="view-more-container">
            {currentData.length < repos.length && (
                <button onClick={handleLoadMore} className='view-more'>View More</button>
            )}
        </div>

    </section>
}