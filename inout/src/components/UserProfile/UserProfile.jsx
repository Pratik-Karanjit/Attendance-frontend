import React from "react";
import "./userprofile.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

import { logout } from "../../actions/userActions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function UserProfile({ userInfo }) {
  const userEmail = useSelector(
    (state) => state?.userLogin?.userInfo?.user_data.email
  );
  const userFullName = useSelector(
    (state) => state?.userLogin?.userInfo?.user_data?.full_name
  );
  const userRole = useSelector(
    (state) => state?.userLogin?.userInfo?.user_data.role
  );
  const userDepartments = useSelector(
    (state) => state?.userLogin?.userInfo?.user_data?.department_name
  );

  const userDepartment = useSelector(
    (state) => state.userLogin?.userInfo?.user_data?.department_name
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

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
            <div className="flex item-center justify-start px-5">
              <div className="w-full bg-white rounded-xl p-5 mt-5">
                <div className="w-full">
                  <p className="font-semibold text-xl font-myFont tracking-wide w-full">
                    Update Profile
                  </p>
                  <p className="text-slate-400 text-sm w-full">
                    These are your personal details.
                  </p>
                  <div className="w-full flex flex-col gap-2 ">
                    <p className=" mt-5 font-myFont text-sm w-full text-start">
                      Full Name
                    </p>
                    <div className="relative w-full">
                      <div
                        className="w-full rounded-lg h-12 border pl-10 custom-input flex items-center"
                        name="fullName"
                      >
                        {" "}
                        {userFullName ? userFullName : <p> - - - </p>}
                      </div>
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{
                          position: "absolute",
                          left: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#A0AEC0",
                        }}
                      />
                    </div>

                    <p className="mt-5 font-myFont text-sm w-full text-start">
                      Email
                    </p>
                    <div className="relative w-full">
                      <div className="w-full rounded-lg h-12 border pl-10 custom-input flex items-center overflow-hidden">
                        {userEmail}{" "}
                      </div>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{
                          position: "absolute",
                          left: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#A0AEC0",
                        }}
                      />
                    </div>
                    <div className="w-full flex flex-row">
                      <div className="w-6/12">
                        <p className="mt-5 font-myFont text-sm  w-full text-start">
                          Role
                        </p>

                        <div className="w-full flex items-start justify-start rounded-lg h-12 pl-3 border">
                          {userRole}
                        </div>
                      </div>
                      <div className="w-6/12">
                        <p className="mt-5 font-myFont text-sm w-full text-start">
                          Department
                        </p>
                        <div className="w-full flex items-start justify-start rounded-lg h-12 pl-3 border">
                          {userDepartment}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row gap-5 mt-5 justify-end w-full">
                      <button
                        className="w-1/5 bg-orange-400 rounded-lg h-12 text-white font-semibold text-sm confirm-button"
                        onClick={() => {
                          navigateTo("/profile/update");
                        }}
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserProfile;
