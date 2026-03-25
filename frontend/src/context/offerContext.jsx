import { createContext, useContext, useEffect, useState } from "react";
import offerService from "../services/offerService";
import { useAuth } from "./AuthContext";

const OfferContext = createContext();
OfferContext.displayName = "Offer";

export function OfferProvider({ children }) {
  const [offers, setOffers] = useState([]);
  const [myOffers, setMyOffers] = useState([]);
  const { user } = useAuth();

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

  const fetchMyOffers = async (userId) => {
    try {
      const my = await offerService.getMyOffers(userId);
      setMyOffers(my);
    } catch (error) {
      console.error(`Error fetching offers for user ${userId}:`, error);
    }
  };

  const createOffer = async (values) => {
    try {
      const newOffer = await offerService.createOffer(values);
      setOffers((prev) => [...prev, newOffer]);

      if (user) {
        const supporterId = newOffer.supporter?._id || newOffer.supporter;
        if (supporterId.toString() === user._id.toString()) {
          setMyOffers((prev) => [...prev, newOffer]);
        }
      }

      return newOffer;
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  const removeOffer = async (id) => {
    try {
      await offerService.deleteOffer(id);
      setOffers((prev) => prev.filter((offer) => offer._id !== id));
      setMyOffers((prev) => prev.filter((offer) => offer._id !== id));
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  return (
    <OfferContext.Provider
      value={{
        offers,
        setOffers,
        myOffers,
        setMyOffers,
        fetchMyOffers,
        createOffer,
        removeOffer,
      }}
    >
      {children}
    </OfferContext.Provider>
  );
}

export function useOffer() {
  return useContext(OfferContext);
}
