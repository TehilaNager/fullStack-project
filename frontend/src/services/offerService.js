import httpService from "./httpService";

async function getAllOffers() {
    const offers = await httpService.get("/offers");
    return offers.data;
}

async function createOffer(values) {
    const newOffer = await httpService.post("/offers", values);
    return newOffer.data;
}

async function deleteOffer(id) {
    const deletedOffer = await httpService.delete(`/offers/${id}`);
    return deletedOffer.data;
}

const offerService = {
    getAllOffers,
    createOffer,
    deleteOffer
};

export default offerService;