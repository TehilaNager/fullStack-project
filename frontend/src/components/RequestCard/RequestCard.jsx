import { useState } from "react";
import "./request-card.css";

function RequestsCard({ request }) {
  const [expanded, setExpanded] = useState(false);

  const showReadMore = request.description.length > 100;

  const getQuantityLabel = (quantity) => {
    if (quantity === null) return "לא צוין";
    if (quantity === 1) return "אדם אחד";
    return `${quantity} אנשים`;
  };

  return (
    <div className="request-card">
      <div className="card-header">
        <h3 className="card-title">{request.title}</h3>

        <div className="tags">
          <span className="tag category">{request.category}</span>
          <span className={`tag priority ${request.priority}`}>
            {request.priority}
          </span>
          {request.status && (
            <span className="tag status">{request.status}</span>
          )}
        </div>
      </div>

      <div className="description-wrapper">
        <p className={`card-description ${expanded ? "expanded" : ""}`}>
          {request.description}
        </p>

        {showReadMore && (
          <button
            className="read-more-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "הצג פחות" : "קרא עוד"}
          </button>
        )}
      </div>

      <div className="card-info">
        <div className="info-item">
          <i className="bi bi-person-fill"></i> עבור:{" "}
          {getQuantityLabel(request.requiredQuantity)}
        </div>

        <div className="info-item">
          <i className="bi bi-geo-alt-fill"></i> אזור: {request.region}
        </div>
      </div>

      <a href={`/card-details/${request.id}`} className="details-btn">
        פרטי הבקשה
      </a>
    </div>
  );
}

export default RequestsCard;
