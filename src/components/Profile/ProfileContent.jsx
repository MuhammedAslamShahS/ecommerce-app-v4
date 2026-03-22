import React from "react";
import { Outlet } from "react-router-dom";
import "./ProfileContent.css";

const ProfileContent = () => {
  return (
    <div className="profile-content">
      <Outlet />
    </div>
  );
};

export default ProfileContent;