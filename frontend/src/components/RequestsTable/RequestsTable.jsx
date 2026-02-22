import { useNavigate } from "react-router";
import "./requests-table.css";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useRequest } from "../../context/RequestContext";

function RequestsTable({
  requests = [],
  onRowClick,
  search,
  isFavoritePage = false,
}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleRequestFavorite, isRequestFavorite } = useFavorites();
  const { removeRequest } = useRequest();

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
            const isOwner = user && user._id === req.requester;
            const isUserAdmin = user?.role === "userAdmin";
            const isAdmin = user?.role === "admin";
            const canManage = isOwner || isUserAdmin || isAdmin;

            return (
              <tr key={req._id} className={isOwner ? "my-request-row" : ""}>
                {user && (
                  <td className="table-action-column">
                    {isFavoritePage ? (
                      <button
                        className="remove-favorite-btn"
                        onClick={() => toggleRequestFavorite(req)}
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
                  <span
                    className={`tag category category-${req.category?.replace(
                      /\s/g,
                      "-",
                    )}`}
                  >
                    {req.category || "—"}
                  </span>
                </td>
                <td>{highlightText(req.city || "—", search)}</td>
                <td>{req.region || "—"}</td>
                <td>
                  {!req.requiredQuantity
                    ? "לא צוין"
                    : req.requiredQuantity === 1
                      ? "אדם אחד"
                      : `${req.requiredQuantity} אנשים`}
                </td>
                <td>
                  <span className={`priority-badge ${req.priority}`}>
                    {req.priority}
                  </span>
                </td>
                <td>
                  <span
                    className={`tag status status-${req.status?.replace(
                      /\s/g,
                      "-",
                    )}`}
                  >
                    {req.status || "—"}
                  </span>
                </td>
                <td>
                  {req.deadline
                    ? new Date(req.deadline).toLocaleDateString("he-IL")
                    : "לא צוין"}
                </td>
                <td className="table-actions-cell">
                  <div className="table-actions-wrapper">
                    {user && canManage && (
                      <>
                        <button
                          className="table-edit-btn"
                          title="ערוך"
                          onClick={() => navigate(`/edit-request/${req._id}`)}
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>

                        <button
                          className="table-delete-btn"
                          title="מחק"
                          onClick={() => removeRequest(req._id)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </>
                    )}

                    <button
                      className="table-details-btn"
                      onClick={() => onRowClick(req._id)}
                    >
                      לפרטים
                    </button>
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
