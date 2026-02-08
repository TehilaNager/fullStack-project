import { useEffect, useState } from "react";
import "./favorites-page.css";
import { useFavorites } from "../../context/FavoritesContext";
import OfferCard from "../../components/OfferCard/OfferCard";
import RequestCard from "../../components/RequestCard/RequestCard";
import FavoritesEmptyActions from "../../components/FavoritesEmptyActions/FavoritesEmptyActions";

function FavoritesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [innerTab, setInnerTab] = useState("offers");
  const { favoriteOffers, favoriteRequests, loadFavorites, loadingFavorites } =
    useFavorites();

  useEffect(() => {
    loadFavorites();
  }, []);

  if (loadingFavorites) {
    return <div className="favorites-loading">טוען מועדפים...</div>;
  }

  const offersCount = favoriteOffers.length;
  const requestsCount = favoriteRequests.length;
  const totalCount = offersCount + requestsCount;

  return (
    <div className="favorites-page">
      <header className="favorites-header">
        <h1 className="favorites-title">המועדפים שלי</h1>
        <p className="favorites-subtitle">
          כאן מרוכזות התרומות והבקשות שסומנו כמועדפות
        </p>
      </header>

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
                ניתן להוסיף תרומות ובקשות למועדפים באמצעות לחיצה על סמל הלב.
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
                    ) : (
                      <div className="favorites-grid">
                        {favoriteOffers.map((offer) => (
                          <OfferCard
                            key={offer._id}
                            offer={offer}
                            isFavoritePage
                          />
                        ))}
                      </div>
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
                    ) : (
                      <div className="favorites-grid">
                        {favoriteRequests.map((request) => (
                          <RequestCard
                            key={request._id}
                            request={request}
                            isFavoritePage
                          />
                        ))}
                      </div>
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
          ) : (
            <div className="favorites-grid">
              {favoriteOffers.map((offer) => (
                <OfferCard key={offer._id} offer={offer} isFavoritePage />
              ))}
            </div>
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
          ) : (
            <div className="favorites-grid">
              {favoriteRequests.map((request) => (
                <RequestCard
                  key={request._id}
                  request={request}
                  isFavoritePage
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default FavoritesPage;
