import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeProductFromCart } from "../../ApiService/api";
import { clearCart } from "../../cartSlice";
import { clearOrder, setPaymentMethod } from "../../orderSlice";
import "./Checkout.css";

const Checkout = () => {
    const order = useSelector((state) => state.order);
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState(order.paymentMethod || null);

    const isSingleProductCheckout = Boolean(order.product);
    const checkoutItems = isSingleProductCheckout
        ? [
              {
                  id: order.product.id ?? "direct-order",
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

    const handlePaymentSelect = (method) => {
        setSelectedPayment(method);
        dispatch(setPaymentMethod(method));
    };

    const handlePlaceOrder = async () => {
        if (!selectedPayment) {
            toast.error("Please select a payment method.");
            return;
        }

        try {
            if (!isSingleProductCheckout) {
                await Promise.all(
                    checkoutItems.map((item) => removeProductFromCart(item.productId))
                );

                dispatch(clearCart());
            }

            toast.success(`Order placed successfully with ${selectedPayment.toUpperCase()}.`);
            dispatch(clearOrder());
            navigate("/");
        } catch (error) {
            toast.error("Unable to complete checkout right now.");
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

                <button className="place-order-btn" onClick={handlePlaceOrder}>
                    Place Order
                </button>

                <button className="back-btn" onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default Checkout;
