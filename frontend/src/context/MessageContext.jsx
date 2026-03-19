import { createContext, useContext, useState } from "react";
import messageService from "../services/messageService";

const MessageContext = createContext();
MessageContext.displayName = "Message";

export function MessageProvider({ children }) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentThread, setCurrentThread] = useState(null);

  const fetchUserThreads = async (userId) => {
    try {
      setLoading(true);
      setError("");
      const data = await messageService.getUserThreads(userId);
      setThreads(data);
      return data;
    } catch (err) {
      console.error("Failed to fetch user threads:", err);
      const errorMessage = err.response?.data || "אירעה שגיאה בטעינת הצ'אטים";
      setError(errorMessage);
      setThreads([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchThreadById = async (threadId) => {
    try {
      setLoading(true);
      setError("");
      const data = await messageService.getThreadById(threadId);
      setCurrentThread(data);
      return data;
    } catch (err) {
      console.error("Failed to fetch thread:", err);
      const errorMessage = err.response?.data || "אירעה שגיאה בטעינת השיחה";
      setError(errorMessage);
      setCurrentThread(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (threadId, content) => {
    try {
      setError("");
      const updatedThread = await messageService.sendMessageToThread(
        threadId,
        content,
      );

      setCurrentThread(updatedThread);

      setThreads((prevThreads) =>
        prevThreads.map((thread) =>
          thread._id === updatedThread._id ? updatedThread : thread,
        ),
      );

      return updatedThread;
    } catch (err) {
      console.error("Failed to send message:", err);
      const errorMessage = err.response?.data || "אירעה שגיאה בשליחת ההודעה";
      setError(errorMessage);
      throw err;
    }
  };

  return (
    <MessageContext.Provider
      value={{
        threads,
        setThreads,
        currentThread,
        setCurrentThread,
        loading,
        error,
        fetchUserThreads,
        fetchThreadById,
        sendMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  return useContext(MessageContext);
}
