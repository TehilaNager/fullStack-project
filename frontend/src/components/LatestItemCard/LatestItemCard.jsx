import { useState } from "react";
import "./latest-item-card.css";
import { Link } from "react-router";

const priorityColors = {
  נמוכה: {
    background: "#edfaf4ff",
    color: "#0f5132",
    border: "1px solid #0f5132",
  },
  בינונית: {
    background: "#eefcffff",
    color: "#055160",
    border: "1px solid #055160",
  },
  גבוהה: {
    background: "#fffdf5ff",
    color: "#664d03",
    border: "1px solid #664d03",
  },
  דחופה: {
    background: "#fff3f4ff",
    color: "#842029",
    border: "1px solid #842029",
  },
};

const categoryColors = {
  "ציוד צבאי": { background: "#e7f1ff", color: "#003366" },
  ביגוד: { background: "#f9e7ff", color: "#4b0082" },
  מזון: { background: "#e6ffed", color: "#0f5132" },
  תחבורה: { background: "#fff7e6", color: "#664d03" },
  "ציוד אלקטרוני": { background: "#f0f0f0", color: "#333" },
  "ספרים וחומרי לימוד": { background: "#ffe7e7", color: "#842029" },
  "ציוד רפואי": { background: "#e7f9ff", color: "#055160" },
  "תמיכה נפשית וחברתית": { background: "#fff0e7", color: "#664d03" },
  אחר: { background: "#f5f5f5", color: "#333" },
};

function LatestItemCard({
  title,
  updatedAt,
  category,
  description,
  city,
  priority,
  idCard,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTruncated = description.split(" ").length > 20;

  return (
    <div className="card">
      <div className="card-body d-flex flex-column">
        <div className="card-badges">
          <span className="badge" style={categoryColors[category]}>
            {category}
          </span>
          {priority && (
            <span className="badge" style={priorityColors[priority]}>
              {priority}
            </span>
          )}
        </div>
        <h5 className="card-title fw-bold">{title}</h5>
        <small className="card-updated">
          עודכן:{" "}
          {(() => {
            const d = new Date(updatedAt);
            const day = String(d.getDate()).padStart(2, "0");
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
          })()}
        </small>
        <p className="card-text">{description}</p>

        <div className="read-more-wrapper">
          {isTruncated && (
            <span
              className="read-more-inline"
              onClick={() => setIsModalOpen(true)}
            >
              קרא עוד
            </span>
          )}
        </div>

        <div className="card-footer mt-auto d-flex justify-content-between align-items-center">
          <small className="text-muted">📍 {city}</small>
          <Link
            to={`/card-details/${idCard}`}
            className="btn btn-outline-dark btn-sm"
          >
            צפייה בפרטים
          </Link>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="modal-title">תוכן הבקשה</h3>
            <p>{description}</p>
            <button
              className="close-modal-popup"
              onClick={() => setIsModalOpen(false)}
            >
              סגור
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LatestItemCard;
