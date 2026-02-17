import httpService from "./httpService";

async function getAllRequests() {
    try {
        const requests = await httpService.get("/requests");
        return requests.data;
    } catch (error) {
        console.error("Error fetching all requests:", error);
    }
}

async function createRequest(values) {
    try {
        const request = await httpService.post("/requests", values);
        return request.data;
    } catch (error) {
        console.error("Error creating request:", error);
    }
}

async function deleteRequest(id) {
    const deletedRequest = await httpService.delete(`/requests/${id}`);
    return deletedRequest.data;
}

const requestService = {
    getAllRequests,
    createRequest,
    deleteRequest
};

export default requestService;