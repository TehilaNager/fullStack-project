import { Link } from "react-router";
import "./favorites-empty-actions.css";

function FavoritesEmptyActions({ showOffers, showRequests }) {
  return (
    <div className="favorites-empty-actions">
      {showOffers && (
        <Link to="/offers" className="favorites-action-btn offer-btn">
          <span>לעמוד התרומות</span>
          <i className="bi bi-arrow-left-short favorites-action-icon"></i>
        </Link>
      )}

      {showRequests && (
        <Link to="/requests" className="favorites-action-btn request-btn">
          <span>לעמוד הבקשות</span>
          <i className="bi bi-arrow-left-short favorites-action-icon"></i>
        </Link>
      )}
    </div>
  );
}

export default FavoritesEmptyActions;
