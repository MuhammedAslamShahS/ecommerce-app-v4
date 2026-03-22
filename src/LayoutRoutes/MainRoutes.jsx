import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../components/Home/Home";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LogOut from "../components/LogOut/LogOut";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Checkout from "../components/Checkout/Checkout";
import Cart from "../components/Cart/Cart";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Products from "../pages/Products/Products";
import Profile from "../pages/Profile/Profile";
import ScrollToTop from "../components/ScrollToTop";
import About from "../pages/About/About";

const MainRoutes = ({ homeTopContent = null }) => {
    const location = useLocation();

    const isProfilePage = location.pathname.startsWith("/profile");

    return (
        <div className="min-h-screen flex flex-col">
            <ScrollToTop />

            {/* ❌ Header hide only for profile */}
            {!isProfilePage && <Header key={location.pathname} />}

            {!isProfilePage && location.pathname === "/" ? homeTopContent : null}

            <Routes>
                {/* Public */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Protected */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/logout" element={<LogOut />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>

            {/* ✅ Footer always show */}
            <Footer />
        </div>
    );
};

export default MainRoutes;
