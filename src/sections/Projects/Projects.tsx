import { useEffect, useState } from 'react';
import './Projects.css';
import Card from '../../components/Card/Card';
import { GitHubRepo } from '../../data/IGitHubRepo';
import { ProjectsPageStrings } from '../../data/PageStrings';

interface ProjectProps {
    pageStrings: ProjectsPageStrings;
}

const Projects = ({ pageStrings }: ProjectProps) => {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [limit, setLimit] = useState(6);
    const [currentData, setCurrentData] = useState<GitHubRepo[]>([]);

    const fetchGitHubRepos = async () => {
        try {
            const response = await fetch('https://api.github.com/users/rodrigosantos003/repos', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setRepos(data);
            setCurrentData(data.slice(0, limit));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchGitHubRepos();

        // Clean up
        return () => {
            setRepos([]);
        };
    }, []);

    useEffect(() => {
        setCurrentData(repos.slice(0, limit));

        // Clean up
        return () => {
            setCurrentData([]);
        };

    }, [limit, repos]);

    const handleLoadMore = () => {
        setLimit(prevLimit => prevLimit * 2);
    };

    return (
        <section id={pageStrings.title}>
            <h1>{pageStrings.title}</h1>

            <div className='card-grid'>
                {currentData.map((repo) => {
                    if (repo.name !== 'rodrigosantos003') {
                        return (
                            <Card
                                key={repo.id}
                                data={repo}
                            />
                        );
                    }
                    return null;
                })}
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