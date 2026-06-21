import "./details-user.css";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import LoadingState from "../../components/common/LoadingState/LoadingState";
import NotFound from "../../components/common/NotFound/NotFound";
import { formatTimeAgo } from "../../helpers/dateUtils";

function DetailsUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, getUserById, deleteUser, logout } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!id) return;

    async function fetchUser() {
      setStatus("loading");

      try {
        const fullUser = await getUserById(id);

        if (!fullUser || !fullUser._id) {
          setStatus("not-found");
          return;
        }

        setUserDetails(fullUser);
        setStatus("success");
      } catch (err) {
        const statusCode = err.response?.status;

        if (statusCode === 400) setStatus("invalid");
        else if (statusCode === 404) setStatus("not-found");
        else if (statusCode === 403) setStatus("forbidden");
        else setStatus("error");
      }
    }

    fetchUser();
  }, [id, getUserById]);

  if (status === "loading") return <LoadingState text="טוען פרטי משתמש..." />;

  if (status === "invalid")
    return <NotFound message="לא ניתן למצוא את המשתמש המבוקש" />;

  if (status === "not-found") return <NotFound message="משתמש לא קיים" />;

  if (status === "forbidden")
    return <NotFound message="אין לך הרשאה לגשת לפרטי המשתמש הזה" />;

  if (status === "error") return <NotFound message="שגיאה בטעינת משתמש" />;

  const handleDeleteUser = async () => {
    try {
      await deleteUser(id);

      if (isOwnProfile) {
        logout();
        navigate("/");
      } else {
        navigate("/users");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const isOwnProfile = user?._id === id;
  const isAdmin = user?.role === "admin";
  const canDelete = isAdmin || isOwnProfile;

  const roleLabels = {
    user: "משתמש רגיל",
    userAdmin: "מנהל",
    admin: "מנהל ראשי",
  };

  const labels = {
    requests: isOwnProfile ? "בקשות שפרסמת" : "בקשות שפורסמו",
    offers: isOwnProfile ? "תרומות שפרסמת" : "תרומות שפורסמו",
  };

  const favoritesCount =
    (userDetails?.favoriteOffers?.length || 0) +
    (userDetails?.favoriteRequests?.length || 0);

  return (
    <div className="details-user-page">
      <section className="details-user-hero">
        <div className="details-user-hero-left">
          <div className="details-user-avatar">
            <i className="bi bi-person-fill"></i>
          </div>

          <div className="details-user-hero-texts">
            <span className="details-user-welcome">
              {isOwnProfile ? "שלום 👋" : "פרופיל משתמש"}
            </span>

            <h1 className="details-user-name">{userDetails?.fullName}</h1>

            <p className="details-user-email">{userDetails?.email}</p>

            <div className="details-user-role">
              <i className="bi bi-shield-check"></i>
              {roleLabels[userDetails?.role]}
            </div>
          </div>
        </div>

        <div className="details-user-actions">
          <button
            className="details-user-btn details-user-edit-btn"
            onClick={() => navigate(`/users/${userDetails?._id}/edit`)}
          >
            <i className="bi bi-pencil-square"></i>
            עריכת פרופיל
          </button>

          {canDelete && (
            <button
              className="details-user-btn details-user-delete-btn"
              onClick={handleDeleteUser}
            >
              <i className="bi bi-trash"></i>
              מחיקת חשבון
            </button>
          )}
        </div>
      </section>

      <section className="details-user-section">
        <h2 className="details-user-section-title">פרטים אישיים</h2>

        <div className="details-user-list">
          <div className="details-user-row">
            <div className="details-user-row-icon">
              <i className="bi bi-telephone"></i>
            </div>

            <div className="details-user-row-content">
              <span className="details-user-row-label">טלפון</span>

              <span className="details-user-row-value">
                {userDetails?.phone}
              </span>
            </div>
          </div>

          <div className="details-user-row">
            <div className="details-user-row-icon">
              <i className="bi bi-geo-alt"></i>
            </div>

            <div className="details-user-row-content">
              <span className="details-user-row-label">עיר</span>

              <span className="details-user-row-value">
                {userDetails?.city}
              </span>
            </div>
          </div>

          <div className="details-user-row">
            <div className="details-user-row-icon">
              <i className="bi bi-calendar-plus"></i>
            </div>

            <div className="details-user-row-content">
              <span className="details-user-row-label">תאריך הצטרפות</span>

              <span className="details-user-row-value">
                {formatTimeAgo(userDetails?.createdAt)}
              </span>
            </div>
          </div>

          <div className="details-user-row">
            <div className="details-user-row-icon">
              <i className="bi bi-clock-history"></i>
            </div>

            <div className="details-user-row-content">
              <span className="details-user-row-label">עודכן לאחרונה</span>

              <span className="details-user-row-value">
                {formatTimeAgo(userDetails?.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="details-user-activity-section">
        <div className="details-user-activity-row requests">
          <div className="details-user-activity-info">
            <div className="details-user-activity-icon">
              <i className="bi bi-megaphone"></i>
            </div>

            <div className="details-user-activity-texts">
              <span className="details-user-activity-number">12</span>

              <p className="details-user-activity-label">{labels.requests}</p>
            </div>
          </div>

          <button
            className="details-user-activity-btn"
            onClick={() => navigate(`/my-items?tab=requests&userId=${id}`)}
          >
            לצפייה בבקשות
            <i className="bi bi-arrow-left-short"></i>
          </button>
        </div>

        <div className="details-user-activity-row offers">
          <div className="details-user-activity-info">
            <div className="details-user-activity-icon">
              <i className="bi bi-gift"></i>
            </div>

            <div className="details-user-activity-texts">
              <span className="details-user-activity-number">7</span>

              <p className="details-user-activity-label">{labels.offers}</p>
            </div>
          </div>

          <button
            className="details-user-activity-btn"
            onClick={() => navigate(`/my-items?tab=offers&userId=${id}`)}
          >
            לצפייה בתרומות
            <i className="bi bi-arrow-left-short"></i>
          </button>
        </div>

        {isOwnProfile && (
          <div className="details-user-activity-row favorites-row favorites">
            <div className="details-user-activity-info">
              <div className="details-user-activity-icon">
                <i className="bi bi-heart"></i>
              </div>

              <div className="details-user-activity-texts">
                <span className="details-user-activity-number">
                  {favoritesCount}
                </span>

                <p className="details-user-activity-label">
                  פריטים שמורים במועדפים
                </p>
              </div>
            </div>

            <button
              className="details-user-activity-btn"
              onClick={() => navigate("/favorites")}
            >
              לצפייה במועדפים
              <i className="bi bi-arrow-left-short"></i>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default DetailsUser;
