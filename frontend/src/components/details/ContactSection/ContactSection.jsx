import "./contact-section.css";

function ContactSection({
  type = "request",
  phone,
  email,
  hasUser,
  canUseChat,
  onChatClick,
}) {
  const hasDirectContact = phone || email;

  return (
    <div className={`contact-section ${type}`}>
      <div className="contact-card">
        {hasDirectContact && (
          <div className="contact-methods">
            <a
              href={phone ? `tel:${phone}` : "#"}
              className="contact-item contact-link"
              aria-disabled={!phone}
            >
              <i className="bi bi-telephone contact-item-icon"></i>
              <div className="contact-texts">
                <span className="contact-value">{phone || "לא צוין"}</span>
              </div>
            </a>

            <a
              href={email ? `mailto:${email}` : "#"}
              className="contact-item contact-link"
              aria-disabled={!email}
            >
              <i className="bi bi-envelope contact-item-icon"></i>
              <div className="contact-texts">
                <span className="contact-value">{email || "לא צוין"}</span>
              </div>
            </a>
          </div>
        )}

        {!phone && !email && (
          <div
            className={`contact-empty-note ${!hasUser ? "contact-unavailable" : ""}`}
          >
            <i className="bi bi-info-circle"></i>
            <span>
              {hasUser
                ? "לא הוזנו פרטי קשר ישירים. ניתן לפנות דרך מערכת ההודעות של האתר."
                : "לא ניתן ליצור קשר כרגע — המשתמש אינו זמין."}
            </span>
          </div>
        )}

        {hasDirectContact && !hasUser && (
          <div className="contact-empty-note contact-unavailable">
            <i className="bi bi-info-circle"></i>
            <span>
              ניתן ליצור קשר רק דרך הפרטים שמופיעים כאן. המשתמש אינו זמין בצ'אט.
            </span>
          </div>
        )}

        {canUseChat && (
          <button className="contact-main-btn" onClick={onChatClick}>
            <i className="bi bi-chat-dots-fill contact-main-icon"></i>
            <span>שליחת הודעה</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default ContactSection;
