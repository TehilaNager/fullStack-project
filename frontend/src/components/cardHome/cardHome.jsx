import { useState, useRef, useEffect } from "react";
import "./cardHome.css";
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

function CardHome({ title, category, description, city, priority, idCard }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      setShowReadMore(el.scrollHeight > el.clientHeight);
    }
  }, [description]);

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between mb-2">
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

        <p
          ref={descriptionRef}
          className="card-text text-muted flex-grow-1"
          style={{ maxHeight: "4.5em", overflow: "hidden" }}
        >
          {description}
        </p>

        {showReadMore && (
          <button
            className="btn btn-link p-0 text-warning fw-semibold mb-2"
            onClick={() => setIsModalOpen(true)}
          >
            קרא עוד
          </button>
        )}

        <div className="d-flex justify-content-between align-items-center mt-2">
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">תוכן הבקשה</h3>
            <p>{description}</p>
            <button
              className="close-modal"
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

export default CardHome;
