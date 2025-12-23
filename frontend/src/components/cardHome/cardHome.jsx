import { useState, useRef, useEffect } from "react";
import "./cardHome.css";

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

function CardHome({ title, category, description, city, priority }) {
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
    <div className="card">
      <div className="d-flex justify-content-between align-items-start">
        <h2 className="title">{title}</h2>
        <span className="category-label" style={categoryColors[category]}>
          {category}
        </span>
      </div>
      <p
        ref={descriptionRef}
        className={`description ${!showReadMore ? "with-spacing" : ""}`}
      >
        {description}
      </p>
      {showReadMore && (
        <button className="read-more" onClick={() => setIsModalOpen(true)}>
          קרא עוד
        </button>
      )}
      <div className="d-flex justify-content-between">
        <p className="city">📍{city}</p>
        {priority && (
          <p className="priority-label" style={priorityColors[priority]}>
            {priority}
          </p>
        )}
      </div>
      <button className="view-details-btn">
        צפייה בפרטים <i className="bi bi-arrow-left-short"></i>
      </button>

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
