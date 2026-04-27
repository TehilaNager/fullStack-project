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

  const openThread = async (threadData) => {
    try {
      setLoading(true);
      setError("");

      const thread = await messageService.createOrGetThread(threadData);

      setCurrentThread(thread);

      setThreads((prevThreads) => {
        const filteredThreads = prevThreads.filter((t) => t._id !== thread._id);
        return [thread, ...filteredThreads];
      });

      return thread;
    } catch (err) {
      console.error("Failed to open thread:", err);
      const errorMessage = err.response?.data || "אירעה שגיאה בפתיחת השיחה";
      setError(errorMessage);
      throw err;
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

      setThreads((prevThreads) => {
        const filteredThreads = prevThreads.filter(
          (thread) => thread._id !== updatedThread._id,
        );
        return [updatedThread, ...filteredThreads];
      });

      return updatedThread;
    } catch (err) {
      console.error("Failed to send message:", err);
      const errorMessage = err.response?.data || "אירעה שגיאה בשליחת ההודעה";
      setError(errorMessage);
      throw err;
    }
  };

  const deleteMessage = async (threadId, messageId) => {
    try {
      setError("");

      const updatedThread = await messageService.deleteMessageFromThread(
        threadId,
        messageId,
      );

      setCurrentThread(updatedThread);

      setThreads((prevThreads) =>
        prevThreads.map((thread) =>
          thread._id === updatedThread._id ? updatedThread : thread,
        ),
      );

      return updatedThread;
    } catch (err) {
      console.error("Failed to delete message:", err);
      const errorMessage = err.response?.data || "אירעה שגיאה במחיקת ההודעה";
      setError(errorMessage);
      throw err;
    }
  };

  const updateMessage = async (threadId, messageId, newContent) => {
    try {
      setError("");

      const updatedThread = await messageService.updateMessage(
        threadId,
        messageId,
        newContent,
      );

      setCurrentThread(updatedThread);

      setThreads((prevThreads) =>
        prevThreads.map((thread) =>
          thread._id === updatedThread._id ? updatedThread : thread,
        ),
      );

      return updatedThread;
    } catch (err) {
      console.error("Failed to update message:", err);
      const errorMessage = err.response?.data || "אירעה שגיאה בעריכת ההודעה";
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
        openThread,
        sendMessage,
        deleteMessage,
        updateMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  return useContext(MessageContext);
}
