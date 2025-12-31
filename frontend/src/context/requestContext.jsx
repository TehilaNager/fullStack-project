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

  return (
    <RequestContext.Provider value={{ requests, setRequests }}>
      {children}
    </RequestContext.Provider>
  );
}

export function useRequest() {
  return useContext(RequestContext);
}
