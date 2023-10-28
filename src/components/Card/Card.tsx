import React from 'react';
import './Card.css'

interface CardProps {
    imageUrl: string;
    title: string;
    content: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, content }) => {
    return (
        <div className="card">
            <img src={imageUrl} alt={`${title}`} />
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
}

export default Card;
