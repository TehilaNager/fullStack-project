import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import "./offer-card.css";
import favoritesService from "../../services/favoritesService";
import { useAuth } from "../../context/AuthContext";

function OfferCard({ offer }) {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [isFavorite, setIsFavorite] = useState(offer.isFavorite || false);
  const descriptionRef = useRef(null);

  const toggleFavorite = async () => {
    try {
      const updatedUser = await favoritesService.toggleOfferFavorite(offer._id);
      const favorited = updatedUser.favoriteOffers.some(
        (f) => f.offer === offer._id
      );
      setIsFavorite(favorited);
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

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

  return (
    <div className="offer-card offer">
      {user && (
        <button
          className="favorite-btn"
          onClick={toggleFavorite}
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

        <div className="tags">
          <span
            className={`tag status status-${offer.status.replace(/\s/g, "-")}`}
          >
            {offer.status}
          </span>

          <span
            className={`tag category category-${offer.category.replace(
              /\s/g,
              "-"
            )}`}
          >
            {offer.category}
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
      </div>
    </div>
  );
}

export default OfferCard;
