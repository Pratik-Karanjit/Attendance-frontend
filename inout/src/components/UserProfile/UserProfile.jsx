import React from "react";
import "./userprofile.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { Link } from "react-router-dom";
function UserProfile({ userInfo }) {
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigateTo("/");
    }
  });
  const dispatch = useDispatch();
  const submitHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      {userInfo && (
        <>
          <div className="profile-card">
            <div className="row">
              <h2>Profile</h2>
              <button onClick={submitHandler}>Log Out</button>
            </div>
            <div className="fields">
              <div className="email">
                <label>Email:</label>
                <div className="value">
                  <div>{userInfo.user_data.email}</div>
                </div>
              </div>
              <div className="role">
                <label>Role:</label>
                <div className="value">
                  {userInfo.user_data.role ? (
                    <>{userInfo.user_data.role}</>
                  ) : (
                    "Not Assigned"
                  )}
                </div>
              </div>
              <div className="department">
                <label>Department:</label>
                <div className="value">
                  {userInfo.user_data.department_name ? (
                    <>{userInfo.user_data.department_name}</>
                  ) : (
                    "Not Assigned"
                  )}
                </div>
              </div>
              <div className="edit-profile">
                <Link to="/profile/update">
                  <button>Edit Profile</button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserProfile;
