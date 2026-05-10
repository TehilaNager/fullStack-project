import "./floating-chat-button.css";

function FloatingChatButton({
  onClick,
  visible = true,
  title = "שליחת הודעה",
}) {
  if (!visible) return null;

  return (
    <button
      className="floating-chat-btn"
      onClick={onClick}
      title={title}
      aria-label={title}
    >
      <i className="bi bi-chat-dots"></i>
    </button>
  );
}

export default FloatingChatButton;
