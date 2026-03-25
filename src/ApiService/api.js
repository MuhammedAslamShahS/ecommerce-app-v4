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
        joinedAt: user.createdAT || user.joinedAt || null,
        orderCount: Number(user?._count?.orders || user.orderCount || 0),
        wishlistCount: Number(user?._count?.wishlistItems || user.wishlistCount || 0),
        cartCount: Number(user?._count?.cartItems || user.cartCount || 0),
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

const normalizeAddress = (address) => {
    if (!address) {
        return null;
    }

    return {
        ...address,
        fullName: address.fullName || "",
        phone: address.phone || "",
        line1: address.line1 || "",
        line2: address.line2 || "",
        city: address.city || "",
        state: address.state || "",
        postalCode: address.postalCode || "",
        country: address.country || "",
        isDefault: Boolean(address.isDefault),
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

const normalizeCartItem = (cartItem) => {
    if (!cartItem) {
        return null;
    }

    const product = normalizeProduct(cartItem.product);

    return {
        id: cartItem.id,
        productId: cartItem.productId || product?.id,
        title: product?.title || "",
        price: Number(product?.price || 0),
        image: product?.image || "",
        quantity: Number(cartItem.quantity || 1),
        product,
    };
};

const normalizeOrderItem = (orderItem) => {
    if (!orderItem) {
        return null;
    }

    return {
        ...orderItem,
        image: orderItem.imageUrl || "",
        price: Number(orderItem.price || 0),
        quantity: Number(orderItem.quantity || 1),
    };
};

const normalizeOrder = (order) => {
    if (!order) {
        return null;
    }

    return {
        ...order,
        totalAmount: Number(order.totalAmount || 0),
        items: Array.isArray(order.items) ? order.items.map(normalizeOrderItem) : [],
        shippingAddress: normalizeAddress(order.shippingAddress),
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

const getCurrentUserProfile = async () => {
    const response = await apiClient.get("/auth/me", buildAuthConfig());
    return normalizeUser(response.data?.data?.user);
};

const getAddresses = async () => {
    const response = await apiClient.get("/addresses", buildAuthConfig());
    const addresses = response.data?.data?.addresses || [];

    return addresses.map(normalizeAddress);
};

const createAddress = async (addressData) => {
    const response = await apiClient.post("/addresses", addressData, buildAuthConfig());
    return normalizeAddress(response.data?.data?.address);
};

const updateAddress = async (addressId, addressData) => {
    const response = await apiClient.patch(
        `/addresses/${addressId}`,
        addressData,
        buildAuthConfig(),
    );

    return normalizeAddress(response.data?.data?.address);
};

const deleteAddress = async (addressId) => {
    const response = await apiClient.delete(`/addresses/${addressId}`, buildAuthConfig());
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

const getCartItems = async () => {
    const response = await apiClient.get("/cart", buildAuthConfig());
    const cartItems = response.data?.data?.cartItems || [];

    return cartItems.map(normalizeCartItem);
};

const addProductToCart = async (productId, quantity = 1) => {
    const response = await apiClient.post(
        "/cart",
        { productId, quantity },
        buildAuthConfig(),
    );

    return normalizeCartItem(response.data?.data?.cartItem);
};

const updateCartItemQuantity = async (productId, quantity) => {
    const response = await apiClient.patch(
        `/cart/${productId}`,
        { quantity },
        buildAuthConfig(),
    );

    return normalizeCartItem(response.data?.data?.cartItem);
};

const removeProductFromCart = async (productId) => {
    const response = await apiClient.delete(`/cart/${productId}`, buildAuthConfig());
    return response.data;
};

const createOrder = async ({ paymentMethod, items, addressId }) => {
    const response = await apiClient.post(
        "/orders",
        { paymentMethod, items, addressId },
        buildAuthConfig(),
    );

    return normalizeOrder(response.data?.data?.order);
};

const getMyOrders = async () => {
    const response = await apiClient.get("/orders", buildAuthConfig());
    const orders = response.data?.data?.orders || [];

    return orders.map(normalizeOrder);
};

export {
    addProductToWishlist,
    addProductToCart,
    apiClient,
    buildAuthConfig,
    createAddress,
    createOrder,
    deleteAddress,
    getAllProducts,
    getAddresses,
    getApiErrorMessage,
    getCartItems,
    getCurrentUserProfile,
    getMyOrders,
    getProductId,
    getWishlistItems,
    loginUser,
    logoutUser,
    removeProductFromCart,
    removeProductFromWishlist,
    registerUser,
    updateAddress,
    updateCartItemQuantity,
};
