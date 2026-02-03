import httpService from "./httpService";

async function toggleRequestFavorite(id) {
    const response = await httpService.patch(`/favorites/request/${id}`);
    return response.data;
}

async function toggleOfferFavorite(id) {
    const response = await httpService.patch(`/favorites/offer/${id}`);
    return response.data;
}

async function getUserFavorites() {
    const response = await httpService.get("/favorites/");
    return response.data;
}

const favoritesService = {
    toggleRequestFavorite,
    toggleOfferFavorite,
    getUserFavorites
};

export default favoritesService;