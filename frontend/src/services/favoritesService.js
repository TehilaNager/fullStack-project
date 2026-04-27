import httpService from "./httpService";

async function toggleRequestFavorite(id) {
    try {
        const response = await httpService.patch(`/favorites/request/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error toggling request favorite with id ${id}:`, error);
    }
}

async function toggleOfferFavorite(id) {
    try {
        const response = await httpService.patch(`/favorites/offer/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error toggling offer favorite with id ${id}:`, error);
    }
}

async function getUserFavorites() {
    try {
        const response = await httpService.get("/favorites/");
        return response.data;
    } catch (error) {
        console.error("Error fetching user favorites:", error);
    }
}

const favoritesService = {
    toggleRequestFavorite,
    toggleOfferFavorite,
    getUserFavorites
};

export default favoritesService;