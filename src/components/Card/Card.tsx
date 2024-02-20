import { useState } from 'react';
import './Card.css';
import { GitHubRepo } from '../../data/IGitHubRepo';

interface CardProps {
    data: GitHubRepo
}

const Card = ({ data }: CardProps) => {
    const [imagePath, setImagePath] = useState(`../../../projects/${data.name}.webp`)

    const generateTitle = (name: string) => {
        let words = name.split('-')
        let result = ''

        words.forEach((word) => {
            if (word.length == 2 || word.length == 3)
                result += word.toUpperCase() + ' '
            else result += word.charAt(0).toUpperCase() + word.slice(1) + ' '
        })

        return result
    }

    const title = generateTitle(data.name)

    // Display the default image if the image fails to load
    const handleImageError = () => {
        const defaultPath = '/projects/default.webp'
        setImagePath(defaultPath)
    }

    const openItem = () => {
        window.open(`https://github.com/rodrigosantos003/${data.name}`, '_blank')
    }

    return (
        <div className='card' onClick={openItem}>
            <img
                src={imagePath}
                width={250}
                height={150}
                alt={title}
                style={{ borderRadius: '8px', height: 'auto' }}
                onError={handleImageError}
            />
            <h2>{title}</h2>
            <p>{data.description}</p>
        </div>
    )
}

export default Card
