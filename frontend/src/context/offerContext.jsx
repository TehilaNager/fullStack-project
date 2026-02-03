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

  const createOffer = async (values) => {
    try {
      const newOffer = await offerService.createOffer(values);
      setOffers((prev) => [...prev, newOffer]);
      return newOffer;
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  return (
    <OfferContext.Provider value={{ offers, setOffers, createOffer }}>
      {children}
    </OfferContext.Provider>
  );
}

export function useOffer() {
  return useContext(OfferContext);
}
