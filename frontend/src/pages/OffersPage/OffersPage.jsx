import { useEffect, useMemo, useState } from "react";
import "./offers-page.css";
import { useAuth } from "../../context/AuthContext";
import { useOffer } from "../../context/OfferContext";
import { filterGroups } from "../../helpers/offersFiltersData";
import {
  toggleFilter as handleToggleFilter,
  clearFilters as handleClearFilters,
  filterOffers,
  countActiveFilters,
} from "../../helpers/offersFiltersLogic";
import { useNavigate } from "react-router";
import FilterGroup from "../../components/FilterGroup/FilterGroup";
import OfferCard from "../../components/OfferCard/OfferCard";
import OffersTable from "../../components/OffersTable/OffersTable";
import Toolbar from "../../components/Toolbar/Toolbar";

function OffersPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { offers } = useOffer();
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("cards");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);
  const [quantityOption, setQuantityOption] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");
  const [includeUnknownQuantity, setIncludeUnknownQuantity] = useState(true);
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const [filters, setFilters] = useState({
    region: [],
    status: [],
    category: [],
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 650;
      setIsMobile(mobile);

      if (mobile) setViewMode("cards");
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeFiltersCount = useMemo(
    () => countActiveFilters(filters) + (showOnlyMine ? 1 : 0),
    [filters, showOnlyMine],
  );

  const filteredOffers = useMemo(
    () =>
      filterOffers(
        offers,
        search,
        filters,
        quantityOption,
        minQuantity,
        maxQuantity,
        includeUnknownQuantity,
      ).filter((offer) => !showOnlyMine || offer.supporter === user._id),
    [
      offers,
      search,
      filters,
      quantityOption,
      minQuantity,
      maxQuantity,
      includeUnknownQuantity,
      showOnlyMine,
      user._id,
    ],
  );

  const toggleFilter = (type, value) =>
    setFilters((prev) => handleToggleFilter(prev, type, value));

  const clearFilters = () => {
    setFilters(handleClearFilters());
    setQuantityOption("");
    setMinQuantity("");
    setMaxQuantity("");
    setIncludeUnknownQuantity(true);
    setShowOnlyMine(false);
  };

  const resultsCount = filteredOffers.length;

  const hasActiveFilters =
    activeFiltersCount > 0 ||
    search.trim() !== "" ||
    quantityOption !== "" ||
    minQuantity !== "" ||
    maxQuantity !== "";

  return (
    <div className="offers-page">
      <header className="offers-header">
        <h1 className="offers-title">תרומות לחיילים ומילואימניקים</h1>
        <p className="offers-subtitle">
          עזרו ללוחמים שלנו למצוא את מה שהם צריכים
        </p>
      </header>

      <Toolbar
        search={search}
        onSearchChange={setSearch}
        activeFiltersCount={activeFiltersCount}
        onOpenFilters={() => setIsFilterOpen(true)}
        viewMode={viewMode}
        onViewModeChange={(mode) => {
          if (!isMobile) setViewMode(mode);
        }}
      />

      <div className="offers-results-count">
        נמצאו <span className="count-offers">{resultsCount}</span> תרומות
      </div>

      {resultsCount === 0 ? (
        <div className="no-results">
          <i className="no-results-icon bi bi-search"></i>

          <p className="no-results-title">
            {hasActiveFilters
              ? "לא נמצאו תרומות עם הסינון הנוכחי"
              : "אין תרומות"}
          </p>

          <p className="no-results-text">
            {hasActiveFilters
              ? "נסו להסיר סינונים או לשנות את החיפוש"
              : "כאן יוצגו תרומות ברגע שיועלו למערכת"}
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
              onClick={() => navigate("/create-offer")}
            >
              צור תרומה חדשה
            </button>
          )}
        </div>
      ) : viewMode === "cards" ? (
        <div className="cards-container">
          {filteredOffers.map((offer) => (
            <OfferCard key={offer._id} offer={offer} search={search} />
          ))}
        </div>
      ) : (
        <OffersTable
          offers={filteredOffers}
          onRowClick={(id) => navigate(`/offers/${id}`)}
          search={search}
        />
      )}

      <button
        className="create-offer-btn"
        onClick={() => navigate("/create-offer")}
      >
        <span className="plus-icon">+</span>
        <span className="btn-text">צור תרומה חדשה</span>
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
              <p className="filter-title">לכמה אנשים התרומה מיועדת:</p>
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
                  כלול תרומות בלי ציון מספר אנשים
                </label>
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={showOnlyMine}
                  onChange={(e) => setShowOnlyMine(e.target.checked)}
                />
                הצג רק את התרומות שלי
              </label>
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

export default OffersPage;
