import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileSidebar from "../../components/Profile/ProfileSidebar";
import ProfileContent from "../../components/Profile/ProfileContent";
import { getApiErrorMessage, getCurrentUserProfile } from "../../ApiService/api";
import { setCredentials } from "../../authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const authState = useSelector((state) => state.auth);
  const [activeSection, setActiveSection] = useState("my-account");
  const [profileData, setProfileData] = useState(authState.user);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState("");

  useEffect(() => {
    const requestedSection = searchParams.get("section");

    if (requestedSection) {
      setActiveSection(requestedSection);
    }
  }, [searchParams]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoadingProfile(true);
        setProfileError("");

        const userProfile = await getCurrentUserProfile();
        setProfileData(userProfile);

        if (authState.token) {
          dispatch(
            setCredentials({
              user: userProfile,
              token: authState.token,
            })
          );
        }
      } catch (error) {
        setProfileError(
          getApiErrorMessage(error, "Unable to load your account details right now.")
        );
      } finally {
        setIsLoadingProfile(false);
      }
    };

    loadProfile();
  }, [authState.token, dispatch]);

  return (
    <div className="profile-page">
      <ProfileHeader profileData={profileData} />

      <div className="profile-layout">
        <ProfileSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          profileData={profileData}
          isLoadingProfile={isLoadingProfile}
        />
        <ProfileContent
          activeSection={activeSection}
          profileData={profileData}
          isLoadingProfile={isLoadingProfile}
          profileError={profileError}
        />
      </div>
    </div>
  );
};

export default Profile;
