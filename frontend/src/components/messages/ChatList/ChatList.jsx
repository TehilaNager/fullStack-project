import "./chat-list.css";
import { useNavigate } from "react-router";
import { useState } from "react";

function ChatList({ threads = [], loading = false, error = "" }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredThreads = threads
    .filter(
      (t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.lastMessage.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((t) => {
      if (activeTab === "all") return true;
      return t.relatedType === activeTab;
    });

  return (
    <div className="chat-list-wrapper">
      <div className="chat-search">
        <label htmlFor="search" className="icon-search">
          <i className="bi bi-search"></i>
        </label>
        <input
          id="search"
          className="input-search"
          type="text"
          placeholder="חפש צ'אט..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="chat-type-tabs">
        <button
          className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          הכל
        </button>
        <button
          className={`tab-btn ${activeTab === "SupportOffer" ? "active" : ""}`}
          onClick={() => setActiveTab("SupportOffer")}
        >
          תרומות
        </button>
        <button
          className={`tab-btn ${activeTab === "SupportRequest" ? "active" : ""}`}
          onClick={() => setActiveTab("SupportRequest")}
        >
          בקשות
        </button>
      </div>

      <div className="chat-list-scroll">
        {loading && <div className="empty-chat">טוען צ'אטים...</div>}

        {!loading && error && <div className="empty-chat">{error}</div>}

        {!loading && !error && filteredThreads.length === 0 && (
          <div className="empty-chat">אין שיחות להצגה</div>
        )}

        {!loading &&
          !error &&
          filteredThreads.map((thread) => {
            const initial = thread.name ? (
              thread.name[0]
            ) : (
              <i className="bi bi-person-fill"></i>
            );

            return (
              <div
                key={thread._id}
                className="chat-list-item"
                onClick={() => navigate(`/messages/${thread._id}`)}
              >
                <div className="chat-avatar">{initial}</div>

                <div className="chat-info">
                  <div className="chat-header">
                    <span className="chat-name">
                      {thread.name || "לא ידוע"}
                    </span>
                    <span className="chat-time">{thread.time}</span>
                  </div>

                  <div className="chat-title" title={thread.title}>
                    <span className={`chat-title-${thread.relatedType}`}>
                      {thread.relatedType === "SupportOffer"
                        ? "תרומה: "
                        : "בקשה: "}
                    </span>
                    {thread.title}
                  </div>

                  <div className="chat-last-message">{thread.lastMessage}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ChatList;
