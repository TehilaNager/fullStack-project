import { createContext, useContext, useEffect, useState } from "react";
import favoritesService from "../services/favoritesService";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();
FavoritesContext.displayName = "Favorites";

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favoriteOffers, setFavoriteOffers] = useState([]);
  const [favoriteRequests, setFavoriteRequests] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);

  const loadFavorites = async () => {
    if (!user) return;

    setLoadingFavorites(true);
    try {
      const data = await favoritesService.getUserFavorites();

      setFavoriteOffers((data.favoriteOffers || []).map((f) => f.offer));
      setFavoriteRequests((data.favoriteRequests || []).map((f) => f.request));
    } catch (err) {
      console.error("Failed to load favorites", err);
    } finally {
      setLoadingFavorites(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [user]);

  const toggleOfferFavorite = async (offer) => {
    try {
      await favoritesService.toggleOfferFavorite(offer._id);

      setFavoriteOffers((prev) => {
        const exists = prev.some((o) => o._id === offer._id);
        return exists
          ? prev.filter((o) => o._id !== offer._id)
          : [...prev, offer];
      });
    } catch (err) {
      console.error("Failed to toggle offer favorite", err);
    }
  };

  const toggleRequestFavorite = async (request) => {
    try {
      await favoritesService.toggleRequestFavorite(request._id);

      setFavoriteRequests((prev) => {
        const exists = prev.some((r) => r._id === request._id);
        return exists
          ? prev.filter((r) => r._id !== request._id)
          : [...prev, request];
      });
    } catch (err) {
      console.error("Failed to toggle request favorite", err);
    }
  };

  const isOfferFavorite = (offerId) =>
    favoriteOffers.some((o) => o._id === offerId);

  const isRequestFavorite = (requestId) =>
    favoriteRequests.some((r) => r._id === requestId);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteOffers,
        favoriteRequests,
        loadingFavorites,
        loadFavorites,
        toggleOfferFavorite,
        toggleRequestFavorite,
        isOfferFavorite,
        isRequestFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
