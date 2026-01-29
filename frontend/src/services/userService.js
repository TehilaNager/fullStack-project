import httpService from "./httpService";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

refreshToken();

async function createUser(values) {
    try {
        const response = await httpService.post("/auth/register", values);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
    }
}

async function login(values) {
    try {
        const response = await httpService.post("/auth/login", values);
        setToken(response.data.token)
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
    refreshToken();
}

function refreshToken() {
    httpService.setDefaultHeaders("x-auth-token", getToken())
}

function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function logout() {
    localStorage.removeItem(TOKEN_KEY);
    refreshToken();
}

function getUser() {
    const token = getToken();
    if (!token || typeof token !== "string") return null;

    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Invalid JWT:", error);
        return null;
    }
}


const userService = {
    createUser,
    login,
    logout,
    getUser
}

export default userService;