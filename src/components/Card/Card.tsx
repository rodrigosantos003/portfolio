import React from 'react';
import './Card.css';
import { GitHubRepo } from '@/data/IGitHubRepo';

interface CardProps {
    data: GitHubRepo;
}

const Card: React.FC<CardProps> = ({ data }) => {
    const defaultPath = '../../../projects/default.webp';
    const imagePath = `../../../projects/${data.name}.webp`;

    const generateTitle = (name: string) => {
        let words = name.split("-");
        let result = "";

        words.forEach((word) => {
            if (word.length == 2 || word.length == 3)
                result += word.toUpperCase() + " ";
            else result += word.charAt(0).toUpperCase() + word.slice(1) + " ";
        });

        return result;
    }

    const title = generateTitle(data.name);

    // Display the default image if the image fails to load
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.src = defaultPath;
    };

    const openItem = () => {
        window.open(`https://github.com/rodrigosantos003/${data.name}`, '_blank');
    }

    return (
        <div className="card" onClick={openItem}>
            <img src={imagePath} alt={title} onError={handleImageError} />
            <h2>{title}</h2>
            <p>{data.description}</p>
        </div>
    );
};

export default Card;
