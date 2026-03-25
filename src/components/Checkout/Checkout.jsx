import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder, getAddresses, getApiErrorMessage } from "../../ApiService/api";
import { clearCart } from "../../cartSlice";
import { clearOrder, setPaymentMethod } from "../../orderSlice";
import "./Checkout.css";

const Checkout = () => {
    const order = useSelector((state) => state.order);
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState(order.paymentMethod || null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState("");
    const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const isSingleProductCheckout = Boolean(order.product);
    const checkoutItems = isSingleProductCheckout
        ? [
              {
                  id: order.product.id ?? "direct-order",
                  productId: order.product.id,
                  title: order.product.title,
                  image: order.product.image,
                  price: order.product.price,
                  quantity: order.quantity,
              },
          ]
        : cartItems;

    const totalPrice = isSingleProductCheckout
        ? order.totalPrice
        : checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0);

    useEffect(() => {
        const loadAddresses = async () => {
            try {
                setIsLoadingAddresses(true);
                const savedAddresses = await getAddresses();
                setAddresses(savedAddresses);

                const defaultAddress = savedAddresses.find((address) => address.isDefault);
                setSelectedAddressId(defaultAddress?.id || savedAddresses[0]?.id || "");
            } catch (error) {
                const message = getApiErrorMessage(error, "Unable to load your saved addresses.");
                toast.error(message);
            } finally {
                setIsLoadingAddresses(false);
            }
        };

        loadAddresses();
    }, []);

    const handlePaymentSelect = (method) => {
        setSelectedPayment(method);
        dispatch(setPaymentMethod(method));
    };

    const handlePlaceOrder = async () => {
        if (!selectedPayment) {
            toast.error("Please select a payment method.");
            return;
        }

        if (!selectedAddressId) {
            toast.error("Please select a delivery address.");
            return;
        }

        try {
            setIsPlacingOrder(true);

            await createOrder({
                paymentMethod: selectedPayment,
                addressId: selectedAddressId,
                items: checkoutItems.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                })),
            });

            if (!isSingleProductCheckout) {
                dispatch(clearCart());
            }

            toast.success(`Order placed successfully with ${selectedPayment.toUpperCase()}.`);
            dispatch(clearOrder());
            navigate("/profile?section=my-orders");
        } catch (error) {
            const message = getApiErrorMessage(error, "Unable to complete checkout right now.");
            toast.error(message);
        } finally {
            setIsPlacingOrder(false);
        }
    };

    if (checkoutItems.length === 0) {
        return (
            <div className="checkout-container">
                <div className="checkout-summary checkout-empty-state">
                    <h2>No items available for checkout</h2>
                    <p>Add products to your cart or use Buy Now from a product page.</p>
                    <button className="back-btn" onClick={() => navigate("/")}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-summary">
                <h2>Order Summary</h2>

                <div className="checkout-items">
                    {checkoutItems.map((item) => (
                        <div className="checkout-summary-item" key={item.id}>
                            <div className="summary-product-image">
                                <img src={item.image} alt={item.title} />
                            </div>

                            <div className="summary-details">
                                <h3 className="summary-title">{item.title}</h3>
                                <p className="summary-price">Price: Rs. {item.price}</p>
                                <p className="summary-quantity">Quantity: {item.quantity}</p>
                                <p className="summary-line-total">Subtotal: Rs. {item.price * item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <hr className="summary-divider" />
                <p className="summary-total">
                    <strong>Total: Rs. {totalPrice}</strong>
                </p>
            </div>

            <div className="checkout-payment">
                <h2>Select Delivery Address</h2>

                {isLoadingAddresses ? (
                    <div className="checkout-info-box">Loading saved addresses...</div>
                ) : null}

                {!isLoadingAddresses && addresses.length === 0 ? (
                    <div className="checkout-info-box">
                        <p>You do not have a saved delivery address yet.</p>
                        <button
                            className="manage-address-btn"
                            onClick={() => navigate("/profile?section=address-book")}
                        >
                            Add Address
                        </button>
                    </div>
                ) : null}

                {!isLoadingAddresses && addresses.length > 0 ? (
                    <div className="checkout-address-list">
                        {addresses.map((address) => (
                            <label
                                key={address.id}
                                className={`checkout-address-option ${selectedAddressId === address.id ? "selected" : ""}`}
                            >
                                <input
                                    type="radio"
                                    name="delivery-address"
                                    value={address.id}
                                    checked={selectedAddressId === address.id}
                                    onChange={() => setSelectedAddressId(address.id)}
                                />

                                <div className="checkout-address-content">
                                    <div className="checkout-address-top">
                                        <h4>{address.fullName}</h4>
                                        {address.isDefault ? (
                                            <span className="checkout-address-badge">Default</span>
                                        ) : null}
                                    </div>
                                    <p>{address.phone}</p>
                                    <p>
                                        {address.line1}
                                        {address.line2 ? `, ${address.line2}` : ""}
                                    </p>
                                    <p>
                                        {address.city}, {address.state} - {address.postalCode}
                                    </p>
                                    <p>{address.country}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                ) : null}

                <button
                    className="manage-address-btn secondary"
                    onClick={() => navigate("/profile?section=address-book")}
                >
                    Manage Addresses
                </button>

                <h2>Select Payment Method</h2>

                <label className={`payment-option ${selectedPayment === "cod" ? "selected" : ""}`}>
                    <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={selectedPayment === "cod"}
                        onChange={() => handlePaymentSelect("cod")}
                    />
                    <div className="payment-content">
                        <h4>Cash on Delivery</h4>
                        <p>Pay when your order arrives</p>
                    </div>
                </label>

                <label className={`payment-option ${selectedPayment === "upi" ? "selected" : ""}`}>
                    <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={selectedPayment === "upi"}
                        onChange={() => handlePaymentSelect("upi")}
                    />
                    <div className="payment-content">
                        <h4>UPI</h4>
                        <p>Pay instantly using your UPI app</p>
                    </div>
                </label>

                <label className={`payment-option ${selectedPayment === "card" ? "selected" : ""}`}>
                    <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={selectedPayment === "card"}
                        onChange={() => handlePaymentSelect("card")}
                    />
                    <div className="payment-content">
                        <h4>Credit / Debit Card</h4>
                        <p>Pay securely using your card</p>
                    </div>
                </label>

                <button
                    className="place-order-btn"
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder || isLoadingAddresses || addresses.length === 0}
                >
                    {isPlacingOrder ? "Placing Order..." : "Place Order"}
                </button>

                <button className="back-btn" onClick={() => navigate(-1)} disabled={isPlacingOrder}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default Checkout;
