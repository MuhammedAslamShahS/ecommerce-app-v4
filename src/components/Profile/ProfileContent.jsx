import React from "react";
import "./ProfileContent.css";

import MyAccount from "../MyAccount/MyAccount";
import MyOrders from "../MyOrders/MyOrders";
import MyCredits from "../MyCredits/MyCredits";
import LoyaltyPoints from "../LoyaltyPoints/LoyaltyPoints";
import AddressBook from "../AddressBook/AddressBook";
import SavedCards from "../SavedCards/SavedCards";
import WishList from "../WishList/WishList";
import SharedProducts from "../SharedProducts/SharedProducts";
import ShopPreference from "../ShopPreference/ShopPreference";
import MyReviews from "../MyReviews/MyReviews";

const ProfileContent = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case "my-account":
        return <MyAccount />;
      case "my-orders":
        return <MyOrders />;
      case "my-credits":
        return <MyCredits />;
      case "loyalty-points":
        return <LoyaltyPoints />;
      case "address-book":
        return <AddressBook />;
      case "saved-cards":
        return <SavedCards />;
      case "wishlist":
        return <WishList />;
      case "shared-products":
        return <SharedProducts />;
      case "shop-preferences":
        return <ShopPreference />;
      case "my-reviews":
        return <MyReviews />;
      default:
        return <MyAccount />;
    }
  };

  return <div className="profile-content">{renderContent()}</div>;
};

export default ProfileContent;