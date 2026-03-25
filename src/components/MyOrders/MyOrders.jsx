import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getApiErrorMessage, getMyOrders } from "../../ApiService/api";
import "./MyOrders.css";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                setIsLoading(true);
                setHasError(false);

                const savedOrders = await getMyOrders();
                setOrders(savedOrders);
            } catch (error) {
                setHasError(true);
                toast.error(getApiErrorMessage(error, "Unable to load your orders right now."));
            } finally {
                setIsLoading(false);
            }
        };

        loadOrders();
    }, []);

    if (isLoading) {
        return (
            <div className="orders-panel">
                <h2 className="orders-title">My Orders</h2>
                <p className="orders-message">Loading your orders...</p>
            </div>
        );
    }

    if (hasError) {
        return (
            <div className="orders-panel">
                <h2 className="orders-title">My Orders</h2>
                <p className="orders-message">Unable to load your orders right now.</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="orders-panel">
                <h2 className="orders-title">My Orders</h2>
                <p className="orders-message">You have not placed any orders yet.</p>
            </div>
        );
    }

    return (
        <div className="orders-panel">
            <div className="orders-header">
                <h2 className="orders-title">My Orders</h2>
                <p className="orders-subtitle">{orders.length} order(s) found</p>
            </div>

            <div className="orders-list">
                {orders.map((order) => (
                    <article className="order-card" key={order.id}>
                        <div className="order-card-top">
                            <div>
                                <p className="order-id">Order ID: {order.id}</p>
                                <p className="order-meta">
                                    Payment: {order.paymentMethod.toUpperCase()} | Total: Rs.{" "}
                                    {order.totalAmount.toFixed(2)}
                                </p>
                            </div>
                            <span className="order-status">{order.status}</span>
                        </div>

                        <div className="order-items">
                            {order.items.map((item) => (
                                <div className="order-item" key={item.id}>
                                    <div className="order-item-image-wrap">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="order-item-image"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="order-item-title">{item.title}</h3>
                                        <p className="order-item-meta">
                                            Price: Rs. {item.price.toFixed(2)}
                                        </p>
                                        <p className="order-item-meta">Quantity: {item.quantity}</p>
                                        <p className="order-item-meta">
                                            Subtotal: Rs. {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
