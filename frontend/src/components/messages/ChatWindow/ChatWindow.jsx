import "./chat-window.css";
import Swal from "sweetalert2";
import chatBg from "../../../images/chat-bg.png";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import EmojiPicker from "emoji-picker-react";
import { IoSend } from "react-icons/io5";
import { RiCloseCircleLine } from "react-icons/ri";
import { RiInformationLine } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { useMessage } from "../../../context/MessageContext";
import { formatDateTimeWithSeconds } from "../../../helpers/dateUtils";

function ChatWindow({
  thread = { name: "משתמש", title: "" },
  initialText,
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
  const { deleteMessage, updateMessage } = useMessage();
  const [openMessageMenuId, setOpenMessageMenuId] = useState(null);

  const otherParticipant = thread.participants?.find(
    (p) => p._id?.toString() !== currentUserId?.toString(),
  );

  useEffect(() => {
    if (initialText && messages.length === 0) {
      setText(initialText);
    }
  }, [initialText, messages.length]);

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

      if (!event.target.closest(".message-actions-wrapper")) {
        setOpenMessageMenuId(null);
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

  const handleMessageInfo = (msg) => {
    const created = formatDateTimeWithSeconds(msg.createdAt);
    const updated = formatDateTimeWithSeconds(msg.updatedAt);

    const wasEdited = msg.updatedAt !== msg.createdAt;

    Swal.fire({
      title: "פרטי הודעה",
      html: `
      <div style="text-align:right">
        <p><b>נשלחה:</b> ${created}</p>
        ${wasEdited ? `<p><b>נערכה:</b> ${updated}</p>` : ""}
      </div>
    `,
      confirmButtonText: "סגור",
    });
  };

  const handleCopyMessage = async (msg) => {
    try {
      await navigator.clipboard.writeText(msg.content);

      Swal.fire({
        icon: "success",
        title: "ההודעה הועתקה",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "שגיאה",
        text: "לא ניתן להעתיק את ההודעה",
      });
    }
  };

  const canEditMessage = (msg) => {
    if (!msg.createdAt) return false;

    return Date.now() - new Date(msg.createdAt).getTime() < 15 * 60 * 1000;
  };

  const handleEditMessage = async (msg) => {
    if (!canEditMessage(msg)) {
      Swal.fire({
        icon: "info",
        title: "לא ניתן לערוך",
        text: "ניתן לערוך הודעה עד 15 דקות מהשליחה",
      });
      return;
    }

    const { value: newContent } = await Swal.fire({
      title: "ערוך הודעה",
      input: "textarea",
      customClass: {
        input: "no-resize-textarea",
      },
      inputLabel: "תוכן ההודעה",
      inputValue: msg.content,
      showCancelButton: true,
      confirmButtonText: "שמור",
      cancelButtonText: "ביטול",
      showLoaderOnConfirm: true,
      preConfirm: async (content) => {
        if (content.trim() === msg.content.trim()) {
          Swal.showValidationMessage("לא בוצע שינוי בהודעה");
          return;
        }

        if (!content.trim()) {
          Swal.showValidationMessage("ההודעה לא יכולה להיות ריקה");
          return;
        }

        try {
          const updatedThread = await updateMessage(
            thread._id,
            msg._id,
            content,
          );
          return updatedThread;
        } catch (err) {
          Swal.showValidationMessage("שגיאה בעריכת ההודעה");
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (newContent) {
      setMessages(newContent.messages);
      Swal.fire({
        title: "ההודעה עודכנה",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!thread._id) return;

    const result = await Swal.fire({
      title: "למחוק את ההודעה?",
      text: "ההודעה תימחק לצמיתות אצל כולם.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "מחק",
      cancelButtonText: "ביטול",
    });

    if (!result.isConfirmed) return;

    try {
      const updatedThread = await deleteMessage(thread._id, messageId);
      setMessages(updatedThread.messages || []);

      Swal.fire({
        title: "ההודעה נמחקה",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Failed to delete message:", err);
      Swal.fire({
        title: "שגיאה",
        text: "לא ניתן למחוק את ההודעה כרגע",
        icon: "error",
      });
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
          {messages.map((msg) => {
            const isMine =
              msg.sender?._id?.toString() === currentUserId?.toString();
            const canEdit = canEditMessage(msg);
            const canCopy = msg.content?.trim();

            return (
              <div
                key={msg._id}
                className={`chat-message ${isMine ? "sent" : "received"}`}
              >
                <span className="message-content">{msg.content}</span>
                <span className="message-time">
                  {msg.updatedAt !== msg.createdAt && `נערכה`}{" "}
                  {new Date(msg.updatedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                <div className="message-actions-wrapper">
                  <button
                    type="button"
                    className="message-actions-btn"
                    onClick={() =>
                      setOpenMessageMenuId((prev) =>
                        prev === msg._id ? null : msg._id,
                      )
                    }
                  >
                    <i
                      className={`bi ${
                        openMessageMenuId === msg._id
                          ? "bi-chevron-up"
                          : "bi-chevron-down"
                      }`}
                    />
                  </button>

                  {openMessageMenuId === msg._id && (
                    <div className="message-actions-menu">
                      <button
                        type="button"
                        className="message-action-item info"
                        onClick={() => {
                          setOpenMessageMenuId(null);
                          handleMessageInfo(msg);
                        }}
                      >
                        <i className="bi bi-info-circle"></i>
                        <span>פרטי הודעה</span>
                      </button>

                      {canCopy && (
                        <button
                          type="button"
                          className="message-action-item copy"
                          onClick={() => {
                            setOpenMessageMenuId(null);
                            handleCopyMessage(msg);
                          }}
                        >
                          <i className="bi bi-copy"></i>
                          <span>העתק הודעה</span>
                        </button>
                      )}

                      {isMine && canEdit && (
                        <button
                          type="button"
                          title="ניתן לערוך עד 15 דקות"
                          className="message-action-item edit"
                          onClick={() => {
                            setOpenMessageMenuId(null);
                            handleEditMessage(msg);
                          }}
                        >
                          <i className="bi bi-pencil"></i>
                          <span>עריכת הודעה</span>
                        </button>
                      )}

                      {isMine && (
                        <button
                          type="button"
                          className="message-action-item delete"
                          onClick={() => {
                            setOpenMessageMenuId(null);
                            handleDeleteMessage(msg._id);
                          }}
                        >
                          <i className="bi bi-trash"></i>
                          <span>מחיקת הודעה</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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

            <textarea
              className="chat-input-field"
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
