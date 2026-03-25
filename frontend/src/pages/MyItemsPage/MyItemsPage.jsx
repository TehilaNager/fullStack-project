import { useEffect, useState } from "react";
import "./my-items-page.css";
import { useOffer } from "../../context/OfferContext";
import { useRequest } from "../../context/RequestContext";
import Toolbar from "../../components/Toolbar/Toolbar";
import FilterGroup from "../../components/FilterGroup/FilterGroup";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import { useNavigate } from "react-router";
import {
  filterOffers,
  countActiveFilters as countOfferFilters,
  toggleFilter as handleToggleOfferFilter,
} from "../../helpers/offersFiltersLogic";
import {
  filterRequests,
  countActiveFilters as countRequestFilters,
  toggleFilter as handleToggleRequestFilter,
} from "../../helpers/requestsFiltersLogic";
import { filterGroups as offersFilterGroups } from "../../helpers/offersFiltersData";
import { filterGroups as requestsFilterGroups } from "../../helpers/requestsFiltersData";
import { useAuth } from "../../context/AuthContext";
import ItemsTabs from "../../components/ItemsTabs/ItemsTabs";
import MyItemsEmptyActions from "../../components/MyItemsEmptyActions/MyItemsEmptyActions";

function MyItemsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { myOffers, fetchMyOffers } = useOffer();
  const { myRequests, fetchMyRequests } = useRequest();

  const [innerTab, setInnerTab] = useState("offers");
  const [viewMode, setViewMode] = useState("cards");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [offerSearch, setOfferSearch] = useState("");
  const [offerQuantityOption, setOfferQuantityOption] = useState("");
  const [offerMinQuantity, setOfferMinQuantity] = useState("");
  const [offerMaxQuantity, setOfferMaxQuantity] = useState("");
  const [offerIncludeUnknownQuantity, setOfferIncludeUnknownQuantity] =
    useState(true);
  const [offerFilters, setOfferFilters] = useState({
    region: [],
    status: [],
    category: [],
  });
  const [requestSearch, setRequestSearch] = useState("");
  const [requestQuantityOption, setRequestQuantityOption] = useState("");
  const [requestMinQuantity, setRequestMinQuantity] = useState("");
  const [requestMaxQuantity, setRequestMaxQuantity] = useState("");
  const [requestIncludeUnknownQuantity, setRequestIncludeUnknownQuantity] =
    useState(true);
  const [requestFilters, setRequestFilters] = useState({
    region: [],
    priority: [],
    status: [],
    category: [],
  });

  useEffect(() => {
    if (user?._id) {
      fetchMyOffers(user._id);
      fetchMyRequests(user._id);
    }
  }, [fetchMyOffers, fetchMyRequests, user?._id]);

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

  const filteredOffers =
    filterOffers(
      myOffers,
      innerTab === "offers" ? offerSearch : "",
      offerFilters,
      offerQuantityOption,
      offerMinQuantity,
      offerMaxQuantity,
      offerIncludeUnknownQuantity,
    ) || [];

  const filteredRequests =
    filterRequests(
      myRequests,
      innerTab === "requests" ? requestSearch : "",
      requestFilters,
      requestQuantityOption,
      requestMinQuantity,
      requestMaxQuantity,
      requestIncludeUnknownQuantity,
    ) || [];

  const currentFiltersCount =
    innerTab === "offers"
      ? countOfferFilters(offerFilters)
      : countRequestFilters(requestFilters);

  return (
    <div className="my-items-page">
      <PageHeader
        title="הבקשות והתרומות שלי"
        subtitle="כאן מופיעות כל התרומות והבקשות שיצרת"
      />

      <Toolbar
        search={innerTab === "offers" ? offerSearch : requestSearch}
        onSearchChange={(value) => {
          if (innerTab === "offers") setOfferSearch(value);
          else setRequestSearch(value);
        }}
        activeFiltersCount={currentFiltersCount}
        onOpenFilters={() => setIsFilterOpen(true)}
        viewMode={viewMode}
        onViewModeChange={(mode) => !isMobile && setViewMode(mode)}
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

            {innerTab === "offers" && (
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

                <div className="filter-group">
                  <p className="filter-title">לכמה אנשים התרומה מיועדת:</p>
                  <select
                    value={offerQuantityOption}
                    onChange={(e) => setOfferQuantityOption(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">בחר</option>
                    <option value="1">אדם אחד</option>
                    <option value="5">עד 5 אנשים</option>
                    <option value="10">עד 10 אנשים</option>
                    <option value="20">עד 20 אנשים</option>
                    <option value="50">עד 50 אנשים</option>
                    <option value="range">בחר טווח מספרים</option>
                  </select>

                  {offerQuantityOption === "range" && (
                    <div className="quantity-range-inputs">
                      <input
                        type="number"
                        min="1"
                        placeholder="מ…"
                        value={offerMinQuantity}
                        onChange={(e) => setOfferMinQuantity(e.target.value)}
                        className="filter-input-number"
                      />
                      <input
                        type="number"
                        min="1"
                        placeholder="עד…"
                        value={offerMaxQuantity}
                        onChange={(e) => setOfferMaxQuantity(e.target.value)}
                        className="filter-input-number"
                      />
                    </div>
                  )}

                  <div className="unknown-quantity-checkbox">
                    <label className="filter-option">
                      <input
                        type="checkbox"
                        checked={offerIncludeUnknownQuantity}
                        onChange={(e) =>
                          setOfferIncludeUnknownQuantity(e.target.checked)
                        }
                      />
                      כלול תרומות בלי ציון מספר אנשים
                    </label>
                  </div>
                </div>
              </>
            )}

            {innerTab === "requests" && (
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

                <div className="filter-group">
                  <p className="filter-title">מספר האנשים הזקוקים לעזרה:</p>
                  <select
                    value={requestQuantityOption}
                    onChange={(e) => setRequestQuantityOption(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">בחר</option>
                    <option value="1">אדם אחד</option>
                    <option value="5">עד 5 אנשים</option>
                    <option value="10">עד 10 אנשים</option>
                    <option value="20">עד 20 אנשים</option>
                    <option value="50">עד 50 אנשים</option>
                    <option value="range">בחר טווח מספרים</option>
                  </select>

                  {requestQuantityOption === "range" && (
                    <div className="quantity-range-inputs">
                      <input
                        type="number"
                        min="1"
                        placeholder="מ…"
                        value={requestMinQuantity}
                        onChange={(e) => setRequestMinQuantity(e.target.value)}
                        className="filter-input-number"
                      />
                      <input
                        type="number"
                        min="1"
                        placeholder="עד…"
                        value={requestMaxQuantity}
                        onChange={(e) => setRequestMaxQuantity(e.target.value)}
                        className="filter-input-number"
                      />
                    </div>
                  )}

                  <div className="unknown-quantity-checkbox">
                    <label className="filter-option">
                      <input
                        type="checkbox"
                        checked={requestIncludeUnknownQuantity}
                        onChange={(e) =>
                          setRequestIncludeUnknownQuantity(e.target.checked)
                        }
                      />
                      כלול בקשות בלי ציון מספר אנשים
                    </label>
                  </div>
                </div>
              </>
            )}

            <button
              className="clear-filters-btn"
              onClick={() => {
                if (innerTab === "offers") {
                  setOfferFilters({ region: [], status: [], category: [] });
                  setOfferQuantityOption("");
                  setOfferMinQuantity("");
                  setOfferMaxQuantity("");
                  setOfferIncludeUnknownQuantity(true);
                  setOfferSearch("");
                }
                if (innerTab === "requests") {
                  setRequestFilters({
                    region: [],
                    priority: [],
                    status: [],
                    category: [],
                  });
                  setRequestQuantityOption("");
                  setRequestMinQuantity("");
                  setRequestMaxQuantity("");
                  setRequestIncludeUnknownQuantity(true);
                  setRequestSearch("");
                }
              }}
            >
              נקה סינון
            </button>
          </aside>
        </div>
      )}

      <ItemsTabs
        innerTab={innerTab}
        setInnerTab={setInnerTab}
        offers={myOffers}
        requests={myRequests}
        filteredOffers={filteredOffers}
        filteredRequests={filteredRequests}
        offerSearch={offerSearch}
        requestSearch={requestSearch}
        viewMode={viewMode}
        navigate={navigate}
        onClearOffers={() => {
          setOfferFilters({ region: [], status: [], category: [] });
          setOfferQuantityOption("");
          setOfferMinQuantity("");
          setOfferMaxQuantity("");
          setOfferIncludeUnknownQuantity(true);
          setOfferSearch("");
        }}
        onClearRequests={() => {
          setRequestFilters({
            region: [],
            priority: [],
            status: [],
            category: [],
          });
          setRequestQuantityOption("");
          setRequestMinQuantity("");
          setRequestMaxQuantity("");
          setRequestIncludeUnknownQuantity(true);
          setRequestSearch("");
        }}
        emptyOffersText="עדיין לא יצרת תרומות"
        emptyRequestsText="עדיין לא יצרת בקשות"
        noOffersResultsText="לא נמצאו תרומות בהתאם לחיפוש או לסינון שבחרת."
        noRequestsResultsText="לא נמצאו בקשות בהתאם לחיפוש או לסינון שבחרת."
        emptyOffersAction={<MyItemsEmptyActions showOffers />}
        emptyRequestsAction={<MyItemsEmptyActions showRequests />}
      />
    </div>
  );
}

export default MyItemsPage;
