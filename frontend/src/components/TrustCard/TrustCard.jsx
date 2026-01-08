import "./trust-card.css";

function TrustCard({ iconClass, title, text }) {
  return (
    <div className="trust-card">
      <div className="trust-card-header">
        <i className={`trust-icon ${iconClass}`}></i>
        <h3 className="trust-heading">{title}</h3>
      </div>
      <p className="trust-text">{text}</p>
    </div>
  );
}

export default TrustCard;
