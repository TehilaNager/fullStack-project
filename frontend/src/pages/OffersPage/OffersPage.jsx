import { useState } from "react";
import "./offers-page.css";

const regions = ["צפון", "מרכז", "דרום"];
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

function OffersPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    region: "",
    city: "",
    status: "",
    category: "",
  });

  return (
    <div className="offers-page">
      <header className="offers-header">
        <h1 className="offers-title">תרומות מהקהילה</h1>
        <p className="offers-subtitle">
          תרומות זמינות מהקהילה עבור חיילים ומילואימניקים הזקוקים לסיוע
        </p>
        <button className="new-offer-btn">
          <i className="bi bi-plus"></i> צור תרומה חדשה
        </button>
      </header>
    </div>
  );
}

export default OffersPage;
