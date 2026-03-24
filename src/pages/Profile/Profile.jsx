import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Profile.css";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileSidebar from "../../components/Profile/ProfileSidebar";
import ProfileContent from "../../components/Profile/ProfileContent";

const Profile = () => {
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState("my-account");

  useEffect(() => {
    const requestedSection = searchParams.get("section");

    if (requestedSection) {
      setActiveSection(requestedSection);
    }
  }, [searchParams]);

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
