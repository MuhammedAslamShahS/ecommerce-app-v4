import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { cancelOrder, getApiErrorMessage, getMyOrders } from "../../ApiService/api";
import "./MyOrders.css";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [expandedOrderIds, setExpandedOrderIds] = useState({});
    const [cancellingOrderId, setCancellingOrderId] = useState(null);

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

    const toggleOrderDetails = (orderId) => {
        setExpandedOrderIds((currentState) => ({
            ...currentState,
            [orderId]: !currentState[orderId],
        }));
    };

    const handleCancelOrder = async (orderId) => {
        const shouldCancel = window.confirm(
            "Do you want to cancel this order?",
        );

        if (!shouldCancel) {
            return;
        }

        try {
            setCancellingOrderId(orderId);
            const updatedOrder = await cancelOrder(orderId);

            setOrders((currentOrders) =>
                currentOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)),
            );

            toast.success("Order cancelled successfully.");
        } catch (error) {
            toast.error(
                getApiErrorMessage(error, "Unable to cancel this order right now."),
            );
        } finally {
            setCancellingOrderId(null);
        }
    };

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
                                <p className="order-meta">
                                    Placed on:{" "}
                                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                            <span className="order-status">{order.status}</span>
                        </div>

                        <div className="order-card-actions">
                            <button
                                type="button"
                                className="order-action-btn"
                                onClick={() => toggleOrderDetails(order.id)}
                            >
                                {expandedOrderIds[order.id] ? "Hide Details" : "View Details"}
                            </button>

                            {["PLACED", "PROCESSING"].includes(order.status) ? (
                                <button
                                    type="button"
                                    className="order-action-btn danger"
                                    onClick={() => handleCancelOrder(order.id)}
                                    disabled={cancellingOrderId === order.id}
                                >
                                    {cancellingOrderId === order.id ? "Cancelling..." : "Cancel Order"}
                                </button>
                            ) : null}
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

                        {expandedOrderIds[order.id] ? (
                            <div className="order-details-panel">
                                <div className="order-detail-block">
                                    <h4 className="order-detail-title">Delivery Address</h4>
                                    <p className="order-detail-text">
                                        {order.shippingAddress?.fullName}
                                    </p>
                                    <p className="order-detail-text">
                                        {order.shippingAddress?.phone}
                                    </p>
                                    <p className="order-detail-text">
                                        {order.shippingAddress?.line1}
                                        {order.shippingAddress?.line2
                                            ? `, ${order.shippingAddress.line2}`
                                            : ""}
                                    </p>
                                    <p className="order-detail-text">
                                        {order.shippingAddress?.city}, {order.shippingAddress?.state} -{" "}
                                        {order.shippingAddress?.postalCode}
                                    </p>
                                    <p className="order-detail-text">
                                        {order.shippingAddress?.country}
                                    </p>
                                </div>

                                <div className="order-detail-block">
                                    <h4 className="order-detail-title">Order Summary</h4>
                                    <p className="order-detail-text">
                                        Item count: {order.items.length}
                                    </p>
                                    <p className="order-detail-text">
                                        Payment method: {order.paymentMethod.toUpperCase()}
                                    </p>
                                    <p className="order-detail-text">
                                        Current status: {order.status}
                                    </p>
                                    <p className="order-detail-text">
                                        Total paid: Rs. {order.totalAmount.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ) : null}
                    </article>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
