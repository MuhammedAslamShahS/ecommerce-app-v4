import React from "react";
import "./Profile.css";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileSidebar from "../../components/Profile/ProfileSidebar";
import ProfileContent from "../../components/Profile/ProfileContent";

const Profile = () => {
  return (
    <div className="profile-page">
      <ProfileHeader />

      <div className="profile-layout">
        <ProfileSidebar />
        <ProfileContent />
      </div>
    </div>
  );
};

export default Profile;