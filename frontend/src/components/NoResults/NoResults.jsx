import "./no-results.css";

function NoResults({
  message = "לא נמצאו תוצאות בהתאם לחיפוש או לסינון שבחרת.",
  onClear,
}) {
  return (
    <div className="no-results">
      <p className="no-results-text">{message}</p>

      {onClear && (
        <button className="no-results-clear-btn" onClick={onClear}>
          נקה סינון
        </button>
      )}
    </div>
  );
}

export default NoResults;
