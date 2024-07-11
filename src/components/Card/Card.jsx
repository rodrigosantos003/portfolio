import './Card.css'

const Card = ({ data }) => {
    const generateTitle = (name) => {
        let words = name.split('-')
        let result = ''

        words.forEach((word) => {
            if (word.length === 2 || word.length === 3)
                result += word.toUpperCase() + ' '
            else result += word.charAt(0).toUpperCase() + word.slice(1) + ' '
        })

        return result
    }

    const title = generateTitle(data.name)

    const openItem = () => {
        window.open(`https://github.com/rodrigosantos003/${data.name}`, '_blank')
    }

    return (
        <div className='card' onClick={openItem}>
            <h2>{title}</h2>
            <p className='topics'>{data.topics.map((topic, index) => {
                return <span key={index}>{topic}</span>
            })}
            </p>
            <p>{data.description}</p>
        </div>
    )
}

export default Card