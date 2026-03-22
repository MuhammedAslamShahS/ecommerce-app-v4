import { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.png";
import { IoIosSearch } from "react-icons/io";
import { CiDeliveryTruck, CiHeart, CiMenuFries } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import { BiMessageError } from "react-icons/bi";
import { RiAccountCircleFill } from "react-icons/ri";
import { AiOutlineShopping } from "react-icons/ai";
import HeaderTopBar from "./HeaderTopBar";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <HeaderTopBar />

            <header className="navbar-wrapper">
                <div className="navbar">
                    <div className="navbar-left">
                        <img src={logo} alt="Store Logo" className="logo" onClick={() => navigate("/")} />
                    </div>

                    <ul className="desktop-nav-links">
                        <li>NEW IN</li>
                        <li>SALES</li>
                        <li>PRODUCTS</li>
                        <li>COLLECTIONS</li>
                        <li>WEDDING</li>
                        <li>DEALS</li>
                    </ul>

                    <div className="search-box header-search">
                        <input type="text" placeholder="Search" />
                        <IoIosSearch className="search-icon" />
                    </div>

                    <div className="Express-delivery-container desktop-delivery">
                        <CiDeliveryTruck className="Experss-truck" />
                        <div className="express-text-container">
                            <p className="express-text-1">EXPRESS DELIVERY</p>
                            <p className="express-text-2">Upgrade Your Delivery Method</p>
                        </div>
                    </div>

                    <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                        {menuOpen ? <IoCloseOutline /> : <CiMenuFries />}
                    </button>
                </div>

                <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                    <div className="mobile-top-actions">
                        <div className="mobile-action-item">ABOUT US</div>

                        <div className="mobile-action-item">
                            <LuMapPin className="mobile-action-icon" />
                            <span>STORES</span>
                        </div>

                        <div className="mobile-action-item">
                            <BiMessageError className="mobile-action-icon" />
                            <span>CONTACT US</span>
                        </div>

                        <div className="mobile-action-item">
                            <RiAccountCircleFill className="mobile-action-icon" />
                            <span>MY ACCOUNT</span>
                        </div>

                        <div className="mobile-action-item">
                            <CiHeart className="mobile-action-icon" />
                            <span>WISHLIST</span>
                        </div>

                        <div className="mobile-action-item">
                            <AiOutlineShopping className="mobile-action-icon" />
                            <span>CART</span>
                        </div>
                    </div>

                    <ul className="mobile-nav-links">
                        <li>NEW IN</li>
                        <li>SALES</li>
                        <li>PRODUCTS</li>
                        <li>COLLECTIONS</li>
                        <li>WEDDING</li>
                        <li>DEALS</li>
                    </ul>

                    <div className="Express-delivery-container mobile-delivery">
                        <CiDeliveryTruck className="Experss-truck" />
                        <div className="express-text-container">
                            <p className="express-text-1">EXPRESS DELIVERY</p>
                            <p className="express-text-2">Upgrade Your Delivery Method</p>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
