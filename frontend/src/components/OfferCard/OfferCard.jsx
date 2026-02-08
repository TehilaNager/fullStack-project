import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import "./offer-card.css";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";

function OfferCard({ offer, isFavoritePage = false, onRemoveFavorite }) {
  const { user } = useAuth();
  const { toggleOfferFavorite, isOfferFavorite } = useFavorites();
  const [expanded, setExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const descriptionRef = useRef(null);

  const isFavorite = isOfferFavorite(offer._id);

  const getQuantityLabel = (quantity) => {
    if (quantity === null || quantity === undefined) return "לא צוין";
    if (quantity === 1) return "אדם אחד";
    return `${quantity} אנשים`;
  };

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("he-IL");
  };

  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      setShowReadMore(el.scrollHeight > el.clientHeight);
    }
  }, [offer.description]);

  const statusValue = offer.status || "לא-צוין";
  const categoryValue = offer.category || "לא-צוין";

  const statusClass = statusValue.replace(/\s/g, "-");
  const categoryClass = categoryValue.replace(/\s/g, "-");

  return (
    <div
      className={`offer-card offer ${isFavoritePage ? "favorite-page" : ""}`}
    >
      {user && !isFavoritePage && (
        <button
          className="favorite-btn"
          onClick={() => toggleOfferFavorite(offer)}
          title={isFavorite ? "הסר מהמועדפים" : "הוסף למועדפים"}
        >
          <i
            className={
              isFavorite ? "bi bi-heart-fill favorited" : "bi bi-heart"
            }
          ></i>
        </button>
      )}

      <div className="card-header">
        <h3 className="card-title">{offer.title}</h3>

        {user && isFavoritePage && (
          <small className="card-updated">
            עודכן:{" "}
            {(() => {
              const d = new Date(offer.updatedAt);
              const day = String(d.getDate()).padStart(2, "0");
              const month = String(d.getMonth() + 1).padStart(2, "0");
              const year = d.getFullYear();
              return `${day}/${month}/${year}`;
            })()}
          </small>
        )}

        <div className="tags">
          <span className={`tag status status-${statusClass}`}>
            {statusValue}
          </span>

          <span className={`tag category category-${categoryClass}`}>
            {categoryValue}
          </span>
        </div>
      </div>

      <div className="description-wrapper">
        <p
          ref={descriptionRef}
          className={`card-description ${expanded ? "expanded" : ""} ${
            showReadMore ? "fade-out" : ""
          }`}
        >
          {offer.description}
        </p>

        {showReadMore && (
          <button
            className="read-more-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "הצג פחות" : "קרא עוד"}
          </button>
        )}
      </div>

      <div className="bottom-wrapper">
        <div className="card-info">
          <div className="info-item">
            <i className="bi bi-people-fill info-icon"></i>{" "}
            {`עבור: ${getQuantityLabel(offer.availableQuantity)}`}
          </div>

          <div className="info-item">
            <i className="bi bi-calendar-event-fill info-icon"></i> זמין עד:{" "}
            {offer.availableUntil
              ? `${formatDate(offer.availableUntil)}`
              : "לא צויין"}
          </div>

          <div className="info-item">
            <i className="bi bi-geo-alt-fill info-icon"></i> {offer.city},{" "}
            {offer.region}
          </div>
        </div>

        <Link to={`/details-offer/${offer._id}`} className="details-btn">
          פרטי התרומה
        </Link>

        {user && isFavoritePage && (
          <button
            className="remove-favorite-btn"
            onClick={() => toggleOfferFavorite(offer)}
          >
            הסר מהמועדפים
          </button>
        )}
      </div>
    </div>
  );
}

export default OfferCard;
