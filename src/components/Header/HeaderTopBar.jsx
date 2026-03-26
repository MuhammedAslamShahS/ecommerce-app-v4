import "./HeaderTopBar.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuMapPin } from "react-icons/lu";
import { BiMessageError } from "react-icons/bi";
import { RiAccountCircleFill } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { AiOutlineShopping } from "react-icons/ai";

const buildProtectedRedirectTarget = (path) => {
    const [pathname, search = ""] = path.split("?");

    return {
        pathname,
        search: search ? `?${search}` : "",
    };
};

const HeaderTopBar = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
                            <p className="delivery-text-2">Add delivery location</p>
                        </div>

                        <div className="store">
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
                            <CiHeart className="love-icon icon" />
                        </div>

                        <div className="cart-container" onClick={() => goToProtectedPath("/cart")}>
                            <AiOutlineShopping className="cart-icon icon" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderTopBar;
