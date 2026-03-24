import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../authSlice";
import { getApiErrorMessage, logoutUser } from "../../ApiService/api";
import { clearCart } from "../../cartSlice";
import { clearOrder } from "../../orderSlice";
import "./LogOut.css";

const LogOut = () => {
    const hasHandledLogout = useRef(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            if (hasHandledLogout.current) {
                return;
            }

            hasHandledLogout.current = true;

            try {
                await logoutUser();
            } catch (error) {
                const message = getApiErrorMessage(error, "Unable to contact the server. Logging out locally.");
                toast.info(message);
            } finally {
                dispatch(clearCart());
                dispatch(clearOrder());
                dispatch(logout());
                toast.success("Logged out successfully.");
                navigate("/login", { replace: true });
            }
        };

        handleLogout();
    }, [dispatch, navigate]);

    return (
        <div className="logout-container">
            <div className="logout-content">
                <h1>You are being logged out</h1>
            </div>
        </div>
    );
};

export default LogOut;
