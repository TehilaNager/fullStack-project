import "./helpCard.css";

function HelpCard({ title, items = [], text }) {
  return (
    <div className="help-card">
      <h3 className="help-card-title">{title}</h3>
      <ul className="help-card-list">
        {items.map((item, index) => (
          <li key={index} className="help-card-item">
            {item}
          </li>
        ))}
      </ul>
      <p className="help-card-text">{text} </p>
    </div>
  );
}

export default HelpCard;
