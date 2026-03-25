import httpService from "./httpService";

async function getAllOffers() {
    try {
        const offers = await httpService.get("/offers");
        return offers.data;
    } catch (error) {
        console.error("Error fetching all offers:", error);
    }
}

async function getMyOffers(userId) {
    try {
        const offers = await httpService.get(`/offers/my/${userId}`);
        return offers.data;
    } catch (error) {
        console.error(`Error fetching offers for user ${userId}:`, error);
    }
}

async function createOffer(values) {
    try {
        const newOffer = await httpService.post("/offers", values);
        return newOffer.data;
    } catch (error) {
        console.error("Error creating offer:", error);
    }
}

async function deleteOffer(id) {
    try {
        const deletedOffer = await httpService.delete(`/offers/${id}`);
        return deletedOffer.data;
    } catch (error) {
        console.error(`Error deleting offer with id ${id}:`, error);
    }
}


const offerService = {
    getAllOffers,
    getMyOffers,
    createOffer,
    deleteOffer
};

export default offerService;