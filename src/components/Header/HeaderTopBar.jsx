import { useEffect, useMemo, useState } from "react";
import "./HeaderTopBar.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LuMapPin } from "react-icons/lu";
import { BiMessageError } from "react-icons/bi";
import { RiAccountCircleFill } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { AiOutlineShopping } from "react-icons/ai";
import { getWishlistItems } from "../../ApiService/api";

const buildProtectedRedirectTarget = (path) => {
    const [pathname, search = ""] = path.split("?");

    return {
        pathname,
        search: search ? `?${search}` : "",
    };
};

const HeaderTopBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const authState = useSelector((state) => state.auth);
    const cartItems = useSelector((state) => state.cart.items);
    const isAuthenticated = authState.isAuthenticated;
    const [wishlistCount, setWishlistCount] = useState(() => Number(authState.user?.wishlistCount || 0));

    const cartCount = useMemo(() => {
        const totalCartQuantity = cartItems.reduce((total, item) => total + Number(item.quantity || 0), 0);

        if (totalCartQuantity > 0) {
            return totalCartQuantity;
        }

        return Number(authState.user?.cartCount || 0);
    }, [authState.user?.cartCount, cartItems]);

    useEffect(() => {
        const syncWishlistCount = async () => {
            if (!isAuthenticated) {
                setWishlistCount(0);
                return;
            }

            try {
                const wishlistItems = await getWishlistItems();
                setWishlistCount(wishlistItems.length);
            } catch (error) {
                setWishlistCount(Number(authState.user?.wishlistCount || 0));
            }
        };

        syncWishlistCount();
    }, [authState.user?.wishlistCount, isAuthenticated, location.pathname, location.search]);

    useEffect(() => {
        const handleWishlistUpdated = (event) => {
            const nextCount = Number(event.detail?.count);

            if (Number.isFinite(nextCount)) {
                setWishlistCount(nextCount);
            }
        };

        window.addEventListener("wishlist:updated", handleWishlistUpdated);

        return () => {
            window.removeEventListener("wishlist:updated", handleWishlistUpdated);
        };
    }, []);

    const goToProtectedPath = (path) => {
        if (isAuthenticated) {
            navigate(path);
            return;
        }

        navigate("/login", {
            state: {
                from: buildProtectedRedirectTarget(path),
            },
        });
    };

    return (
        <>
            <div className="topbar-container-1">
                <p>All discounts are inclusive of GST rate cut benefits.</p>
                <p>
                    Download the Store App and get additional 15% discount on your first purchase. Use code: STOREAPP777
                    *T&C Apply
                </p>
            </div>

            <div className="topbar-container-2">
                <div className="topbar-left">
                    <div className="about" onClick={() => navigate("/about")}>
                        ABOUT US
                    </div>

                    <div className="delivery-store-container">
                        <div className="delivery">
                            <p className="delivery-text-1">Delivering to</p>
                            <p className="delivery-text-2" onClick={() => navigate("/delivery-to")}>
                                Add delivery location
                            </p>
                        </div>

                        <div className="store" onClick={() => navigate("/stores")}>
                            <LuMapPin className="map-icon icon" />
                            <p className="store-text">STORES</p>
                        </div>
                    </div>
                </div>

                <div className="section-3">
                    <div className="contact-container">
                        <p className="contact-text">CONTACT US</p>
                        <BiMessageError className="message-icon icon" />
                    </div>

                    <div className="my-profile-container" onClick={() => goToProtectedPath("/profile")}>
                        <RiAccountCircleFill className="profile-icon icon" />
                        <p className="profile-text">MY ACCOUNT</p>
                    </div>

                    <div className="love-cart-container">
                        <div className="love-container" onClick={() => goToProtectedPath("/profile?section=wishlist")}>
                            <div className="icon-badge-wrap">
                                <CiHeart className="love-icon icon" />
                                {wishlistCount > 0 ? <span className="icon-count-badge">{wishlistCount}</span> : null}
                            </div>
                        </div>

                        <div className="cart-container" onClick={() => goToProtectedPath("/cart")}>
                            <div className="icon-badge-wrap">
                                <AiOutlineShopping className="cart-icon icon" />
                                {cartCount > 0 ? <span className="icon-count-badge">{cartCount}</span> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderTopBar;
