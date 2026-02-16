import { Link } from "react-router";
import "./favorites-empty-actions.css";

function FavoritesEmptyActions({ showOffers, showRequests }) {
  return (
    <div className="favorites-empty-actions">
      {showOffers && (
        <Link to="/offers" className="favorites-action-btn">
          <span>לעמוד התרומות</span>
          <i className="bi bi-arrow-left-short"></i>
        </Link>
      )}

      {showRequests && (
        <Link to="/requests" className="favorites-action-btn secondary">
          <span>לעמוד הבקשות</span>
          <i className="bi bi-arrow-left-short favorites-action-icon"></i>
        </Link>
      )}
    </div>
  );
}

export default FavoritesEmptyActions;
