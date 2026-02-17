import { createContext, useContext, useEffect, useState } from "react";
import requestService from "../services/requestService";

const RequestContext = createContext();
RequestContext.displayName = "Request";

export function RequestProvider({ children }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const allRequests = await requestService.getAllRequests();
        setRequests(allRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const createRequest = async (values) => {
    try {
      const newRequest = await requestService.createRequest(values);
      setRequests((prev) => [...prev, newRequest]);
      return newRequest;
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  const removeRequest = async (id) => {
    try {
      await requestService.deleteRequest(id);
      setRequests((prev) => prev.filter((request) => request._id !== id));
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  return (
    <RequestContext.Provider
      value={{ requests, setRequests, createRequest, removeRequest }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export function useRequest() {
  return useContext(RequestContext);
}
