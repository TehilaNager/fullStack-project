import { useParams } from "react-router";
import "./messages-page.css";
import { useAuth } from "../../context/AuthContext";
import { useMessage } from "../../context/MessageContext";
import ChatList from "../../components/messages/ChatList/ChatList";
import { useEffect, useMemo } from "react";
import formatThreadTime from "../../helpers/formatThreadTime";
import ChatWindow from "../../components/messages/ChatWindow/ChatWindow";

function MessagesPage() {
  const { threadId } = useParams();
  const { user } = useAuth();
  const {
    threads,
    loading,
    error,
    fetchUserThreads,
    currentThread,
    fetchThreadById,
    sendMessage,
  } = useMessage();

  useEffect(() => {
    if (threadId) {
      fetchThreadById(threadId);
    }
  }, [threadId]);

  useEffect(() => {
    if (user?._id) {
      fetchUserThreads(user._id);
    }
  }, [user?._id]);

  const uiThreads = useMemo(() => {
    return threads.map((thread) => {
      const otherParticipant = thread.participants?.find(
        (participant) => participant._id !== user?._id,
      );

      const lastMessageObj = thread.messages?.[thread.messages.length - 1];

      const lastMessageText = lastMessageObj
        ? lastMessageObj.sender._id === user?._id
          ? `את/ה: ${lastMessageObj.content}`
          : `${otherParticipant?.fullName || "משתמש"}: ${lastMessageObj.content}`
        : "אין הודעות עדיין";

      return {
        _id: thread._id,
        name: otherParticipant?.fullName || "",
        title: thread.relatedId?.title || "שיחה על בקשה/תרומה",
        lastMessage: lastMessageText,
        time: formatThreadTime(lastMessageObj?.updatedAt || thread.updatedAt),
        relatedType: thread.relatedType,
      };
    });
  }, [threads, user?._id]);

  return (
    <div className="messages-layout">
      <div className={`chat-list ${threadId ? "hide-mobile" : ""}`}>
        <ChatList threads={uiThreads} loading={loading} error={error} />
      </div>

      <div className={`chat-window ${!threadId ? "hide-mobile" : ""}`}>
        {threadId ? (
          currentThread ? (
            <ChatWindow
              thread={currentThread}
              initialMessages={currentThread.messages}
              currentUserId={user?._id}
              onSendMessage={async (text) => {
                if (!currentThread) return [];
                try {
                  const updatedThread = await sendMessage(
                    currentThread._id,
                    text,
                  );
                  return updatedThread.messages;
                } catch (err) {
                  return null;
                }
              }}
            />
          ) : (
            <div className="chat-loading">
              <i className="chat-loading-icon bi bi-arrow-repeat"></i>
              <p className="chat-empty-text">טוען שיחה...</p>
            </div>
          )
        ) : (
          <div className="chat-placeholder">
            <i className="chat-placeholder-icon bi bi-chat-left-text"></i>
            <p className="chat-empty-text">לא נבחרה שיחה להצגה</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagesPage;
