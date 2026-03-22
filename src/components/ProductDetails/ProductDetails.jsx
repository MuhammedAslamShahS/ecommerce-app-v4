import "./ProductDetails.css";
import { useEffect, useState } from "react";
import { getProductId } from "../../ApiService/api";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOrderData } from "../../orderSlice";
import { addToCart } from "../../cartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
    // Router hooks
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Redux hooks
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // Fetched product details temporarily stored
    const [productDetails, setProductDetails] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showCartPrompt, setShowCartPrompt] = useState(false);

    // If user is not logged in, send them to login page
    // and keep the current page in state for redirect after login

    const requireLogin = () => {
        toast.info("Please log in to continue.");
        navigate("/login", { state: { from: location } });
    };

    // Fetching product details based on id
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const data = await getProductId(id);
                setProductDetails(data);
            } catch (error) {
                console.error("Error fetching product:", error);
                toast.error("Unable to load product details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    // Send the selected product directly to checkout
    const startCheckout = () => {
        dispatch(
            setOrderData({
                product: productDetails,
                quantity: quantity,
            }),
        );
        navigate("/checkout");
    };

    //  Buy Now should work only for logged-in users
    const handleBuyNow = () => {
        if (!isAuthenticated) {
            requireLogin();
            return;
        }

        setShowCartPrompt(false);
        startCheckout();
    };

    // Quantity management : Increase quantity
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    // Decrease quantity but do not allow below 1
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Add to Cart should work only for logged-in users
    const handleAddToCart = () => {
        if (!isAuthenticated) {
            requireLogin();
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

    // Move user to cart page
    const handleGoToCart = () => {
        setShowCartPrompt(false);
        navigate("/cart");
    };

    // Loading state (UI)
    if (loading) {
        return <div className="product-loading">Loading product details...</div>;
    }

    // Calculate discount and savings
    const originalPrice = productDetails.price * 2;
    const discountAmount = originalPrice - productDetails.price;
    const discountPercentage = Math.round((discountAmount / originalPrice) * 100);

    return (
        <div className="product-page-container">
            {/* BREADCRUMB / BACK BUTTON */}
            <div className="breadcrumb-section">
                <Link to="/" className="back-link">
                    ← Back to Products
                </Link>
            </div>

            {/* MAIN PRODUCT CONTAINER */}
            <div className="product-container-wrapper">
                {/* LEFT SECTION - PRODUCT IMAGE */}
                <div className="product-image-section">
                    <div className="image-container">
                        <img src={productDetails.image} alt={productDetails.title} className="product-image" />
                        {discountPercentage > 0 && <div className="discount-badge">-{discountPercentage}%</div>}
                    </div>
                </div>

                {/* RIGHT SECTION - PRODUCT DETAILS */}
                <div className="product-details-section">
                    {/* PRODUCT HEADER */}
                    <div className="product-header">
                        <h1 className="product-title">{productDetails.title}</h1>

                        {/* RATING SECTION */}
                        <div className="rating-section">
                            <div className="stars">⭐⭐⭐⭐⭐</div>
                            <span className="rating-text">4.5/5 (324 Reviews)</span>
                        </div>
                    </div>

                    {/* PRICE SECTION */}
                    <div className="price-section">
                        <div className="price-display">
                            <span className="current-price">₹ {productDetails.price}</span>
                            <span className="original-price">₹ {originalPrice}</span>
                        </div>
                        <div className="savings-info">You save ₹ {discountAmount}</div>
                    </div>

                    {/* QUANTITY SELECTOR */}
                    <div className="quantity-section">
                        <label className="quantity-label">Select Quantity:</label>
                        <div className="quantity-selector">
                            <button
                                className="quantity-btn decrement-btn"
                                onClick={handleDecrement}
                                disabled={quantity === 1}
                            >
                                −
                            </button>
                            <input type="text" className="quantity-input" value={quantity} readOnly />
                            <button className="quantity-btn increment-btn" onClick={handleIncrement}>
                                +
                            </button>
                        </div>
                        <span className="stock-available">Stock Available: 50</span>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="action-buttons">
                        <button className="btn btn-add-to-cart" onClick={handleAddToCart}>
                            🛒 ADD TO CART
                        </button>

                        <button className="btn btn-buy-now" onClick={handleBuyNow}>
                            ⚡ BUY NOW
                        </button>
                    </div>
                </div>
            </div>

            {showCartPrompt && (
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
            )}
        </div>
    );
};

export default ProductDetails;
