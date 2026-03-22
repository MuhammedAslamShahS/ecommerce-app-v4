import React from "react";
import "./ProfileSidebar.css";
import {
    RiAccountCircleLine,
    RiFileListLine,
    RiWallet3Line,
    RiGiftLine,
    RiBookOpenLine,
    RiBankCardLine,
    RiHeartLine,
    RiShareForwardLine,
    RiStore2Line,
    RiStarLine,
    RiLogoutBoxRLine,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const menuItems = [
    { id: 1, icon: <RiAccountCircleLine />, label: "MY ACCOUNT", active: true },
    { id: 2, icon: <RiFileListLine />, label: "MY ORDERS" },
    { id: 3, icon: <RiWallet3Line />, label: "MY CREDITS" },
    { id: 4, icon: <RiGiftLine />, label: "LOYALTY POINTS" },
    { id: 5, icon: <RiBookOpenLine />, label: "ADDRESS BOOK" },
    { id: 6, icon: <RiBankCardLine />, label: "SAVED CARDS" },
    { id: 7, icon: <RiHeartLine />, label: "WISHLIST" },
    { id: 8, icon: <RiShareForwardLine />, label: "SHARED PRODUCTS" },
    { id: 9, icon: <RiStore2Line />, label: "SHOP PREFERENCES" },
    { id: 10, icon: <RiStarLine />, label: "MY REVIEWS" },
    { id: 11, icon: <RiLogoutBoxRLine />, label: "LOG OUT" },
];

const ProfileSidebar = () => {
    const navigate = useNavigate();
    return (
        <aside className="profile-sidebar">
            <div className="profile-user-box">
                <div className="profile-avatar">
                    <RiAccountCircleLine />
                </div>

                <div className="profile-user-details">
                    <h2 className="profile-name">{}</h2>
                    <p className="mobile-number">{}</p>
                </div>
            </div>

            <div className="profile-menu">
                {menuItems.map((item) => (
                    <div key={item.id} className={`profile-menu-item ${item.active ? "active" : ""}`}>
                        <span className="profile-menu-icon">{item.icon}</span>
                        <span className="profile-menu-label" onClick={() => navigate(`/profile/${``}`)}>
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default ProfileSidebar;
