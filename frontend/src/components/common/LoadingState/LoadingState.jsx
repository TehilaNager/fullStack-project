import "./loading-state.css";

function LoadingState({ text = "טוען..." }) {
  return (
    <div className="loading-state">
      <i className="chat-loading-icon bi bi-arrow-repeat"></i>
      <p className="loading-text">{text}</p>
    </div>
  );
}

export default LoadingState;
