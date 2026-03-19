import httpService from "./httpService";

async function getUserThreads(userId) {
    const threads = await httpService.get(`/messages/user/${userId}`);
    return threads.data;
}

async function getThreadById(threadId) {
    const thread = await httpService.get(`/messages/thread/${threadId}`);
    return thread.data;
}

async function sendMessageToThread(threadId, content) {
    const response = await httpService.post(`/messages/thread/${threadId}/message`, { content });
    return response.data;
}

const messageService = {
    getUserThreads,
    getThreadById,
    sendMessageToThread
};

export default messageService;