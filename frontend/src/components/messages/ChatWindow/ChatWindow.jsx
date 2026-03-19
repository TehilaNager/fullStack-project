import "./chat-window.css";
import chatBg from "../../../images/chat-bg.png";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import EmojiPicker from "emoji-picker-react";
import { IoSend } from "react-icons/io5";
import { RiCloseCircleLine } from "react-icons/ri";
import { RiInformationLine } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";

function ChatWindow({
  thread = { name: "משתמש", title: "" },
  initialMessages = [],
  currentUserId,
  onSendMessage,
}) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const messagesEndRef = useRef();
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef();

  const otherParticipant = thread.participants?.find(
    (p) => p._id?.toString() !== currentUserId?.toString(),
  );

  const otherName = otherParticipant?.fullName || "משתמש";

  const initial =
    otherName && otherName !== "משתמש" ? (
      otherName[0]
    ) : (
      <i className="bi bi-person-fill"></i>
    );

  const threadTitle =
    thread.relatedType === "SupportRequest" ||
    thread.relatedType === "SupportOffer"
      ? `${thread.relatedType === "SupportRequest" ? "בקשה" : "תרומה"}: ${thread.relatedId?.title || ""}`
      : thread.title || "שיחה על בקשה/תרומה";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }

      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      if (onSendMessage) {
        const updatedMessages = await onSendMessage(text.trim());
        if (updatedMessages) {
          setMessages(updatedMessages);
        }
      }

      setText("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="chat-window-wrapper">
      <div className="chat-window-header">
        <div className="chat-user-info">
          <div className="chat-user-avatar">{initial}</div>
          <div className="chat-user-details">
            <h3 className="chat-user-name">{otherName}</h3>
            <p className="chat-thread-title">{threadTitle}</p>
          </div>
        </div>

        <div className="chat-options">
          <i
            className="bi bi-three-dots-vertical"
            onClick={() => setShowOptions((prev) => !prev)}
          ></i>

          {showOptions && (
            <div className="options-dropdown" ref={optionsRef}>
              <Link
                className="option-item"
                to={
                  thread.relatedType === "SupportRequest"
                    ? `/details-request/${thread.relatedId?._id}`
                    : thread.relatedType === "SupportOffer"
                      ? `/details-offer/${thread.relatedId?._id}`
                      : "#"
                }
              >
                <RiInformationLine className="option-icon" />
                <span>
                  {thread.relatedType === "SupportRequest"
                    ? "פרטי הבקשה"
                    : thread.relatedType === "SupportOffer"
                      ? "פרטי התרומה"
                      : "פרטי השיחה"}
                </span>
              </Link>

              <Link className="option-item" to="/messages">
                <RiCloseCircleLine className="option-icon" />
                <span>סגירת הצ'אט</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="chat-body" style={{ backgroundImage: `url(${chatBg})` }}>
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`chat-message ${
                msg.sender?._id?.toString() === currentUserId?.toString()
                  ? "sent"
                  : "received"
              }`}
            >
              <span className="message-content">{msg.content}</span>
              <span className="message-time">
                {new Date(msg.updatedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-wrapper" onSubmit={handleSend}>
          <div className="input-container">
            <button
              type="button"
              className="emoji-btn"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <BsEmojiSmile />
            </button>

            {showEmojiPicker && (
              <div className="emoji-picker-wrapper" ref={emojiPickerRef}>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}

            <input
              className="chat-input-field"
              type="text"
              placeholder="הקלדת הודעה"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && text.trim()) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
            />

            {text.trim() && (
              <button type="submit" className="send-btn">
                <IoSend />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatWindow;
