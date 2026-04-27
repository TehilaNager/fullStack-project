import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useRequest } from "../../context/RequestContext";
import { useEffect, useState } from "react";
import "./details-request.css";
import { useMessage } from "../../context/MessageContext";
import { formatDateTime, formatTimeAgo } from "../../helpers/dateUtils";

function DetailsRequest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { requests, removeRequest, updateRequestStatus } = useRequest();
  const { openThread } = useMessage();

  const request = requests.find((r) => r._id === id);
  const [status, setStatus] = useState(request?.status);

  useEffect(() => {
    if (request) setStatus(request.status);
  }, [request]);

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

  const statusValue = request.status || "לא-צוין";
  const categoryValue = request.category || "לא-צוין";
  const priorityValue = request.priority || "לא-צוין";

  const statusClass = status?.replace(/\s/g, "-");
  const categoryClass = categoryValue.replace(/\s/g, "-");

  const handleOpenChat = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!request.requester?._id) {
      console.error("Requester ID is missing:", request);
      return;
    }

    if (user._id === request.requester._id) {
      navigate("/messages");
      return;
    }

    try {
      const thread = await openThread({
        relatedType: "SupportRequest",
        relatedId: request._id,
        participants: [request.requester._id],
      });

      if (!thread?._id) {
        console.error("No valid thread returned:", thread);
        return;
      }

      const isNewThread = !thread.messages || thread.messages.length === 0;

      const initialText = isNewThread
        ? thread.relatedType === "SupportRequest"
          ? "היי, אני אשמח לעזור 🙂"
          : "היי, אשמח לסייע, איך אוכל לעזור? 🙂"
        : "";

      navigate(`/messages/${thread._id}`, { state: { initialText } });
    } catch (err) {
      console.error("Failed to open chat:", err);
    }
  };

  const hasDirectContact = request.contactPhone || request.contactEmail;
  const canUseChat = !!request.requester?._id && !isOwner;

  return (
    <div className="details-request-page">
      <div className="details-request-header">
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
                      <i className="bi bi-check-circle"></i>
                    )}
                    {statusOption}
                  </div>
                ))}
              </div>
            )}

            {/* <div className="status-actions">
              {["פתוחה", "בטיפול", "הושלמה"].map((statusOption) => (
                <button
                  key={statusOption}
                  onClick={() => handleStatusChange(statusOption)}
                  disabled={status === statusOption}
                  className={`status-btn ${
                    status === statusOption ? "active" : ""
                  }`}
                >
                  {statusOption}
                </button>
              ))}
            </div> */}

            <button
              className="edit-btn"
              onClick={() => navigate(`/edit-request/${request._id}`)}
            >
              <i className="bi bi-pencil manage-icon"></i>
            </button>

            <button className="delete-btn" onClick={handleDelete}>
              <i className="bi bi-trash manage-icon"></i>
            </button>
          </div>
        )}

        <h1 className="details-header-title">{request.title}</h1>

        <p className="request-author">
          פורסם ע"י: {request.requester?.fullName || "משתמש לא זמין"}
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
      <div>
        <h2 className="section-title">
          <i className="bi bi-card-text section-icon"></i>
          תיאור הבקשה
        </h2>
        <p className="description">
          {request.description || "לא הוזן תיאור לבקשה"}
        </p>
      </div>

      <div>
        <h2 className="section-title">
          <i className="bi bi-info-circle section-icon"></i>
          פרטים נוספים
        </h2>
        <div className="grid-details">
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
            <span className="detail-value">
              {formatTimeAgo(request.deadline)}
            </span>
          </div>

          <div
            className="detail-item"
            title={formatDateTime(request.updatedAt)}
          >
            <i className="bi bi-pencil-square detail-icon"></i>
            <span className="detail-label">עודכן לאחרונה</span>
            <span className="detail-value">
              {formatTimeAgo(request.updatedAt)}
            </span>
          </div>

          <div
            className="detail-item"
            title={formatDateTime(request.createdAt)}
          >
            <i className="bi bi-calendar-plus detail-icon"></i>
            <span className="detail-label">תאריך פרסום</span>
            <span className="detail-value">
              {formatTimeAgo(request.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="section-title">
          <i className="bi bi-person-lines-fill section-icon"></i>
          יצירת קשר
        </h2>
        <div className="contact-section">
          <div className="contact-card">
            {hasDirectContact && (
              <div className="contact-methods">
                <a
                  href={
                    request.contactPhone ? `tel:${request.contactPhone}` : "#"
                  }
                  className="contact-item contact-link"
                  aria-disabled={!request.contactPhone}
                >
                  <i className="bi bi-telephone contact-item-icon"></i>
                  <div className="contact-texts">
                    <span className="contact-value">
                      {request.contactPhone || "לא צוין"}
                    </span>
                  </div>
                </a>

                <a
                  href={
                    request.contactEmail
                      ? `mailto:${request.contactEmail}`
                      : "#"
                  }
                  className="contact-item contact-link"
                  aria-disabled={!request.contactEmail}
                >
                  <i className="bi bi-envelope contact-item-icon"></i>
                  <div className="contact-texts">
                    <span className="contact-value">
                      {request.contactEmail || "לא צוין"}
                    </span>
                  </div>
                </a>
              </div>
            )}

            {!request.contactPhone && !request.contactEmail && (
              <div
                className={`contact-empty-note ${!request.requester?._id ? "contact-unavailable" : ""}`}
              >
                <i className="bi bi-info-circle"></i>
                <span>
                  {request.requester?._id
                    ? "לא הוזנו פרטי קשר ישירים. ניתן לפנות דרך מערכת ההודעות של האתר."
                    : "לא ניתן ליצור קשר כרגע — מפרסם הבקשה אינו זמין."}
                </span>
              </div>
            )}

            {hasDirectContact && !request.requester?._id && (
              <div className="contact-empty-note contact-unavailable">
                <i className="bi bi-info-circle"></i>
                <span>
                  ניתן ליצור קשר באמצעות פרטי הקשר שמופיעים כאן בלבד. מפרסם
                  הבקשה אינו זמין במערכת ההודעות של האתר.
                </span>
              </div>
            )}

            {canUseChat && (
              <button className="contact-main-btn" onClick={handleOpenChat}>
                <i className="bi bi-chat-dots-fill contact-main-icon"></i>
                <span>שליחת הודעה</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsRequest;
