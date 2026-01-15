import { useState } from "react";
import "./requests-page.css";

const regions = ["צפון", "מרכז", "דרום"];
const priorities = ["נמוכה", "בינונית", "גבוהה", "דחופה"];
const statuses = ["פתוחה", "בטיפול", "הושלמה"];
const categories = [
  "ציוד צבאי",
  "ביגוד",
  "מזון",
  "תחבורה",
  "ציוד אלקטרוני",
  "ספרים וחומרי לימוד",
  "ציוד רפואי",
  "תמיכה נפשית וחברתית",
  "אחר",
];

function RequestsPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    region: "",
    city: "",
    priority: "",
    status: "",
    category: "",
  });

  return (
    <div className="requests-page">
      <header className="requests-header">
        <h1 className="requests-title">בקשות מחיילים ומילואימניקים</h1>
        <p className="requests-subtitle">
          עזרו ללוחמים שלנו למצוא את מה שהם צריכים
        </p>
        <button className="new-request-btn">
          <i className="bi bi-plus"></i> צור בקשה חדשה
        </button>
      </header>
    </div>
  );
}

export default RequestsPage;
