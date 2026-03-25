import { Link } from "react-router";
import "./my-items-empty-actions.css";

function MyItemsEmptyActions({ showOffers, showRequests }) {
  return (
    <div className="my-items-empty-actions">
      {showOffers && (
        <Link to="/create-offer" className="my-items-action-btn offer-btn">
          <span>+</span>
          <span>צור תרומה</span>
        </Link>
      )}

      {showRequests && (
        <Link to="/create-request" className="my-items-action-btn request-btn">
          <span>+</span>
          <span>צור בקשה</span>
        </Link>
      )}
    </div>
  );
}

export default MyItemsEmptyActions;
