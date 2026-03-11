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

  const updateRequestStatus = async (id, status) => {
    try {
      const updatedRequest = await requestService.updateRequestStatus(
        id,
        status,
      );
      setRequests((prev) =>
        prev.map((request) =>
          request._id === id
            ? { ...request, status: updatedRequest.status }
            : request,
        ),
      );
      return updatedRequest;
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  return (
    <RequestContext.Provider
      value={{
        requests,
        setRequests,
        createRequest,
        removeRequest,
        updateRequestStatus,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export function useRequest() {
  return useContext(RequestContext);
}
