import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import "./request-card.css";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useRequest } from "../../context/RequestContext";
import Tag from "../Tag/Tag";
import { getTagKey } from "../../helpers/tagMaps";
import { getQuantityLabel } from "../../helpers/formatters";
import { formatDate } from "../../helpers/dateUtils";
import { highlightText } from "../../helpers/highlightText";

function RequestsCard({ request, isFavoritePage = false, search }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleRequestFavorite, isRequestFavorite } = useFavorites();
  const { removeRequest } = useRequest();
  const [expanded, setExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      setShowReadMore(el.scrollHeight > el.clientHeight);
    }
  }, [request.description]);

  const isOwner = user && user._id === request.requester?._id;
  const isUserAdmin = user?.role === "userAdmin";
  const isAdmin = user?.role === "admin";
  const canManage = isOwner || isUserAdmin || isAdmin;
  const statusKey = getTagKey("status", request.status);

  return (
    <div
      className={`request-card request ${isFavoritePage && "favorite-page"} ${isOwner && "owner-request"} status-${statusKey}`}
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
            עודכן: {formatDate(request.updatedAt)}
          </small>
        )}

        <div className="tags">
          <Tag type="status" value={request.status} size="sm" />
          <Tag type="category" value={request.category} size="sm" />
          <Tag type="priority" value={request.priority} size="sm" />
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
            {formatDate(request.deadline)}
          </div>

          <div className="info-item">
            <div>
              <i className="bi bi-geo-alt-fill info-icon"></i>{" "}
              {highlightText(request.city, search)}
              {request.region && `, ${request.region}`}
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
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className="delete-btn"
                title="מחק"
                onClick={() => removeRequest(request._id)}
              >
                <i className="bi bi-trash"></i>
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
