import "./Cart.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getApiErrorMessage,
  getCartItems,
  removeProductFromCart,
  updateCartItemQuantity,
} from "../../ApiService/api";
import { removeCartItem, saveCartItem, setCartItems } from "../../cartSlice";
import { clearOrder } from "../../orderSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        setIsLoading(true);

        const savedCartItems = await getCartItems();
        dispatch(setCartItems(savedCartItems));
      } catch (error) {
        const message = getApiErrorMessage(error, "Unable to load your cart right now.");
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();
  }, [dispatch]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const updateItemQuantity = async (item, nextQuantity) => {
    try {
      const updatedCartItem = await updateCartItemQuantity(
        item.productId,
        nextQuantity
      );

      if (!updatedCartItem) {
        throw new Error("Updated cart item was not returned");
      }

      dispatch(saveCartItem(updatedCartItem));
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Unable to update this cart item right now."
      );
      toast.error(message);
    }
  };

  const handleIncrement = (item) => {
    updateItemQuantity(item, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateItemQuantity(item, item.quantity - 1);
    }
  };

  const handleCheckout = () => {
    dispatch(clearOrder());
    toast.info("Proceeding to checkout.");
    navigate("/checkout");
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeProductFromCart(productId);
      dispatch(removeCartItem(productId));
      toast.info("Item removed from cart.");
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Unable to remove this item right now."
      );
      toast.error(message);
    }
  };

  if (isLoading) {
    return (
      <div className="cart-empty-page">
        <h2 className="cart-empty-title">Loading your cart...</h2>
      </div>
    );
  }

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
                onClick={() => handleRemoveItem(item.productId)}
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
