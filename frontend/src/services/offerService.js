import httpService from "./httpService";

async function getAllOffers() {
    const offers = await httpService.get("/offers");
    return offers.data;
}

const offerService = {
    getAllOffers
};

export default offerService;