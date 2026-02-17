import "./offers-table.css";
import { useFavorites } from "../../context/FavoritesContext";

function OffersTable({
  offers = [],
  onRowClick,
  search,
  isFavoritePage = false,
}) {
  const { toggleOfferFavorite, isOfferFavorite } = useFavorites();

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

  const formatDate = (date) => {
    if (!date) return "לא צוין";
    return new Date(date).toLocaleDateString("he-IL");
  };

  const getQuantityLabel = (quantity) => {
    if (!quantity) return "לא צוין";
    if (quantity === 1) return "אדם אחד";
    return `${quantity} אנשים`;
  };

  return (
    <div className="table-container">
      <table className="offers-table">
        <thead>
          <tr>
            <th></th>
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
          {offers.map((offer) => (
            <tr key={offer._id}>
              <td className="table-action-column">
                {isFavoritePage ? (
                  <button
                    className="remove-favorite-btn"
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
                <span
                  className={`tag category category-${offer.category?.replace(
                    /\s/g,
                    "-",
                  )}`}
                >
                  {offer.category || "—"}
                </span>
              </td>

              <td>{highlightText(offer.city || "—", search)}</td>

              <td>{offer.region || "—"}</td>

              <td>{getQuantityLabel(offer.availableQuantity)}</td>

              <td>
                <span
                  className={`tag status status-${offer.status?.replace(
                    /\s/g,
                    "-",
                  )}`}
                >
                  {offer.status || "—"}
                </span>
              </td>

              <td>{formatDate(offer.availableUntil)}</td>

              <td>
                <button
                  className="table-details-btn"
                  onClick={() => onRowClick(offer._id)}
                >
                  לפרטים
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OffersTable;
