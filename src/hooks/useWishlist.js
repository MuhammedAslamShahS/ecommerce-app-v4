import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    addProductToWishlist,
    getApiErrorMessage,
    getWishlistItems,
    removeProductFromWishlist,
} from "../ApiService/api";

const useWishlist = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [wishlistItems, setWishlistItems] = useState([]);
    const [isWishlistLoading, setIsWishlistLoading] = useState(false);

    useEffect(() => {
        const loadWishlist = async () => {
            if (!isAuthenticated) {
                setWishlistItems([]);
                return;
            }

            try {
                setIsWishlistLoading(true);
                const savedWishlistItems = await getWishlistItems();
                setWishlistItems(savedWishlistItems);
            } catch (error) {
                console.error("Unable to sync wishlist", error);
            } finally {
                setIsWishlistLoading(false);
            }
        };

        loadWishlist();
    }, [isAuthenticated]);

    const isInWishlist = (productId) => {
        return wishlistItems.some((wishlistItem) => wishlistItem.product?.id === productId);
    };

    const requireLogin = () => {
        toast.info("Please log in to continue.");
        navigate("/login", { state: { from: location } });
    };

    const toggleWishlist = async (product) => {
        const productId = product?.id;

        if (!productId) {
            toast.error("Product information is missing.");
            return;
        }

        if (!isAuthenticated) {
            requireLogin();
            return;
        }

        try {
            const alreadySaved = isInWishlist(productId);

            if (alreadySaved) {
                await removeProductFromWishlist(productId);

                setWishlistItems((currentItems) =>
                    currentItems.filter((wishlistItem) => wishlistItem.product?.id !== productId),
                );

                toast.success("Product removed from wishlist.");
                return;
            }

            const newWishlistItem = await addProductToWishlist(productId);

            setWishlistItems((currentItems) => {
                const filteredItems = currentItems.filter(
                    (wishlistItem) => wishlistItem.product?.id !== newWishlistItem?.product?.id,
                );

                return [...filteredItems, newWishlistItem];
            });

            toast.success("Product added to wishlist.");
        } catch (error) {
            const message = getApiErrorMessage(error, "Unable to update wishlist right now.");
            toast.error(message);
        }
    };

    return {
        isAuthenticated,
        isInWishlist,
        isWishlistLoading,
        toggleWishlist,
        wishlistItems,
    };
};

export default useWishlist;
