"use client"

import { useEffect, useState } from 'react'
import './Projects.css'
import Card from '@/components/Card/Card';

interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    owner: {
        login: string;
        id: number;
        avatar_url: string;
    };
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    language: string;
}


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

    //Upta
    useEffect(() => {
        setCurrentData(repos.slice(0, limit));
    }, [limit]);

    const handleLoadMore = () => {
        setLimit(limit * 2);
    }

    const transformText = (text: string) => {
        let words = text.split("-");
        let result = "";

        words.forEach((word) => {
            if (word.length == 2 || word.length == 3)
                result += word.toUpperCase() + " ";
            else result += word.charAt(0).toUpperCase() + word.slice(1) + " ";
        });

        return result;
    }

    const imageExists = (imagePath: string) => {
        const http = new XMLHttpRequest();
        http.open('HEAD', imagePath, false);
        http.send();
        return http.status !== 404;
    }


    return <section id="Projects">
        <h1>Projects</h1>

        <div className="card-grid">
            {currentData.map((repo, index) => {
                const projectsImages = '../../../projects';
                const imagePath = `${projectsImages}/${repo.name}.png`;
                const defaultPath = `${projectsImages}/default.png`;

                return (
                    repo.name != "rodrigosantos003" &&
                    <Card
                        title={transformText(repo.name)}
                        content={repo.description}
                        key={`${repo}_${index}`}
                        imageUrl={imageExists(imagePath) ? imagePath : defaultPath}
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