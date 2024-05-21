import React, { useState } from "react";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = () => {
  return (
    <div
      className="flex item-center justify-start px-5"
      style={{ backgroundColor: "#F5F5F5 " }}
    >
      <div className="w-full bg-white rounded-xl p-5  mt-5">
        <div className="w-full bg-black">
          <p className="font-semibold text-xl font-myFont tracking-wide w-3/4">
            Update Profile
          </p>
          <p className="text-slate-400 text-sm w-3/4">
            These are your personal details.
          </p>
          <div className="w-full flex flex-col gap-2 relative">
            <p className="mt-5 font-myFont text-sm">Full Name</p>
            <div className="relative ">
              <input
                className="w-full max-w-md rounded-lg h-12 border border-black custom-input"
                type="text"
                placeholder="Full Name"
              />
              <FontAwesomeIcon
                icon={faUser}
                style={{
                  position: "absolute",
                  left: 0,
                  paddingTop: "1.1rem",
                  paddingLeft: "1rem",
                  height: "0.8rem",
                  color: "#A0AEC0",
                }}
              />
            </div>
            <p className="mt-5 font-myFont text-sm">Email</p>
            <div className="relative">
              <input
                className="w-full max-w-md rounded-lg h-12 border border-black custom-input"
                type="email"
                placeholder="Email"
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{
                  position: "absolute",
                  left: 0,
                  paddingTop: "1.1rem",
                  paddingLeft: "0.8rem",
                  height: "0.9rem",
                  color: "#A0AEC0",
                }}
              />
            </div>
            <p className="mt-5 font-myFont text-sm">Role</p>
            <select
              className="w-full max-w-md rounded-lg h-12 pl-8 border border-black"
              defaultValue=""
            >
              <option value="" disabled hidden>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="user">Intern</option>
              <option value="superAdmin">Super Admin</option>
            </select>
            <div className="flex flex-row gap-5 mt-2 justify-end">
              <button
                className="w-1/5 rounded-lg h-12 font-semibold text-sm mt-2 border border-orange-500 custom-cancel"
                style={{ color: "orange" }}
              >
                Cancel
              </button>
              <button className="w-1/5 bg-orange-400 rounded-lg h-12 text-white font-semibold font text-sm mt-2 confirm-button">
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
      className=" flex item-center justify-start px-5"
      style={{ backgroundColor: "#F5F5F5 " }}
    >
      <div className="w-full bg-white rounded-xl p-5 mt-5">
        <div className="w-full bg-black">
          <p className="font-semibold text-xl font-myFont tracking-wide">
            Update Password
          </p>
          <p className="text-slate-400 text-sm">
            Enter your current and new password to update.
          </p>
          <div className="w-full flex flex-col gap-2 relative">
            <p className="mt-5 font-myFont text-sm">Current Password</p>
            <div className="relative">
              <input
                className="w-full max-w-md rounded-lg h-12 border border-black custom-input "
                type="password"
                placeholder="Current Password"
              />
              <FontAwesomeIcon
                icon={faLock}
                style={{
                  position: "absolute",
                  left: 0,
                  paddingTop: "1.1rem",
                  paddingLeft: "1rem",
                  height: "0.9rem",
                  color: "#A0AEC0",
                }}
              />
            </div>
            <p className="mt-5 font-myFont text-sm">New Password</p>
            <div className="relative">
              <input
                className="w-full max-w-md rounded-lg h-12 border border-black custom-input"
                type="password"
                placeholder="Enter New Password"
              />
              <FontAwesomeIcon
                icon={faLock}
                style={{
                  position: "absolute",
                  left: 0,
                  paddingTop: "1.1rem",
                  paddingLeft: "1rem",
                  height: "0.9rem",
                  color: "#A0AEC0",
                }}
              />
            </div>

            <div className="flex flex-row gap-5 mt-2 justify-end">
              <button
                className="w-1/5 rounded-lg h-12 font-semibold text-sm mt-2 border border-orange-500 custom-cancel"
                style={{ color: "orange" }}
              >
                Cancel
              </button>
              <button className="w-1/5 bg-orange-400 rounded-lg h-12 text-white font-semibold font text-sm mt-2 confirm-button">
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
      className=" flex item-center justify-start px-5"
      style={{ backgroundColor: "#F5F5F5 " }}
    >
      <div className="w-full bg-white rounded-xl p-5 mt-5">
        <div className="w-full bg-black">
          <p className="font-semibold text-xl font-myFont tracking-wide">
            Forgot Password
          </p>
          <p className="text-slate-400 text-sm">Enter your current email.</p>
          <div className="w-full flex flex-col gap-2">
            <p className="mt-5 font-myFont text-sm">Current Email</p>
            <div className="relative">
              <input
                className="w-full max-w-md rounded-lg h-12 border border-black custom-input "
                type="email"
                placeholder="Enter Current Email"
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{
                  position: "absolute",
                  left: 0,
                  paddingTop: "1.1rem",
                  paddingLeft: "0.9rem",
                  height: "0.9rem",
                  color: "#A0AEC0",
                }}
              />
            </div>
            <div className="flex flex-row gap-5 mt-2 justify-end">
              <button
                className="w-1/5 rounded-lg h-12 font-semibold text-sm mt-2 border border-orange-500 custom-cancel"
                style={{ color: "orange" }}
              >
                Cancel
              </button>
              <button className="w-1/5 bg-orange-400 rounded-lg h-12 text-white font-semibold font text-sm mt-2 confirm-button">
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
