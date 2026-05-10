import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import "./offer-card.css";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useOffer } from "../../context/OfferContext";
import Tag from "../Tag/Tag";
import { getTagKey } from "../../helpers/tagMaps";
import { getQuantityLabel } from "../../helpers/formatters";
import { formatDate } from "../../helpers/dateUtils";
import { highlightText } from "../../helpers/highlightText";

function OfferCard({ offer, isFavoritePage = false, search }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleOfferFavorite, isOfferFavorite } = useFavorites();
  const { removeOffer } = useOffer();
  const [expanded, setExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const descriptionRef = useRef(null);

  const isFavorite = isOfferFavorite(offer._id);

  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      setShowReadMore(el.scrollHeight > el.clientHeight);
    }
  }, [offer.description]);

  const isOwner = user && user._id === offer.supporter;
  const isUserAdmin = user?.role === "userAdmin";
  const isAdmin = user?.role === "admin";
  const canManage = isOwner || isUserAdmin || isAdmin;
  const statusKey = getTagKey("status", offer.status);

  return (
    <div
      className={`offer-card offer ${isFavoritePage && "favorite-page"} ${isOwner && "owner-offer"} status-${statusKey}`}
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
        <h3 className="card-title">{highlightText(offer.title, search)}</h3>

        {user && isFavoritePage && (
          <small className="card-updated">
            עודכן: {formatDate(offer.updatedAt)}
          </small>
        )}

        <div className="tags">
          <Tag type="status" value={offer.status} size="sm" />
          <Tag type="category" value={offer.category} size="sm" />
        </div>
      </div>

      <div className="description-wrapper">
        <p
          ref={descriptionRef}
          className={`card-description ${expanded ? "expanded" : ""} ${
            showReadMore ? "fade-out" : ""
          }`}
        >
          {highlightText(offer.description, search)}
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
            {formatDate(offer.availableUntil)}
          </div>

          <div className="info-item">
            <div>
              <i className="bi bi-geo-alt-fill info-icon"></i>{" "}
              {highlightText(offer.city, search)}
              {offer.region && `, ${offer.region}`}
            </div>
          </div>
        </div>

        <div className="actions-row">
          {canManage && (
            <div className="owner-actions">
              <button
                className="edit-btn"
                title="ערוך"
                onClick={() => navigate(`/edit-offer/${offer._id}`)}
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className="delete-btn"
                title="מחק"
                onClick={() => removeOffer(offer._id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          )}

          <Link
            to={`/details-offer/${offer._id}`}
            className="details-btn flex-grow"
          >
            פרטי התרומה
          </Link>
        </div>

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
