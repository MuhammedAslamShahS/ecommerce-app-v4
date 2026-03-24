import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

const apiClient = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true,
});

const readStoredToken = () => {
    try {
        return localStorage.getItem("token");
    } catch {
        return null;
    }
};

const buildAuthConfig = () => {
    const savedToken = readStoredToken();

    if (!savedToken) {
        return {};
    }

    return {
        headers: {
            Authorization: `Bearer ${savedToken}`,
        },
    };
};

const getApiErrorMessage = (error, fallbackMessage) => {
    return error?.response?.data?.error || error?.response?.data?.message || fallbackMessage;
};

const normalizeUser = (user) => {
    if (!user) {
        return null;
    }

    return {
        ...user,
        name: user.name || user.email?.split("@")[0] || "Customer",
    };
};

const normalizeProduct = (product) => {
    if (!product) {
        return null;
    }

    return {
        ...product,
        image: product.imageUrl || "",
    };
};

const normalizeWishlistItem = (wishlistItem) => {
    if (!wishlistItem) {
        return null;
    }

    return {
        ...wishlistItem,
        product: normalizeProduct(wishlistItem.product),
    };
};

const registerUser = async ({ name, email, password }) => {
    const response = await apiClient.post("/auth/register", {
        name,
        email,
        password,
    });

    return {
        user: normalizeUser(response.data?.data?.user),
        token: response.data?.data?.token,
    };
};

const loginUser = async ({ email, password }) => {
    const response = await apiClient.post("/auth/login", {
        email,
        password,
    });

    return {
        user: normalizeUser(response.data?.data?.user),
        token: response.data?.data?.token,
    };
};

const logoutUser = async () => {
    const response = await apiClient.post("/auth/logout", {}, buildAuthConfig());
    return response.data;
};

const getAllProducts = async () => {
    const response = await apiClient.get("/products");
    const products = response.data?.data?.products || [];

    return products.map(normalizeProduct);
};

const getProductId = async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return normalizeProduct(response.data?.data?.product);
};

const getWishlistItems = async () => {
    const response = await apiClient.get("/wishlist", buildAuthConfig());
    const wishlistItems = response.data?.data?.wishlistItems || [];

    return wishlistItems.map(normalizeWishlistItem);
};

const addProductToWishlist = async (productId) => {
    const response = await apiClient.post(
        "/wishlist",
        { productId },
        buildAuthConfig(),
    );

    return normalizeWishlistItem(response.data?.data?.wishlistItem);
};

const removeProductFromWishlist = async (productId) => {
    const response = await apiClient.delete(`/wishlist/${productId}`, buildAuthConfig());
    return response.data;
};

export {
    addProductToWishlist,
    apiClient,
    buildAuthConfig,
    getAllProducts,
    getApiErrorMessage,
    getProductId,
    getWishlistItems,
    loginUser,
    logoutUser,
    removeProductFromWishlist,
    registerUser,
};
