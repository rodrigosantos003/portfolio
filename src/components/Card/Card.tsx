import React from 'react';
import './Card.css';

interface CardProps {
    imageUrl: string;
    title: string;
    content: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, content }) => {
    const defaultPath = '../../../projects/default.png';

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        // Display the default image if the image fails to load
        event.currentTarget.src = defaultPath;
    };

    return (
        <div className="card">
            <img src={imageUrl} alt={title} onError={handleImageError} />
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
};

export default Card;
