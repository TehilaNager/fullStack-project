import httpService from "./httpService";

async function getAllRequests() {
    const requests = await httpService.get("api/requests");
    console.log(requests);
};

const requestService = {
    getAllRequests
};

export default requestService;