import { useEffect, useState } from "react";
import "./favorites-page.css";
import { useFavorites } from "../../context/FavoritesContext";
import OfferCard from "../../components/OfferCard/OfferCard";
import RequestCard from "../../components/RequestCard/RequestCard";
import FavoritesEmptyActions from "../../components/FavoritesEmptyActions/FavoritesEmptyActions";
import Toolbar from "../../components/Toolbar/Toolbar";
import {
  filterOffers,
  countActiveFilters as countOfferFilters,
} from "../../helpers/offersFiltersLogic";
import {
  filterRequests,
  countActiveFilters as countRequestFilters,
} from "../../helpers/requestsFiltersLogic";

import { filterGroups as offersFilterGroups } from "../../helpers/offersFiltersData";
import { filterGroups as requestsFilterGroups } from "../../helpers/requestsFiltersData";

import { toggleFilter as handleToggleOfferFilter } from "../../helpers/offersFiltersLogic";

import { toggleFilter as handleToggleRequestFilter } from "../../helpers/requestsFiltersLogic";
import FilterGroup from "../../components/FilterGroup/FilterGroup";
import NoResults from "../../components/NoResults/NoResults";
import OffersTable from "../../components/OffersTable/OffersTable";
import RequestsTable from "../../components/RequestsTable/RequestsTable";
import { useNavigate } from "react-router";

function FavoritesPage() {
  const navigate = useNavigate();
  const { favoriteOffers, favoriteRequests, loadFavorites, loadingFavorites } =
    useFavorites();
  const [viewMode, setViewMode] = useState("cards");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);
  const [activeTab, setActiveTab] = useState("all");
  const [innerTab, setInnerTab] = useState("offers");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [allSearch, setAllSearch] = useState("");
  const [offerSearch, setOfferSearch] = useState("");
  const [requestSearch, setRequestSearch] = useState("");
  const [offerFilters, setOfferFilters] = useState({
    region: [],
    status: [],
    category: [],
  });
  const [requestFilters, setRequestFilters] = useState({
    region: [],
    priority: [],
    status: [],
    category: [],
  });

  useEffect(() => {
    loadFavorites();
  }, []);

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

  if (loadingFavorites) {
    return <div className="favorites-loading">טוען מועדפים...</div>;
  }

  const filteredOffers = filterOffers(
    favoriteOffers,
    activeTab === "all" ? allSearch : offerSearch,
    offerFilters,
  );

  const filteredRequests = filterRequests(
    favoriteRequests,
    activeTab === "all" ? allSearch : requestSearch,
    requestFilters,
  );

  const offersCount = favoriteOffers.length;
  const requestsCount = favoriteRequests.length;
  const totalCount = offersCount + requestsCount;

  const currentFiltersCount =
    activeTab === "offers"
      ? countOfferFilters(offerFilters)
      : activeTab === "requests"
        ? countRequestFilters(requestFilters)
        : innerTab === "offers"
          ? countOfferFilters(offerFilters)
          : countRequestFilters(requestFilters);

  return (
    <div className="favorites-page">
      <header className="favorites-header">
        <h1 className="favorites-title">המועדפים שלי</h1>
        <p className="favorites-subtitle">
          כאן מרוכזות התרומות והבקשות שסומנו כמועדפות
        </p>
      </header>

      <Toolbar
        search={
          activeTab === "all"
            ? allSearch
            : activeTab === "offers"
              ? offerSearch
              : requestSearch
        }
        onSearchChange={(value) => {
          if (activeTab === "all") setAllSearch(value);
          else if (activeTab === "offers") setOfferSearch(value);
          else setRequestSearch(value);
        }}
        activeFiltersCount={currentFiltersCount}
        onOpenFilters={() => setIsFilterOpen(true)}
        viewMode={viewMode}
        onViewModeChange={(mode) => {
          if (!isMobile) setViewMode(mode);
        }}
      />

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

            {(activeTab === "offers" ||
              (activeTab === "all" && innerTab === "offers")) && (
              <>
                {offersFilterGroups.map(({ title, options, key }) => (
                  <FilterGroup
                    key={key}
                    title={title}
                    options={options}
                    selected={offerFilters[key]}
                    onToggle={(v) =>
                      setOfferFilters((prev) =>
                        handleToggleOfferFilter(prev, key, v),
                      )
                    }
                  />
                ))}
              </>
            )}

            {(activeTab === "requests" ||
              (activeTab === "all" && innerTab === "requests")) && (
              <>
                {requestsFilterGroups.map(({ title, options, key }) => (
                  <FilterGroup
                    key={key}
                    title={title}
                    options={options}
                    selected={requestFilters[key]}
                    onToggle={(v) =>
                      setRequestFilters((prev) =>
                        handleToggleRequestFilter(prev, key, v),
                      )
                    }
                  />
                ))}
              </>
            )}

            <button
              className="clear-filters-btn"
              onClick={() => {
                setOfferFilters({ region: [], status: [], category: [] });
                setRequestFilters({
                  region: [],
                  priority: [],
                  status: [],
                  category: [],
                });
              }}
            >
              נקה סינון
            </button>
          </aside>
        </div>
      )}

      <div className="favorites-tabs">
        <button
          className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          הכל ({totalCount})
        </button>

        <button
          className={`tab-btn ${activeTab === "offers" ? "active" : ""}`}
          onClick={() => setActiveTab("offers")}
        >
          תרומות ({offersCount})
        </button>

        <button
          className={`tab-btn ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          בקשות ({requestsCount})
        </button>
      </div>

      {activeTab === "all" && (
        <>
          {totalCount === 0 ? (
            <div className="empty-text">
              <p>
                עדיין לא נוספו פריטים למועדפים.
                <br />
                ניתן להוסיף תרומות ובקשות למועדפים באמצעות לחיצה על סמל הלב
                המופיע על כרטיס התרומה או כרטיס הבקשה.
              </p>

              <FavoritesEmptyActions showOffers showRequests />
            </div>
          ) : (
            <>
              <div className="favorites-inner-tabs">
                <button
                  className={`inner-tab-btn ${
                    innerTab === "offers" ? "active" : ""
                  }`}
                  onClick={() => setInnerTab("offers")}
                >
                  תרומות ({offersCount})
                </button>
                <button
                  className={`inner-tab-btn ${
                    innerTab === "requests" ? "active" : ""
                  }`}
                  onClick={() => setInnerTab("requests")}
                >
                  בקשות ({requestsCount})
                </button>
              </div>

              <div className="favorites-inner-tab-content">
                {innerTab === "offers" && (
                  <>
                    {offersCount === 0 ? (
                      <div className="empty-text">
                        <p>לא סימנת עדיין תרומות כמועדפות</p>
                        <FavoritesEmptyActions showOffers />
                      </div>
                    ) : filteredOffers.length === 0 ? (
                      <NoResults
                        message="לא נמצאו תרומות בהתאם לחיפוש או לסינון שבחרת."
                        onClear={() => {
                          setOfferFilters({
                            region: [],
                            status: [],
                            category: [],
                          });
                          setAllSearch("");
                        }}
                      />
                    ) : viewMode === "cards" ? (
                      <div className="favorites-grid">
                        {filteredOffers.map((offer) => (
                          <OfferCard
                            key={offer._id}
                            offer={offer}
                            isFavoritePage
                            search={offerSearch}
                          />
                        ))}
                      </div>
                    ) : (
                      <OffersTable
                        offers={filteredOffers}
                        search={offerSearch}
                        onRowClick={(id) => navigate(`/offers/${id}`)}
                        isFavoritePage
                      />
                    )}
                  </>
                )}

                {innerTab === "requests" && (
                  <>
                    {requestsCount === 0 ? (
                      <div className="empty-text">
                        <p>לא סימנת עדיין בקשות כמועדפות</p>
                        <FavoritesEmptyActions showRequests />
                      </div>
                    ) : filteredRequests.length === 0 ? (
                      <NoResults
                        message="לא נמצאו בקשות בהתאם לחיפוש או לסינון שבחרת."
                        onClear={() => {
                          setRequestFilters({
                            region: [],
                            priority: [],
                            status: [],
                            category: [],
                          });
                          setAllSearch("");
                        }}
                      />
                    ) : viewMode === "cards" ? (
                      <div className="favorites-grid">
                        {filteredRequests.map((request) => (
                          <RequestCard
                            key={request._id}
                            request={request}
                            isFavoritePage
                            search={allSearch}
                          />
                        ))}
                      </div>
                    ) : (
                      <RequestsTable
                        requests={filteredRequests}
                        onRowClick={(id) => navigate(`/requests/${id}`)}
                        search={allSearch}
                        isFavoritePage
                      />
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}

      {activeTab === "offers" && (
        <section className="favorites-section">
          {offersCount === 0 ? (
            <div className="empty-text">
              <p>לא סימנת עדיין תרומות כמועדפות</p>
              <FavoritesEmptyActions showOffers />
            </div>
          ) : filteredOffers.length === 0 ? (
            <NoResults
              message="לא נמצאו תרומות בהתאם לחיפוש או לסינון שבחרת."
              onClear={() => {
                setOfferFilters({ region: [], status: [], category: [] });
                setOfferSearch("");
              }}
            />
          ) : viewMode === "cards" ? (
            <>
              <h2 className="favorites-section-title">תרומות מועדפות:</h2>
              <div className="favorites-grid">
                {filteredOffers.map((offer) => (
                  <OfferCard
                    key={offer._id}
                    offer={offer}
                    isFavoritePage
                    search={offerSearch}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="favorites-section-title">תרומות מועדפות:</h2>
              <OffersTable
                offers={filteredOffers}
                search={offerSearch}
                onRowClick={(id) => navigate(`/offers/${id}`)}
                isFavoritePage
              />
            </>
          )}
        </section>
      )}

      {activeTab === "requests" && (
        <section className="favorites-section">
          {requestsCount === 0 ? (
            <div className="empty-text">
              <p>לא סימנת עדיין בקשות כמועדפות</p>
              <FavoritesEmptyActions showRequests />
            </div>
          ) : filteredRequests.length === 0 ? (
            <NoResults
              message="לא נמצאו בקשות בהתאם לחיפוש או לסינון שבחרת."
              onClear={() => {
                setRequestFilters({
                  region: [],
                  priority: [],
                  status: [],
                  category: [],
                });
                setRequestSearch("");
              }}
            />
          ) : viewMode === "cards" ? (
            <>
              <h2 className="favorites-section-title">בקשות מועדפות:</h2>
              <div className="favorites-grid">
                {filteredRequests.map((request) => (
                  <RequestCard
                    key={request._id}
                    request={request}
                    isFavoritePage
                    search={requestSearch}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="favorites-section-title">בקשות מועדפות:</h2>
              <RequestsTable
                requests={filteredRequests}
                onRowClick={(id) => navigate(`/requests/${id}`)}
                search={requestSearch}
                isFavoritePage
              />
            </>
          )}
        </section>
      )}
    </div>
  );
}

export default FavoritesPage;
