import React, { useState } from "react";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../App.css";
import "../../Nav.css";
const Profile = () => {
  return (
    <div
      className="flex item-center justify-start px-5"
      style={{ backgroundColor: "#F5F5F5" }}
    >
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
              <input
                className="w-full rounded-lg h-12 border pl-10 custom-input"
                type="text"
                placeholder="Full Name"
              />
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

            <p className="mt-5 font-myFont text-sm w-full text-start">Email</p>
            <div className="relative w-full">
              <input
                className="w-full rounded-lg h-12 border pl-10 custom-input"
                type="email"
                placeholder="Email"
              />
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
            <p className="mt-5 font-myFont text-sm  w-full text-start">Role</p>
            <select
              className="w-full rounded-lg h-12 pl-3 border"
              defaultValue=""
            >
              <option value="" disabled hidden>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="user">Intern</option>
              <option value="superAdmin">Super Admin</option>
            </select>
            <div className="flex flex-row gap-5 mt-5 justify-end w-full">
              <button
                className="w-1/5 rounded-lg h-12 font-semibold text-sm border border-orange-200 custom-cancel"
                style={{ color: "orange" }}
              >
                Cancel
              </button>
              <button className="w-1/5 bg-orange-400 rounded-lg h-12 text-white font-semibold text-sm confirm-button">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Password component
const Password = () => {
  return (
    <div
      className="flex item-center justify-start px-5"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className="w-full bg-white rounded-xl p-5 mt-5">
        <div className="w-full">
          <p className="font-semibold text-xl font-myFont tracking-wide">
            Update Password
          </p>
          <p className="text-slate-400 text-sm">
            Enter your current and new password to update.
          </p>
          <div className="w-full flex flex-col gap-2">
            <p className="mt-5 font-myFont text-sm w-full text-start">
              Current Password
            </p>
            <div className="relative w-full">
              <input
                className="w-full rounded-lg h-12 border pl-10 custom-input"
                type="password"
                placeholder="Current Password"
              />
              <FontAwesomeIcon
                icon={faLock}
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
              New Password
            </p>
            <div className="relative w-full">
              <input
                className="w-full rounded-lg h-12 border custom-input pl-10"
                type="password"
                placeholder="Enter New Password"
              />
              <FontAwesomeIcon
                icon={faLock}
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
              Confirm Password
            </p>
            <div className="relative w-full">
              <input
                className="w-full rounded-lg h-12 border custom-input pl-10"
                type="password"
                placeholder="Enter Confirm Password"
              />
              <FontAwesomeIcon
                icon={faLock}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#A0AEC0",
                }}
              />
            </div>

            <div className="flex flex-row gap-5 mt-5 justify-end w-full">
              <button
                className="w-1/5 rounded-lg h-12 font-semibold text-sm border border-orange-200 custom-cancel"
                style={{ color: "orange" }}
              >
                Cancel
              </button>
              <button className="w-1/5 bg-orange-400 rounded-lg h-12 text-white font-semibold text-sm confirm-button">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Forgot Password component
const ForgotPassword = () => {
  return (
    <div
      className="flex item-center justify-start px-5"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className="w-full bg-white rounded-xl p-5 mt-5">
        <div className="w-full">
          <p className="font-semibold text-xl font-myFont tracking-wide">
            Forgot Password
          </p>
          <p className="text-slate-400 text-sm ">Enter your current email.</p>
          <div className="w-full flex flex-col gap-2">
            <p className="mt-5 font-myFont text-sm w-full text-start">
              Current Email
            </p>
            <div className="relative w-full">
              <input
                className="w-full rounded-lg h-12 border custom-input pl-10"
                type="email"
                placeholder="Enter Current Email"
              />
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
            <div className="flex flex-row gap-5 mt-5 justify-end w-full">
              <button
                className="w-1/5 rounded-lg h-12 font-semibold text-sm border border-orange-200 custom-cancel"
                style={{ color: "orange" }}
              >
                Cancel
              </button>
              <button className="w-1/5 bg-orange-400 rounded-lg h-12 text-white font-semibold text-sm confirm-button">
                Send Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  const [selectedTab, setSelectedTab] = useState("profile");

  const renderContent = () => {
    switch (selectedTab) {
      case "profile":
        return <Profile />;
      case "password":
        return <Password />;
      case "forgotPassword":
        return <ForgotPassword />;
      default:
        return <Profile />;
    }
  };

  const tabClass = (tab) =>
    `cursor-pointer p-2 font-myFont leading-5 tracking-wide custom-tab ${
      selectedTab === tab
        ? "text-dark-orange border-b-2 border-dark-orange"
        : "text-gray-700"
    }`;

  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <p className="font-semibold text-2xl p-5 font-myFont tracking-wide">
        Settings
      </p>
      <p className="font-normal text-sm text-slate-500 pl-5">
        Control your profile setup and integrations.
      </p>
      <div className="flex p-5 space-x-4">
        <div
          className={tabClass("profile")}
          onClick={() => setSelectedTab("profile")}
        >
          Profile
        </div>
        <div
          className={tabClass("password")}
          onClick={() => setSelectedTab("password")}
        >
          Password
        </div>
        <div
          className={tabClass("forgotPassword")}
          onClick={() => setSelectedTab("forgotPassword")}
        >
          Forgot Password
        </div>
      </div>
      <div className=" bg-white shadow-md rounded-md">{renderContent()}</div>
    </div>
  );
};

export default SettingsPage;
