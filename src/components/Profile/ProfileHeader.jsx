import React from "react";
import "./ProfileHeader.css";
import { IoInformationCircleOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { AiOutlineShopping } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ProfileHeader = () => {
    const navigate = useNavigate();

    return (
        <header className="profile-header">
            <div className="profile-header-left" onClick={() => navigate("/")}>
                <p>{`< Back to Home`}</p>
            </div>

            <div className="profile-header-right">
                <div className="header-icon-box">
                    <IoInformationCircleOutline />
                </div>
                <div className="header-icon-box">
                    <RiAccountCircleLine />
                </div>
                <div className="header-icon-box">
                    <CiHeart />
                </div>
                <div className="header-icon-box">
                    <AiOutlineShopping />
                </div>
            </div>
        </header>
    );
};

export default ProfileHeader;
