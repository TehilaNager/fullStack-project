import { createContext, useContext, useEffect, useState } from "react";
import requestService from "../services/requestService";

const RequestContext = createContext();
RequestContext.displayName = "Request";

export function RequestProvider({ children }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const AllRequests = await requestService.getAllRequests();
        setRequests(AllRequests);
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

  return (
    <RequestContext.Provider value={{ requests, setRequests, createRequest }}>
      {children}
    </RequestContext.Provider>
  );
}

export function useRequest() {
  return useContext(RequestContext);
}
