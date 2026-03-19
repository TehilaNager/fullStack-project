import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useRequest } from "../../context/RequestContext";
import { useState } from "react";
import "./details-request.css";

function DetailsRequest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { requests, removeRequest, updateRequestStatus } = useRequest();

  console.log(requests);

  const request = requests.find((r) => r._id === id);
  const [status, setStatus] = useState(request?.status);

  if (!request)
    return (
      <div className="chat-not-found">
        <i className="chat-empty-icon bi bi-exclamation-circle"></i>
        <p className="chat-empty-text">הבקשה לא נמצאה</p>
      </div>
    );

  const isOwner = user && user._id === request.requester?._id;
  const isUserAdmin = user?.role === "userAdmin";
  const isAdmin = user?.role === "admin";
  const canManage = isOwner || isUserAdmin || isAdmin;

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    await updateRequestStatus(request._id, newStatus);
  };

  const handleDelete = async () => {
    await removeRequest(request._id);
    navigate("/requests");
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("he-IL") : "לא צוין";

  const statusValue = request.status || "לא-צוין";
  const categoryValue = request.category || "לא-צוין";
  const priorityValue = request.priority || "לא-צוין";

  const statusClass = status?.replace(/\s/g, "-");
  const categoryClass = categoryValue.replace(/\s/g, "-");

  return (
    <div className="details-request-page">
      <div className="details-header">
        {canManage && (
          <div className="manage-buttons">
            {status === "הושלמה" ? (
              <button
                className="new-request-btn"
                onClick={() => handleStatusChange("פתוחה")}
              >
                <i className="bi bi-plus-circle"></i>
                חדש בקשה
              </button>
            ) : (
              <div className="status-toggle">
                {["פתוחה", "בטיפול", "הושלמה"].map((statusOption) => (
                  <div
                    key={statusOption}
                    className={`toggle-item ${
                      status === statusOption ? "selected" : ""
                    }`}
                    onClick={() => handleStatusChange(statusOption)}
                  >
                    {statusOption === "הושלמה" && status === "הושלמה" && (
                      <i className="bi bi-check-circle status-check-icon"></i>
                    )}
                    {statusOption}
                  </div>
                ))}
              </div>
            )}

            <button
              className="edit-btn"
              onClick={() => navigate(`/edit-request/${request._id}`)}
            >
              <i className="bi bi-pencil-fill manage-icon"></i>
            </button>

            <button className="delete-btn" onClick={handleDelete}>
              <i className="bi bi-trash-fill manage-icon"></i>
            </button>
          </div>
        )}

        <h1 className="details-header-title">{request.title}</h1>

        <p className="request-author">
          פורסם ע"י: {request.requester?.fullName || "משתמש"}
        </p>

        <div className="tags-row">
          <span className={`tag status status-${statusClass}`}>
            {statusValue}
          </span>
          <span className={`tag category category-${categoryClass}`}>
            {categoryValue}
          </span>
          <span className={`tag priority priority-${priorityValue}`}>
            {priorityValue}
          </span>
        </div>
      </div>

      <div className="details-section">
        <h2 className="description-label">תיאור הבקשה</h2>
        <p className="description-text">{request.description}</p>
      </div>

      <div className="details-section grid-details">
        <div className="detail-item">
          <i className="bi bi-people detail-icon"></i>
          <span className="detail-label">עבור</span>
          <span className="detail-value">
            {!request.requiredQuantity
              ? "לא צוין"
              : request.requiredQuantity === 1
                ? "אדם אחד"
                : `${request.requiredQuantity} אנשים`}
          </span>
        </div>

        <div className="detail-item">
          <i className="bi bi-geo-alt detail-icon"></i>
          <span className="detail-label">עיר</span>
          <span className="detail-value">{request.city}</span>
        </div>

        <div className="detail-item">
          <i className="bi bi-map detail-icon"></i>
          <span className="detail-label">אזור</span>
          <span className="detail-value">{request.region}</span>
        </div>

        <div className="detail-item">
          <i className="bi bi-clock detail-icon"></i>
          <span className="detail-label">זמין עד</span>
          <span className="detail-value">{formatDate(request.deadline)}</span>
        </div>

        <div className="detail-item">
          <i className="bi bi-pencil-square detail-icon"></i>
          <span className="detail-label">עודכן לאחרונה</span>
          <span className="detail-value">{formatDate(request.updatedAt)}</span>
        </div>

        <div className="detail-item">
          <i className="bi bi-calendar-plus detail-icon"></i>
          <span className="detail-label">תאריך יצירה</span>
          <span className="detail-value">{formatDate(request.createdAt)}</span>
        </div>
      </div>

      <div className="details-section contact-section">
        <h2 className="section-title">יצירת קשר</h2>

        <div className="contact-methods">
          <div className="contact-item">
            <i className="bi bi-chat-dots"></i>
            <span>מערכת ההודעות באתר</span>
          </div>

          {request.contactMethod === "details" && (
            <>
              {request.contactPhone && (
                <div className="contact-item">
                  <i className="bi bi-telephone"></i>
                  <span>{request.contactPhone}</span>
                </div>
              )}

              {request.contactEmail && (
                <div className="contact-item">
                  <i className="bi bi-envelope"></i>
                  <span>{request.contactEmail}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsRequest;
