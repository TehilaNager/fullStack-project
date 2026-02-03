import httpService from "./httpService";

async function getAllOffers() {
    const offers = await httpService.get("/offers");
    return offers.data;
}

async function createOffer(values) {
    const newOffer = await httpService.post("/offers", values);
    return newOffer.data;
}


const offerService = {
    getAllOffers,
    createOffer
};

export default offerService;