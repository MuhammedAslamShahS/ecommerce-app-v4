import { Route, Routes, useLocation } from "react-router-dom";
import About from "../pages/About/About";
import Collections from "../pages/Collections/Collections";
import Products from "../pages/Products/Products";
import Deal from "../pages/Deals/Deal";
import DeliveryTo from "../pages/DeliveryTo/DeliveryTo";
import Cart from "../components/Cart/Cart";
import Checkout from "../components/Checkout/Checkout";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import LogOut from "../components/LogOut/LogOut";
import NewIn from "../pages/NewIn/NewIn";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import ScrollToTop from "../components/ScrollToTop";
import Sales from "../pages/Sales/Sales";
import SignUp from "../components/SignUp/SignUp";
import Profile from "../pages/Profile/Profile";
import Stores from "../pages/Stores/Stores";
import Wedding from "../pages/Wedding/Wedding";

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
                <Route path="/new-in" element={<NewIn />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/wedding" element={<Wedding />} />
                <Route path="/deals" element={<Deal />} />
                <Route path="/delivery-to" element={<DeliveryTo />} />
                <Route path="/stores" element={<Stores />} />
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
