import React from "react";
import "../Dashboard/dashboard.css";
import Header from "../../components/Header/Header";

import SideMenu from "../../components/sidebar/SideMenu";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserProfile from "../../components/UserProfile/UserProfile";
import Attendance from "../../components/attendance/Attendance";

function UserDetails() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigateTo("/");
    }
  });
  return (
    <>
      <div className="layout">
        <div className="leftpart">
          <div className="fixed">
            <SideMenu profile="profile" />
          </div>
        </div>
        <div className="right">
          <div className="container">
            <Header profile="profile" />
            <UserProfile userInfo={userInfo} />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
