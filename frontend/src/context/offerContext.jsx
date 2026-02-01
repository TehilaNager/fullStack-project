import { createContext, useContext, useEffect, useState } from "react";
import offerService from "../services/offerService";

const OfferContext = createContext();
OfferContext.displayName = "Offer";

export function OfferProvider({ children }) {
  const [offers, setOffers] = useState([]);

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
    <OfferContext.Provider value={{ offers, setOffers }}>
      {children}
    </OfferContext.Provider>
  );
}

export function useOffer() {
  return useContext(OfferContext);
}
