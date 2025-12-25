import { createContext, useContext, useEffect, useState } from "react";
import offerService from "../services/offerService";

const offerContext = createContext();
offerContext.displayName = "Offer";

export function OfferProvider({ children }) {
  const [offers, setOffers] = useState();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const allOffers = await offerService.getAllOffers();
        setOffers(allOffers);
      } catch (error) {
        console.log("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <offerContext.Provider value={{ offers, setOffers }}>
      {children}
    </offerContext.Provider>
  );
}

export function useOffer() {
  return useContext(offerContext);
}
