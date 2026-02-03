import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import "./request-card.css";
import favoritesService from "../../services/favoritesService";
import { useAuth } from "../../context/AuthContext";

function RequestsCard({ request }) {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [isFavorite, setIsFavorite] = useState(request.isFavorite || false);
  const descriptionRef = useRef(null);

  const toggleFavorite = async () => {
    try {
      const updatedUser = await favoritesService.toggleRequestFavorite(
        request._id
      );

      const favorited = updatedUser.favoriteRequests.some(
        (f) => f.request === request._id
      );

      setIsFavorite(favorited);
    } catch (err) {
      console.error("Error toggling request favorite:", err);
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
  }, [request.description]);

  return (
    <div className="request-card request">
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
        <h3 className="card-title">{request.title}</h3>

        <div className="tags">
          <span
            className={`tag status status-${request.status.replace(
              /\s/g,
              "-"
            )}`}
          >
            {request.status}
          </span>

          <span
            className={`tag category category-${request.category.replace(
              /\s/g,
              "-"
            )}`}
          >
            {request.category}
          </span>

          <span className={`tag priority ${request.priority}`}>
            {request.priority}
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
          {request.description}
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
            {`עבור: ${getQuantityLabel(request.requiredQuantity)}`}
          </div>

          <div className="info-item">
            <i className="bi bi-calendar-event-fill info-icon"></i> זמין עד:{" "}
            {request.deadline ? `${formatDate(request.deadline)}` : "לא צויין"}
          </div>

          <div className="info-item">
            <i className="bi bi-geo-alt-fill info-icon"></i> {request.city},{" "}
            {request.region}
          </div>
        </div>

        <Link to={`/details-request/${request._id}`} className="details-btn">
          פרטי הבקשה
        </Link>
      </div>
    </div>
  );
}

export default RequestsCard;
