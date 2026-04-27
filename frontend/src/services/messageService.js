import httpService from "./httpService";

async function getUserThreads(userId) {
    try {
        const threads = await httpService.get(`/messages/user/${userId}`);
        return threads.data;
    } catch (error) {
        console.error(`Error fetching threads for user ${userId}:`, error);
        throw error;
    }
}

async function getThreadById(threadId) {
    try {
        const thread = await httpService.get(`/messages/thread/${threadId}`);
        return thread.data;
    } catch (error) {
        console.error(`Error fetching thread with id ${threadId}:`, error);
        throw error;
    }
}

async function createOrGetThread(threadData) {
    try {
        const response = await httpService.post("/messages/thread", threadData);
        return response.data;
    } catch (error) {
        console.error("Error creating/getting thread:", error);
        throw error;
    }
}

async function sendMessageToThread(threadId, content) {
    try {
        const response = await httpService.post(`/messages/thread/${threadId}/message`, { content });
        return response.data;
    } catch (error) {
        console.error(`Error sending message to thread ${threadId}:`, error);
        throw error;
    }
}

async function deleteMessageFromThread(threadId, messageId) {
    try {
        const response = await httpService.delete(
            `/messages/thread/${threadId}/message/${messageId}`
        );
        return response.data;
    } catch (error) {
        console.error(
            `Error deleting message ${messageId} from thread ${threadId}:`,
            error
        );
        throw error;
    }
}

async function updateMessage(threadId, messageId, newContent) {
    try {
        const response = await httpService.put(
            `/messages/thread/${threadId}/message/${messageId}`,
            { content: newContent }
        );
        return response.data;
    } catch (error) {
        console.error(
            `Error updating message ${messageId} in thread ${threadId}:`,
            error
        );
        throw error;
    }
}



const messageService = {
    getUserThreads,
    getThreadById,
    createOrGetThread,
    sendMessageToThread,
    deleteMessageFromThread,
    updateMessage
};

export default messageService;