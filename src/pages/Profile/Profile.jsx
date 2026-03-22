import React, { useState } from "react";
import "./Profile.css";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileSidebar from "../../components/Profile/ProfileSidebar";
import ProfileContent from "../../components/Profile/ProfileContent";

const Profile = () => {
  // ✅ current active section
  const [activeSection, setActiveSection] = useState("my-account");

  return (
    <div className="profile-page">
      <ProfileHeader />

      <div className="profile-layout">
        <ProfileSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <ProfileContent activeSection={activeSection} />
      </div>
    </div>
  );
};

export default Profile;