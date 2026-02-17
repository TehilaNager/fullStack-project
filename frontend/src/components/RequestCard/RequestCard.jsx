import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import "./request-card.css";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useRequest } from "../../context/RequestContext";

function RequestsCard({ request, isFavoritePage = false, search }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleRequestFavorite, isRequestFavorite } = useFavorites();
  const { removeRequest } = useRequest();
  const [expanded, setExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const descriptionRef = useRef(null);

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

  const statusValue = request.status || "לא-צוין";
  const categoryValue = request.category || "לא-צוין";
  const priorityValue = request.priority || "לא-צוין";

  const statusClass = statusValue.replace(/\s/g, "-");
  const categoryClass = categoryValue.replace(/\s/g, "-");

  const highlightText = (text, search) => {
    if (!search || !text) return text;
    const regex = new RegExp(
      `(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );

    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="highlight">
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  const isOwner = user && user._id === request.requester;
  const isUserAdmin = user?.role === "userAdmin";
  const isAdmin = user?.role === "admin";

  const canManage = isOwner || isUserAdmin || isAdmin;

  return (
    <div
      className={`request-card request ${isFavoritePage && "favorite-page"} ${isOwner && "owner-request"}`}
    >
      {user && !isFavoritePage && (
        <button
          className="favorite-btn"
          onClick={() => toggleRequestFavorite(request)}
          title={
            isRequestFavorite(request._id) ? "הסר מהמועדפים" : "הוסף למועדפים"
          }
        >
          <i
            className={
              isRequestFavorite(request._id)
                ? "bi bi-heart-fill favorited"
                : "bi bi-heart"
            }
          ></i>
        </button>
      )}

      <div className="card-header">
        <h3 className="card-title">{highlightText(request.title, search)}</h3>

        {user && isFavoritePage && (
          <small className="card-updated">
            עודכן:{" "}
            {(() => {
              const d = new Date(request.updatedAt);
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

          <span className={`tag priority ${priorityValue}`}>
            {priorityValue}
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
          {highlightText(request.description, search)}
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
            {request.deadline ? `${formatDate(request.deadline)}` : "לא צוין"}
          </div>

          <div className="info-item">
            <div>
              <i className="bi bi-geo-alt-fill info-icon"></i>{" "}
              {highlightText(`${request.city}, ${request.region}`, search)}
            </div>
          </div>
        </div>

        <div className="actions-row">
          {canManage && (
            <div className="owner-actions">
              <button
                className="edit-btn"
                title="ערוך"
                onClick={() => navigate(`/edit-request/${request._id}`)}
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
              <button
                className="delete-btn"
                title="מחק"
                onClick={() => removeRequest(request._id)}
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </div>
          )}

          <Link
            to={`/details-request/${request._id}`}
            className="details-btn flex-grow"
          >
            פרטי הבקשה
          </Link>
        </div>

        {user && isFavoritePage && (
          <button
            className="remove-favorite-btn"
            onClick={() => toggleRequestFavorite(request)}
          >
            הסר מהמועדפים
          </button>
        )}
      </div>
    </div>
  );
}

export default RequestsCard;
