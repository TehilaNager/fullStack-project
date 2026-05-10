import "./not-found.css";

function NotFound({ icon = "bi-exclamation-circle", text = "לא נמצא מידע" }) {
  return (
    <div className="not-found">
      <i className={`bi ${icon} not-found-icon`}></i>
      <p className="not-found-text">{text}</p>
    </div>
  );
}

export default NotFound;
