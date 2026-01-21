import { useState, useMemo } from "react";
import "./requests-page.css";
import { useRequest } from "../../context/RequestContext";
import FilterGroup from "../../components/FilterGroup/FilterGroup";
import { filterGroups } from "../../helpers/filtersData";
import {
  toggleFilter as handleToggleFilter,
  clearFilters as handleClearFilters,
  filterRequests,
  countActiveFilters,
} from "../../helpers/filtersLogic";
import { useNavigate } from "react-router";

function RequestsPage() {
  const navigate = useNavigate();
  const { requests } = useRequest();
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("cards");
  const [filters, setFilters] = useState({
    region: [],
    priority: [],
    status: [],
    category: [],
  });

  const activeFiltersCount = useMemo(
    () => countActiveFilters(filters),
    [filters]
  );

  const filteredRequests = useMemo(
    () => filterRequests(requests, search, filters),
    [requests, search, filters]
  );

  const toggleFilter = (type, value) =>
    setFilters((prev) => handleToggleFilter(prev, type, value));

  const clearFilters = () => setFilters(handleClearFilters());

  const resultsCount = filteredRequests.length;

  const hasActiveFilters = activeFiltersCount > 0 || search.trim() !== "";

  return (
    <div className="requests-page">
      <header className="requests-header">
        <h1 className="requests-title">בקשות מחיילים ומילואימניקים</h1>
        <p className="requests-subtitle">
          עזרו ללוחמים שלנו למצוא את מה שהם צריכים
        </p>
      </header>

      <div className="requests-toolbar">
        <button
          className="open-filters-btn"
          onClick={() => setIsFilterOpen(true)}
        >
          <i className="bi bi-funnel"></i>
          סינון
          {activeFiltersCount > 0 && (
            <span className="filters-count">({activeFiltersCount})</span>
          )}
        </button>

        <div className="view-controls">
          <button
            className={`view-btn ${viewMode === "cards" ? "active" : ""}`}
            onClick={() => setViewMode("cards")}
            title="תצוגת כרטיסים"
          >
            <i className="bi bi-grid-3x3-gap-fill"></i>
          </button>

          <button
            className={`view-btn ${viewMode === "table" ? "active" : ""}`}
            onClick={() => setViewMode("table")}
            title="תצוגת טבלה"
          >
            <i className="bi bi-list"></i>
          </button>
        </div>

        <div className="search-field">
          <input
            type="text"
            className="search-input with-icon"
            placeholder="חיפוש לפי כותרת, תיאור או עיר..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="bi bi-search search-icon"></i>
        </div>
      </div>

      <div className="results-count">
        נמצאו <span className="countRequests">{resultsCount}</span> בקשות
      </div>

      {/* --- רינדור הבקשות --- */}
      {resultsCount === 0 ? (
        <div className="no-results">
          <i className="no-results-icon bi bi-search"></i>
          <p className="no-results-title">
            {hasActiveFilters ? "לא נמצאו בקשות עם הסינון הנוכחי" : "אין בקשות"}
          </p>

          <p className="no-results-text">
            {hasActiveFilters
              ? "נסו להסיר סינונים או לשנות את החיפוש"
              : "כאן יוצגו בקשות ברגע שיועלו למערכת"}
          </p>

          {hasActiveFilters ? (
            <button
              className="no-results-btn"
              onClick={() => {
                clearFilters();
                setSearch("");
              }}
            >
              נקה סינון
            </button>
          ) : (
            <button
              className="no-results-btn"
              onClick={() => navigate("/create-request")}
            >
              צור בקשה חדשה
            </button>
          )}
        </div>
      ) : viewMode === "cards" ? (
        <div className="requests-list cards">
          {filteredRequests.map((req) => (
            <article key={req.id} className="request-card">
              <header className="card-header">
                <h3 className="card-title">{req.title}</h3>

                <div className="card-badges">
                  <span className={`badge priority ${req.priority}`}>
                    {req.priority}
                  </span>
                  <span className="badge category">{req.category}</span>
                </div>
              </header>

              <p className="card-description">{req.description}</p>

              <div className="card-meta">
                <div className="meta-item">
                  <i className="bi bi-geo-alt"></i>
                  {req.city}
                </div>

                <div className="meta-item">
                  <i className="bi bi-person"></i>
                  {req.unit}
                </div>

                <div className="meta-item">
                  <i className="bi bi-clock"></i>
                  {req.createdAt}
                </div>
              </div>

              <button className="card-action-btn">
                צור קשר לעזרה
                <i className="bi bi-chat-dots"></i>
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div>table</div>
      )}

      <button
        className="create-request-btn"
        onClick={() => navigate("/create-request")}
      >
        <span className="plus-icon">+</span>
        <span className="btn-text">צור בקשה חדשה</span>
      </button>

      {isFilterOpen && (
        <div className="filters-overlay" onClick={() => setIsFilterOpen(false)}>
          <aside
            className="filters-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <h3>סינון</h3>
              <button
                className="close-drawer"
                onClick={() => setIsFilterOpen(false)}
              >
                ✕
              </button>
            </div>

            {filterGroups.map(({ title, options, key }) => (
              <FilterGroup
                key={key}
                title={title}
                options={options}
                selected={filters[key]}
                onToggle={(v) => toggleFilter(key, v)}
              />
            ))}

            <button className="clear-filters-btn" onClick={clearFilters}>
              נקה סינון
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

export default RequestsPage;
