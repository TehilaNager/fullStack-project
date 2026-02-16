import "./toolbar.css";

function Toolbar({
  search,
  onSearchChange,
  activeFiltersCount,
  onOpenFilters,
  viewMode,
  onViewModeChange,
}) {
  return (
    <div className="toolbar">
      <button className="open-filters-btn" onClick={onOpenFilters}>
        <i className="bi bi-funnel"></i> סינון
        {activeFiltersCount > 0 && (
          <span className="filters-count">({activeFiltersCount})</span>
        )}
      </button>

      <div className="view-controls">
        <button
          className={`view-btn ${viewMode === "cards" ? "active" : ""}`}
          onClick={() => onViewModeChange("cards")}
          title="תצוגת כרטיסים"
        >
          <i className="bi bi-grid-3x3-gap-fill"></i>
        </button>

        <button
          className={`view-btn ${viewMode === "table" ? "active" : ""}`}
          onClick={() => onViewModeChange("table")}
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
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <i className="bi bi-search search-icon"></i>
      </div>
    </div>
  );
}

export default Toolbar;
