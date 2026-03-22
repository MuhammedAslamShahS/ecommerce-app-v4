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
  { id: 1, icon: <RiAccountCircleLine />, label: "MY ACCOUNT", key: "my-account" },
  { id: 2, icon: <RiFileListLine />, label: "MY ORDERS", key: "my-orders" },
  { id: 3, icon: <RiWallet3Line />, label: "MY CREDITS", key: "my-credits" },
  { id: 4, icon: <RiGiftLine />, label: "LOYALTY POINTS", key: "loyalty-points" },
  { id: 5, icon: <RiBookOpenLine />, label: "ADDRESS BOOK", key: "address-book" },
  { id: 6, icon: <RiBankCardLine />, label: "SAVED CARDS", key: "saved-cards" },
  { id: 7, icon: <RiHeartLine />, label: "WISHLIST", key: "wishlist" },
  { id: 8, icon: <RiShareForwardLine />, label: "SHARED PRODUCTS", key: "shared-products" },
  { id: 9, icon: <RiStore2Line />, label: "SHOP PREFERENCES", key: "shop-preferences" },
  { id: 10, icon: <RiStarLine />, label: "MY REVIEWS", key: "my-reviews" },
  { id: 11, icon: <RiLogoutBoxRLine />, label: "LOG OUT", key: "logout" },
];

const ProfileSidebar = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.key === "logout") {
      navigate("/logout");
      return;
    }

    setActiveSection(item.key);
  };

  return (
    <aside className="profile-sidebar">
      <div className="profile-user-box">
        <div className="profile-avatar">
          <RiAccountCircleLine />
        </div>

        <div className="profile-user-details">
          <h2 className="profile-name">User Name</h2>
          <p className="mobile-number">+91 0000000000</p>
        </div>
      </div>

      <div className="profile-menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`profile-menu-item ${activeSection === item.key ? "active" : ""}`}
            onClick={() => handleClick(item)}
          >
            <span className="profile-menu-icon">{item.icon}</span>
            <span className="profile-menu-label">{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ProfileSidebar;