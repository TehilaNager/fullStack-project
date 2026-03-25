import "./items-tabs.css";
import OfferCard from "../OfferCard/OfferCard";
import RequestCard from "../RequestCard/RequestCard";
import OffersTable from "../OffersTable/OffersTable";
import RequestsTable from "../RequestsTable/RequestsTable";
import NoResults from "../NoResults/NoResults";

function ItemsTabs({
  innerTab,
  setInnerTab,
  offers,
  requests,
  filteredOffers,
  filteredRequests,
  offerSearch,
  requestSearch,
  viewMode,
  navigate,
  onClearOffers,
  onClearRequests,
  emptyOffersText = "עדיין אין תרומות להצגה",
  emptyRequestsText = "עדיין אין בקשות להצגה",
  noOffersResultsText = "לא נמצאו תרומות בהתאם לחיפוש או לסינון שבחרת.",
  noRequestsResultsText = "לא נמצאו בקשות בהתאם לחיפוש או לסינון שבחרת.",
  emptyOffersAction = null,
  emptyRequestsAction = null,
  isFavoritePage = false,
}) {
  const offersCount = offers.length;
  const requestsCount = requests.length;

  return (
    <>
      <div className="items-tabs-nav">
        <button
          className={`items-tabs-btn ${innerTab === "offers" ? "active" : ""}`}
          onClick={() => setInnerTab("offers")}
        >
          תרומות ({offersCount})
        </button>
        <button
          className={`items-tabs-btn ${innerTab === "requests" ? "active" : ""}`}
          onClick={() => setInnerTab("requests")}
        >
          בקשות ({requestsCount})
        </button>
      </div>

      <div className="items-tabs-content">
        {innerTab === "offers" && (
          <>
            {offersCount === 0 ? (
              <div className="items-tabs-empty">
                <p>{emptyOffersText}</p>
                {emptyOffersAction}
              </div>
            ) : filteredOffers.length === 0 ? (
              <NoResults
                message={noOffersResultsText}
                onClear={onClearOffers}
              />
            ) : viewMode === "cards" ? (
              <div className="items-tabs-grid">
                {filteredOffers.map((offer) => (
                  <OfferCard
                    key={offer._id}
                    offer={offer}
                    search={offerSearch}
                    isFavoritePage={isFavoritePage}
                  />
                ))}
              </div>
            ) : (
              <OffersTable
                offers={filteredOffers}
                search={offerSearch}
                onRowClick={(id) => navigate(`/offers/${id}`)}
                isFavoritePage={isFavoritePage}
              />
            )}
          </>
        )}

        {innerTab === "requests" && (
          <>
            {requestsCount === 0 ? (
              <div className="items-tabs-empty">
                <p>{emptyRequestsText}</p>
                {emptyRequestsAction}
              </div>
            ) : filteredRequests.length === 0 ? (
              <NoResults
                message={noRequestsResultsText}
                onClear={onClearRequests}
              />
            ) : viewMode === "cards" ? (
              <div className="items-tabs-grid">
                {filteredRequests.map((request) => (
                  <RequestCard
                    key={request._id}
                    request={request}
                    search={requestSearch}
                    isFavoritePage={isFavoritePage}
                  />
                ))}
              </div>
            ) : (
              <RequestsTable
                requests={filteredRequests}
                search={requestSearch}
                onRowClick={(id) => navigate(`/requests/${id}`)}
                isFavoritePage={isFavoritePage}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ItemsTabs;
