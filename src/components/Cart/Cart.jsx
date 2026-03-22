import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../cartSlice";
import { clearOrder } from "../../orderSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  const handleCheckout = () => {
    dispatch(clearOrder());
    toast.info("Proceeding to checkout.");
    navigate("/checkout");
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
    toast.info("Item removed from cart.");
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-page">
        <h2 className="cart-empty-title">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-list">
          <div className="cart-header">
            <h2 className="cart-title">My Cart</h2>
            <p className="cart-subtitle">{cartItems.length} item(s)</p>
          </div>

          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.title}
              />

              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>

                <div className="cart-quantity-section">
                  <span className="cart-quantity-label">Quantity</span>

                  <div className="cart-quantity-selector">
                    <button
                      className="cart-quantity-btn"
                      onClick={() => handleDecrement(item)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>

                    <input
                      type="text"
                      className="cart-quantity-input"
                      value={item.quantity}
                      readOnly
                    />

                    <button
                      className="cart-quantity-btn"
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <p className="cart-item-price">Price: Rs. {item.price}</p>
                <p className="cart-item-quantity">
                  Subtotal: Rs. {item.price * item.quantity}
                </p>
              </div>

              <button
                className="cart-remove-btn"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3 className="cart-summary-title">Order Summary</h3>
          <p className="cart-summary-total">Total: Rs. {totalPrice}</p>
          <button
            className="cart-checkout-btn"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
