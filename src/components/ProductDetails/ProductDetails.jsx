import "./ProductDetails.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { getProductId } from "../../ApiService/api";
import useWishlist from "../../hooks/useWishlist";
import { setOrderData } from "../../orderSlice";
import { addToCart } from "../../cartSlice";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const { isInWishlist, isWishlistLoading, toggleWishlist } = useWishlist();

    const [productDetails, setProductDetails] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [showCartPrompt, setShowCartPrompt] = useState(false);
    const [isProductMissing, setIsProductMissing] = useState(false);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setIsLoading(true);
                setIsProductMissing(false);
                setQuantity(1);

                const product = await getProductId(id);
                setProductDetails(product);
            } catch (error) {
                console.error("Error fetching product:", error);

                if (error?.response?.status === 404) {
                    setIsProductMissing(true);
                } else {
                    toast.error("Unable to load product details.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const requireLogin = () => {
        toast.info("Please log in to continue.");
        navigate("/login", { state: { from: location } });
    };

    const availableStock = Number(productDetails?.stock ?? 0);
    const currentPrice = Number(productDetails?.price ?? 0);
    const originalPrice = currentPrice * 2;
    const discountAmount = Math.max(originalPrice - currentPrice, 0);
    const discountPercentage = originalPrice > 0 ? Math.round((discountAmount / originalPrice) * 100) : 0;
    const isOutOfStock = availableStock < 1;

    const startCheckout = () => {
        dispatch(
            setOrderData({
                product: productDetails,
                quantity,
            }),
        );

        navigate("/checkout");
    };

    const handleBuyNow = () => {
        if (!isAuthenticated) {
            requireLogin();
            return;
        }

        if (isOutOfStock) {
            toast.error("This product is currently out of stock.");
            return;
        }

        setShowCartPrompt(false);
        startCheckout();
    };

    const handleIncrement = () => {
        if (availableStock > 0 && quantity < availableStock) {
            setQuantity((currentQuantity) => currentQuantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((currentQuantity) => currentQuantity - 1);
        }
    };

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            requireLogin();
            return;
        }

        if (isOutOfStock) {
            toast.error("This product is currently out of stock.");
            return;
        }

        dispatch(
            addToCart({
                product: productDetails,
                quantity,
            }),
        );

        toast.success("Item added to cart.");
        setShowCartPrompt(true);
    };

    const handleGoToCart = () => {
        setShowCartPrompt(false);
        navigate("/cart");
    };

    const handleWishlistClick = () => {
        toggleWishlist(productDetails);
    };

    if (isLoading) {
        return <div className="product-loading">Loading product details...</div>;
    }

    if (isProductMissing || !productDetails) {
        return (
            <div className="product-loading">
                <div>
                    <p>Product not found.</p>
                    <Link to="/" className="back-link">
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="product-page-container">
            <div className="breadcrumb-section">
                <Link to="/" className="back-link">
                    Back to Products
                </Link>
            </div>

            <div className="product-container-wrapper">
                <div className="product-image-section">
                    <div className="image-container">
                        <img src={productDetails.image} alt={productDetails.title} className="product-image" />
                        {discountPercentage > 0 ? <div className="discount-badge">-{discountPercentage}%</div> : null}
                    </div>
                </div>

                <div className="product-details-section">
                    <div className="product-header">
                        <div className="product-header-top">
                            <h1 className="product-title">{productDetails.title}</h1>
                            <button
                                type="button"
                                className={`product-wishlist-btn ${isInWishlist(productDetails.id) ? "active" : ""}`}
                                onClick={handleWishlistClick}
                                disabled={isWishlistLoading}
                                aria-label={isInWishlist(productDetails.id) ? "Remove from wishlist" : "Add to wishlist"}
                            >
                                {isInWishlist(productDetails.id) ? <AiFillHeart /> : <AiOutlineHeart />}
                            </button>
                        </div>

                        <div className="rating-section">
                            <div className="stars">Rating</div>
                            <span className="rating-text">4.5/5 (324 reviews)</span>
                        </div>
                    </div>

                    <div className="price-section">
                        <div className="price-display">
                            <span className="current-price">Rs. {currentPrice.toFixed(2)}</span>
                            <span className="original-price">Rs. {originalPrice.toFixed(2)}</span>
                        </div>
                        <div className="savings-info">You save Rs. {discountAmount.toFixed(2)}</div>
                    </div>

                    <div className="quantity-section">
                        <label className="quantity-label">Select Quantity:</label>
                        <div className="quantity-selector">
                            <button
                                className="quantity-btn decrement-btn"
                                onClick={handleDecrement}
                                disabled={quantity === 1}
                            >
                                -
                            </button>
                            <input type="text" className="quantity-input" value={quantity} readOnly />
                            <button
                                className="quantity-btn increment-btn"
                                onClick={handleIncrement}
                                disabled={isOutOfStock || quantity >= availableStock}
                            >
                                +
                            </button>
                        </div>
                        <span className="stock-available">
                            {isOutOfStock ? "Currently out of stock" : `Stock Available: ${availableStock}`}
                        </span>
                    </div>

                    <div className="action-buttons">
                        <button className="btn btn-add-to-cart" onClick={handleAddToCart} disabled={isOutOfStock}>
                            ADD TO CART
                        </button>

                        <button className="btn btn-buy-now" onClick={handleBuyNow} disabled={isOutOfStock}>
                            BUY NOW
                        </button>
                    </div>
                </div>
            </div>

            {showCartPrompt ? (
                <div className="cart-action-popup-overlay" onClick={() => setShowCartPrompt(false)}>
                    <div className="cart-action-popup" onClick={(event) => event.stopPropagation()}>
                        <h3 className="cart-action-popup-title">Item added to cart</h3>
                        <p className="cart-action-popup-text">Choose what you want to do next.</p>
                        <div className="cart-action-popup-actions">
                            <button className="cart-action-btn cart-action-btn-primary" onClick={handleBuyNow}>
                                Proceed to Buy
                            </button>
                            <button className="cart-action-btn cart-action-btn-secondary" onClick={handleGoToCart}>
                                Go to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ProductDetails;
