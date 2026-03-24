import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
    getApiErrorMessage,
    getWishlistItems,
    removeProductFromWishlist,
} from "../../ApiService/api";
import "./WishList.css";

const WishList = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const loadWishlistItems = async () => {
            try {
                setIsLoading(true);
                setHasError(false);

                const savedWishlistItems = await getWishlistItems();
                setWishlistItems(savedWishlistItems);
            } catch (error) {
                console.error("Unable to load wishlist", error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadWishlistItems();
    }, []);

    const handleRemove = async (productId) => {
        try {
            await removeProductFromWishlist(productId);

            setWishlistItems((currentItems) =>
                currentItems.filter((wishlistItem) => wishlistItem.product?.id !== productId),
            );

            toast.success("Product removed from wishlist.");
        } catch (error) {
            const message = getApiErrorMessage(error, "Unable to remove this product right now.");
            toast.error(message);
        }
    };

    if (isLoading) {
        return (
            <div className="wishlist-panel">
                <h2 className="wishlist-title">My Wishlist</h2>
                <p className="wishlist-message">Loading your wishlist...</p>
            </div>
        );
    }

    if (hasError) {
        return (
            <div className="wishlist-panel">
                <h2 className="wishlist-title">My Wishlist</h2>
                <p className="wishlist-message">Unable to load wishlist right now.</p>
            </div>
        );
    }

    if (wishlistItems.length === 0) {
        return (
            <div className="wishlist-panel">
                <h2 className="wishlist-title">My Wishlist</h2>
                <p className="wishlist-message">Your wishlist is empty right now.</p>
                <Link to="/" className="wishlist-browse-link">
                    Browse products
                </Link>
            </div>
        );
    }

    return (
        <div className="wishlist-panel">
            <div className="wishlist-header">
                <h2 className="wishlist-title">My Wishlist</h2>
                <p className="wishlist-count">{wishlistItems.length} saved item(s)</p>
            </div>

            <div className="wishlist-grid">
                {wishlistItems.map((wishlistItem) => {
                    const product = wishlistItem.product;

                    if (!product) {
                        return null;
                    }

                    return (
                        <div className="wishlist-card" key={wishlistItem.id}>
                            <div className="wishlist-image-wrap">
                                <img src={product.image} alt={product.title} className="wishlist-image" />
                            </div>

                            <div className="wishlist-content">
                                <p className="wishlist-category">{product.category || "Uncategorized"}</p>
                                <h3 className="wishlist-product-title">{product.title}</h3>
                                <p className="wishlist-price">Rs. {Number(product.price || 0).toFixed(2)}</p>

                                <div className="wishlist-actions">
                                    <Link to={`/product/${product.id}`} className="wishlist-view-link">
                                        View Product
                                    </Link>

                                    <button
                                        type="button"
                                        className="wishlist-remove-btn"
                                        onClick={() => handleRemove(product.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WishList;
