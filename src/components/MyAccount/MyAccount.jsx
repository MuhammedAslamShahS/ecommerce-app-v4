import React from "react";
import "./MyAccount.css";

const formatJoinedDate = (joinedAt) => {
  if (!joinedAt) {
    return "Recently joined";
  }

  return new Date(joinedAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const MyAccount = ({ profileData, isLoadingProfile, profileError }) => {
  if (isLoadingProfile) {
    return <div className="my-account-empty">Loading your account details...</div>;
  }

  if (profileError) {
    return <div className="my-account-empty">{profileError}</div>;
  }

  if (!profileData) {
    return <div className="my-account-empty">We could not find your profile details.</div>;
  }

  const accountCards = [
    {
      label: "Wishlist Items",
      value: profileData.wishlistCount,
      note: "Products you saved for later",
    },
    {
      label: "Cart Items",
      value: profileData.cartCount,
      note: "Items currently waiting in cart",
    },
    {
      label: "Orders Placed",
      value: profileData.orderCount,
      note: "Orders created from this account",
    },
  ];

  return (
    <section className="my-account-section">
      <div className="my-account-hero">
        <div>
          <p className="my-account-kicker">My Account</p>
          <h2 className="my-account-title">Welcome back, {profileData.name}</h2>
          <p className="my-account-text">
            This section shows the real account details linked to your customer
            profile.
          </p>
        </div>

        <div className="my-account-badge">
          <span>Role</span>
          <strong>{profileData.role}</strong>
        </div>
      </div>

      <div className="my-account-grid">
        <article className="my-account-panel">
          <p className="my-account-panel-kicker">Personal Details</p>
          <div className="my-account-detail-list">
            <div className="my-account-detail-row">
              <span>Full Name</span>
              <strong>{profileData.name}</strong>
            </div>
            <div className="my-account-detail-row">
              <span>Email Address</span>
              <strong>{profileData.email}</strong>
            </div>
            <div className="my-account-detail-row">
              <span>Joined On</span>
              <strong>{formatJoinedDate(profileData.joinedAt)}</strong>
            </div>
            <div className="my-account-detail-row">
              <span>Account Status</span>
              <strong>Active</strong>
            </div>
          </div>
        </article>

        <article className="my-account-panel">
          <p className="my-account-panel-kicker">Account Snapshot</p>
          <div className="my-account-stats">
            {accountCards.map((card) => (
              <div className="my-account-stat-card" key={card.label}>
                <span>{card.label}</span>
                <strong>{card.value}</strong>
                <p>{card.note}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default MyAccount;
