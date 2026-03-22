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
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { id: 1, icon: <RiAccountCircleLine />, label: "MY ACCOUNT", path: "my-account" },
  { id: 2, icon: <RiFileListLine />, label: "MY ORDERS", path: "my-orders" },
  { id: 3, icon: <RiWallet3Line />, label: "MY CREDITS", path: "my-credits" },
  { id: 4, icon: <RiGiftLine />, label: "LOYALTY POINTS", path: "loyalty-points" },
  { id: 5, icon: <RiBookOpenLine />, label: "ADDRESS BOOK", path: "address-book" },
  { id: 6, icon: <RiBankCardLine />, label: "SAVED CARDS", path: "saved-cards" },
  { id: 7, icon: <RiHeartLine />, label: "WISHLIST", path: "wishlist" },
  { id: 8, icon: <RiShareForwardLine />, label: "SHARED PRODUCTS", path: "shared-products" },
  { id: 9, icon: <RiStore2Line />, label: "SHOP PREFERENCES", path: "shop-preferences" },
  { id: 10, icon: <RiStarLine />, label: "MY REVIEWS", path: "my-reviews" },
  { id: 11, icon: <RiLogoutBoxRLine />, label: "LOG OUT", action: "logout" },
];

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item) => {
    if (item.action === "logout") {
      // 🔥 logout logic (redux/localStorage)
      localStorage.removeItem("accessToken");
      navigate("/login");
    } else {
      navigate(`/profile/${item.path}`);
    }
  };

  return (
    <aside className="profile-sidebar">
      <div className="profile-menu">
        {menuItems.map((item) => {
          const isActive = location.pathname === `/profile/${item.path}`;

          return (
            <div
              key={item.id}
              className={`profile-menu-item ${isActive ? "active" : ""}`}
              onClick={() => handleClick(item)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default ProfileSidebar;