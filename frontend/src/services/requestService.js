import httpService from "./httpService";

async function getAllRequests() {
    const requests = await httpService.get("/requests");
    return requests.data;
};

const requestService = {
    getAllRequests
};

export default requestService;