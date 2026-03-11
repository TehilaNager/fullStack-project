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
    try {
        const deletedRequest = await httpService.delete(`/requests/${id}`);
        return deletedRequest.data;
    } catch (error) {
        console.error("Error deleting request:", error);
    }
}

async function updateRequestStatus(id, status) {
    try {
        const updatedRequest = await httpService.patch(`/requests/${id}/status`, { status });
        return updatedRequest.data;
    } catch (error) {
        console.error("Error updating request status:", error);
    }
}

const requestService = {
    getAllRequests,
    createRequest,
    deleteRequest,
    updateRequestStatus
};

export default requestService;