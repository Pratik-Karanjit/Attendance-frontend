import React, { useState } from "react";
import skillAcademyLogo from "../../photos/skillxattendance.png";
import DashboardImage from "../../photos/Dashboard.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleGroup,
  faCog,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const LeftSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("dashboard");

  return (
    <div
      className={`h-screen fixed l:flex w-1/5 bg-white flex flex-col justify-between left-bar ${
        isSidebarOpen ? "open" : ""
      }`}
    >
      <div className="w-full">
        <div className="flex justify-center pt-5">
          <img
            className="skill-img"
            src={skillAcademyLogo}
            alt="skill academy"
          />
        </div>
        <div className="flex justify-end ">
          <div className="h-3/6 mt-20 w-5/6 rounded-l-3xl  ">
            <div
              className={`flex gap-4 h-12 items-center rounded-l-3xl cursor-pointer ${
                selectedMenu === "dashboard" ? "selected-menu" : ""
              }`}
              onClick={() => handleMenuClick("dashboard")}
            >
              <img
                className="h-6 pl-5 opacity-60"
                src={DashboardImage}
                alt="Dashboard"
              />
              <p
                className={`h-6 ${
                  selectedMenu === "dashboard" ? "text-white" : "text-slate-500"
                }`}
              >
                Dashboard
              </p>
            </div>

            <div
              className={`flex gap-4 h-12 items-center rounded-l-3xl mt-5 cursor-pointer ${
                selectedMenu === "intern" ? "selected-menu" : ""
              }`}
              onClick={() => handleMenuClick("intern")}
            >
              <FontAwesomeIcon
                className="h-5 pl-5 opacity-60"
                icon={faPeopleGroup}
              />
              <p
                className={`h-6 ${
                  selectedMenu === "intern" ? "text-white" : "text-slate-500"
                }`}
              >
                Interns
              </p>
            </div>

            {/* Additional menu items */}
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-end">
          <div
            className={`flex gap-4 h-12 items-center rounded-l-3xl text-black cursor-pointer font-myFont ${
              selectedMenu === "settings" ? "selected-menu" : ""
            } mb-4`} // Added mb-4 class here
            style={{ width: "80%" }}
            onClick={() => handleMenuClick("settings")}
          >
            <FontAwesomeIcon className="h-6 pl-5 opacity-60" icon={faCog} />
            <p
              className={`h-6 ${
                selectedMenu === "settings" ? "text-white" : "text-slate-500"
              }`}
            >
              Settings
            </p>
          </div>
        </div>

        {/* Logout button container */}
        <div className="flex justify-end items-end">
          <div
            className={` flex gap-4 h-12 items-center rounded-l-3xl text-black cursor-pointer font-myFont mb-20 ${
              selectedMenu === "logout" ? "selected-menu" : ""
            }`}
            style={{ width: "80%" }}
            onClick={() => handleMenuClick("logout")}
          >
            <FontAwesomeIcon
              className="h-6 pl-5 opacity-60"
              icon={faRightFromBracket}
            />
            <p
              className={`h-6 ${
                selectedMenu === "logout" ? "text-white" : "text-slate-500"
              }`}
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
