import httpService from "./httpService";

async function createUser(values) {
    const response = await httpService.post("/auth/register", values);
    return response.data;
}

const userService = {
    createUser
}

export default userService;