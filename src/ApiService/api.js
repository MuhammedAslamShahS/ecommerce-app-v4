import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // allow refresh token cookie
});

// Products
export const getAllProducts = async () => {
    const { data } = await api.get("/products");
    return data;
};

export const getProductId = async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
};

// Auth
export const signup = async ({ name, email, password }) => {
    const { data } = await api.post("/auth/signup", { name, email, password });
    return data; // { user, accessToken, refreshToken }
};

export const login = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", { email, password });
    return data; // { user, accessToken, refreshToken }
};

export const me = async (accessToken) => {
    const { data } = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data; // { user }
};

export const refresh = async () => {
    const { data } = await api.post("/auth/refresh", {});
    return data; // { user, accessToken }
};
