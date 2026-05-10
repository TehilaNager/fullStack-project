import { Link, useNavigate } from "react-router";
import "./requests-table.css";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useRequest } from "../../context/RequestContext";
import Tag from "../Tag/Tag";
import { getTagKey } from "../../helpers/tagMaps";
import { getQuantityLabel } from "../../helpers/formatters";
import { formatDate } from "../../helpers/dateUtils";
import { highlightText } from "../../helpers/highlightText";

function RequestsTable({ requests = [], search, isFavoritePage = false }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleRequestFavorite, isRequestFavorite } = useFavorites();
  const { removeRequest } = useRequest();

  return (
    <div className="table-container">
      <table className="requests-table">
        <thead>
          <tr>
            {user && <th></th>}
            <th>כותרת</th>
            <th>תיאור</th>
            <th>קטגוריה</th>
            <th>עיר</th>
            <th>אזור</th>
            <th>עבור</th>
            <th>דחיפות</th>
            <th>סטטוס</th>
            <th>זמין עד</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => {
            const isOwner = user && user._id === req.requester?._id;
            const isUserAdmin = user?.role === "userAdmin";
            const isAdmin = user?.role === "admin";
            const canManage = isOwner || isUserAdmin || isAdmin;
            const statusKey = getTagKey("status", req.status);

            return (
              <tr
                key={req._id}
                className={`${isOwner ? "my-request-row" : ""} status-${statusKey}`}
              >
                {user && (
                  <td className="table-action-column">
                    {isFavoritePage ? (
                      <button
                        className="remove-favorite-btn"
                        onClick={() => toggleRequestFavorite(req)}
                        title="הסר מהמועדפים"
                      >
                        הסר
                      </button>
                    ) : (
                      <button
                        className={`favorite-btn-table ${isRequestFavorite(req._id) ? "favorited" : ""}`}
                        onClick={() => toggleRequestFavorite(req)}
                        title={
                          isRequestFavorite(req._id)
                            ? "הסר מהמועדפים"
                            : "הוסף למועדפים"
                        }
                      >
                        <i
                          className={
                            isRequestFavorite(req._id)
                              ? "bi bi-heart-fill"
                              : "bi bi-heart"
                          }
                        ></i>
                      </button>
                    )}
                  </td>
                )}
                <td className="title-cell">
                  {highlightText(req.title, search)}
                </td>
                <td>
                  <div
                    className="description-cell"
                    title={req.description || ""}
                  >
                    {highlightText(req.description || "—", search)}
                  </div>
                </td>
                <td>
                  <Tag type="category" value={req.category} size="sm" />
                </td>
                <td>{highlightText(req.city || "—", search)}</td>
                <td>{req.region || "—"}</td>
                <td>{getQuantityLabel(req.requiredQuantity)}</td>
                <td>
                  <Tag type="priority" value={req.priority} size="sm" />
                </td>
                <td>
                  <Tag type="status" value={req.status} size="sm" />
                </td>
                <td>{formatDate(req.deadline)}</td>
                <td className="table-actions-cell">
                  <div className="table-actions-wrapper">
                    {user && canManage && (
                      <>
                        <button
                          className="table-edit-btn"
                          title="ערוך"
                          onClick={() => navigate(`/edit-request/${req._id}`)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>

                        <button
                          className="table-delete-btn"
                          title="מחק"
                          onClick={() => removeRequest(req._id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </>
                    )}

                    <Link
                      to={`/details-request/${req._id}`}
                      className="table-details-btn"
                    >
                      לפרטים
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RequestsTable;
