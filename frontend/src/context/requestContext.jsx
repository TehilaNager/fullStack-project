import { createContext, useContext, useEffect, useState } from "react";
import requestService from "../services/requestService";

const requestContext = createContext();
requestContext.displayName = "Request";

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
    <requestContext.Provider value={{ requests, setRequests }}>
      {children}
    </requestContext.Provider>
  );
}

export function useRequest() {
  return useContext(requestContext);
}
