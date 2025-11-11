import httpService from "./httpService";

async function createUser(values) {
    const response = await httpService.post("/auth/register", values);
    return response.data;
}

async function login(values) {
    const response = await httpService.post("/auth/login", values);
    return response.data;
}

const userService = {
    createUser,
    login
}

export default userService;