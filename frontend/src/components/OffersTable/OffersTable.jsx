import "./offers-table.css";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router";
import { useOffer } from "../../context/OfferContext";
import Tag from "../Tag/Tag";
import { getTagKey } from "../../helpers/tagMaps";
import { getQuantityLabel } from "../../helpers/formatters";
import { formatDate } from "../../helpers/dateUtils";
import { highlightText } from "../../helpers/highlightText";

function OffersTable({ offers = [], search, isFavoritePage = false }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleOfferFavorite, isOfferFavorite } = useFavorites();
  const { removeOffer } = useOffer();

  return (
    <div className="table-container">
      <table className="offers-table">
        <thead>
          <tr>
            {user && <th></th>}
            <th>כותרת</th>
            <th>תיאור</th>
            <th>קטגוריה</th>
            <th>עיר</th>
            <th>אזור</th>
            <th>עבור</th>
            <th>סטטוס</th>
            <th>זמין עד</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {offers.map((offer) => {
            const isOwner = user && user._id === offer.supporter;
            const isUserAdmin = user?.role === "userAdmin";
            const isAdmin = user?.role === "admin";
            const canManage = isOwner || isUserAdmin || isAdmin;
            const statusKey = getTagKey("status", offer.status);

            return (
              <tr
                key={offer._id}
                className={`${isOwner ? "my-offer-row" : ""} status-${statusKey}`}
              >
                {user && (
                  <td className="table-action-column">
                    {isFavoritePage ? (
                      <button
                        className="remove-favorite-btn"
                        title="הסר מהמועדפים"
                        onClick={() => toggleOfferFavorite(offer)}
                      >
                        הסר
                      </button>
                    ) : (
                      <button
                        className={`favorite-btn-table ${
                          isOfferFavorite(offer._id) ? "favorited" : ""
                        }`}
                        onClick={() => toggleOfferFavorite(offer)}
                      >
                        <i
                          className={
                            isOfferFavorite(offer._id)
                              ? "bi bi-heart-fill"
                              : "bi bi-heart"
                          }
                        ></i>
                      </button>
                    )}
                  </td>
                )}

                <td className="title-cell">
                  {highlightText(offer.title, search)}
                </td>

                <td>
                  <div
                    className="description-cell"
                    title={offer.description || ""}
                  >
                    {highlightText(offer.description || "—", search)}
                  </div>
                </td>

                <td>
                  <Tag type="category" value={offer.category} size="sm" />
                </td>

                <td>{highlightText(offer.city || "—", search)}</td>

                <td>{offer.region || "—"}</td>

                <td>{getQuantityLabel(offer.availableQuantity)}</td>

                <td>
                  <Tag type="status" value={offer.status} size="sm" />
                </td>

                <td>{formatDate(offer.availableUntil)}</td>

                <td className="table-actions-cell">
                  <div className="table-actions-wrapper">
                    {user && canManage && (
                      <>
                        <button
                          className="table-edit-btn"
                          title="ערוך"
                          onClick={() => navigate(`/edit-offer/${offer._id}`)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>

                        <button
                          className="table-delete-btn"
                          title="מחק"
                          onClick={() => removeOffer(offer._id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </>
                    )}

                    <Link
                      to={`/details-offer/${offer._id}`}
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

export default OffersTable;
