import { Route, Routes, useLocation } from "react-router-dom";
import About from "../pages/About/About";
import Products from "../pages/Products/Products";
import Cart from "../components/Cart/Cart";
import Checkout from "../components/Checkout/Checkout";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import LogOut from "../components/LogOut/LogOut";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import ScrollToTop from "../components/ScrollToTop";
import SignUp from "../components/SignUp/SignUp";
import Profile from "../pages/Profile/Profile";

const MainRoutes = ({ homeTopContent = null }) => {
    const location = useLocation();
    const isProfilePage = location.pathname.startsWith("/profile");

    return (
        <div className="min-h-screen flex flex-col">
            <ScrollToTop />

            {!isProfilePage && <Header key={location.pathname} />}
            {!isProfilePage && location.pathname === "/" ? homeTopContent : null}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/logout" element={<LogOut />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>

            <Footer />
        </div>
    );
};

export default MainRoutes;
