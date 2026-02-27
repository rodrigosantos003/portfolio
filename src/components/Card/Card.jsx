import "./Card.css";

const Card = ({ data }) => {
  const generateTitle = (name) => {
    const acronyms = new Set(["api", "cpd", "tsp", "lan", "tp"]);

    return name
      .split("-")
      .map((word) =>
        acronyms.has(word.toLowerCase())
          ? word.toUpperCase()
          : word.charAt(0).toUpperCase() + word.slice(1),
      )
      .join(" ");
  };

  const title = generateTitle(data.name);

  const openItem = () => {
    window.open(`https://github.com/rodrigosantos003/${data.name}`, "_blank");
  };

  return (
    <div
      className="card"
      onClick={openItem}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && openItem()}
    >
      <h2>{title}</h2>
      <p className="topics">
        {data.topics.map((topic, index) => (
          <span key={index}>{topic}</span>
        ))}
      </p>
      <p>{data.description}</p>
    </div>
  );
};

export default Card;
