import "./not-found.css";

function NotFound({
  icon = "bi-exclamation-circle",
  message = "לא נמצא מידע",
}) {
  return (
    <div className="not-found">
      <i className={`bi ${icon} not-found-icon`}></i>
      <p className="not-found-text">{message}</p>
    </div>
  );
}

export default NotFound;
