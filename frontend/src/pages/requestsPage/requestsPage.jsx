import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import "./requests-page.css";
import { useRequest } from "../../context/RequestContext";
import FilterGroup from "../../components/FilterGroup/FilterGroup";
import { filterGroups } from "../../helpers/requestsFiltersData";
import {
  toggleFilter as handleToggleFilter,
  clearFilters as handleClearFilters,
  filterRequests,
  countActiveFilters,
} from "../../helpers/requestsFiltersLogic";
import RequestsCards from "../../components/RequestCard/RequestCard";
import RequestsTable from "../../components/RequestsTable/RequestsTable";

function RequestsPage() {
  const navigate = useNavigate();
  const { requests } = useRequest();
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("cards");
  const [quantityOption, setQuantityOption] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");
  const [includeUnknownQuantity, setIncludeUnknownQuantity] = useState(true);
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
    () =>
      filterRequests(
        requests,
        search,
        filters,
        quantityOption,
        minQuantity,
        maxQuantity,
        includeUnknownQuantity
      ),
    [
      requests,
      search,
      filters,
      quantityOption,
      minQuantity,
      maxQuantity,
      includeUnknownQuantity,
    ]
  );

  const toggleFilter = (type, value) =>
    setFilters((prev) => handleToggleFilter(prev, type, value));

  const clearFilters = () => {
    setFilters(handleClearFilters());
    setQuantityOption("");
    setMinQuantity("");
    setMaxQuantity("");
    setIncludeUnknownQuantity(true);
  };

  const resultsCount = filteredRequests.length;

  const hasActiveFilters =
    activeFiltersCount > 0 ||
    search.trim() !== "" ||
    quantityOption !== "" ||
    minQuantity !== "" ||
    maxQuantity !== "";

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
        <div className="cards-container">
          {filteredRequests.map((req) => (
            <RequestsCards key={req._id} request={req} />
          ))}
        </div>
      ) : (
        <RequestsTable
          requests={filteredRequests}
          onRowClick={(id) => navigate(`/requests/${id}`)}
        />
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

            <div className="filter-group">
              <p className="filter-title">מספר האנשים הזקוקים לעזרה:</p>
              <select
                value={quantityOption}
                onChange={(e) => setQuantityOption(e.target.value)}
                className="filter-select"
              >
                <option value="">בחר</option>
                <option value="1">אדם אחד</option>
                <option value="5">עד 5 אנשים</option>
                <option value="10">עד 10 אנשים</option>
                <option value="20">עד 20 אנשים</option>
                <option value="50">עד 50 אנשים</option>
                <option
                  value="range"
                  title="ניתן להכניס מספר מינימום ומקסימום כדי לקבל סינון מדויק"
                >
                  בחר טווח מספרים
                </option>
              </select>

              {quantityOption === "range" && (
                <div className="quantity-range-inputs">
                  <input
                    type="number"
                    min="1"
                    placeholder="מ…"
                    value={minQuantity}
                    onChange={(e) => setMinQuantity(e.target.value)}
                    className="filter-input-number"
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="עד…"
                    value={maxQuantity}
                    onChange={(e) => setMaxQuantity(e.target.value)}
                    className="filter-input-number"
                  />
                </div>
              )}

              <div className="unknown-quantity-checkbox">
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={includeUnknownQuantity}
                    onChange={(e) =>
                      setIncludeUnknownQuantity(e.target.checked)
                    }
                  />
                  כלול בקשות בלי ציון מספר אנשים
                </label>
              </div>
            </div>

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
