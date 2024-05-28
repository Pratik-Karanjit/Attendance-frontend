import React, { useEffect, useState } from "react";
import "../../App.css";
import "../../Nav.css";
import skillAcademyLogo from "../../photos/skillxattendance.png";
import DashboardImage from "../../photos/Dashboard.png";
import { listUsers, logout } from "../../actions/userActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faUserGroup,
  faList,
  faArrowLeft,
  faPeopleGroup,
  faArrowRight,
  faUser,
  faCog,
  faRightFromBracket,
  faBars,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SettingsPage from "./SettingsPage";
import { useDispatch, useSelector } from "react-redux";
import UserProfilePage from "../../pages/AdminDash/UserProfilePage.jsx";
import AddUserPage from "./AddUser.jsx";

const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Current month (0-11)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [extractedData, setExtractedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList.users);
  console.log("usersHere", userList);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [userListWithId, setUserListWithId] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  // Effect to update userListWithId when userList changes
  useEffect(() => {
    if (userList && userList.length > 0) {
      const userListWithId = userList.map((user, index) => ({
        ...user,
        id: index + 1,
      }));
      setExtractedData(userListWithId);
    }
  }, [userList]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const HandleDelete = () => {
    console.log("handle delete called");
    dispatch(logout());
    window.location.href = "/";
  };

  // const filteredData = extractedData.filter((user) =>
  //   user.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const filteredData = extractedData.filter((intern) =>
    intern.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInterns = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredInterns = extractedData.filter(
    (intern) =>
      intern.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // const handleViewButton = (internId) => {
  //   navigate(`/admin/${internId}`);
  //   console.log("internId from view button.", internId);
  // };

  const handleNavigationButton = (internId) => {
    navigate(`/userProfilePage/${internId}`);
  };

  const handleAttendanceButton = (internId) => {
    navigate(`/internAttendancePage/${internId}`);
  };

  return (
    <div>
      <div>
        <div className="hamburger-menu" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        {/* Left sidebar */}
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
                      selectedMenu === "dashboard"
                        ? "text-white"
                        : "text-slate-500"
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
                      selectedMenu === "intern"
                        ? "text-white"
                        : "text-slate-500"
                    }`}
                  >
                    Interns
                  </p>
                </div>

                <div
                  className={`flex gap-4 h-12 items-center rounded-l-3xl mt-5 cursor-pointer ${
                    selectedMenu === "addUser" ? "selected-menu" : ""
                  }`}
                  onClick={() => handleMenuClick("addUser")}
                >
                  <FontAwesomeIcon
                    className="h-5 pl-5 opacity-60"
                    icon={faUserPlus}
                  />
                  <p
                    className={`h-6 ${
                      selectedMenu === "addUser"
                        ? "text-white"
                        : "text-slate-500"
                    }`}
                  >
                    Add User
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
                    selectedMenu === "settings"
                      ? "text-white"
                      : "text-slate-500"
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

        {/* Top right section */}

        <div
          className="w-4/5 h-full flex flex-col absolute right-0 right-section"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          <div
            className="flex justify-between items-center p-7 bg-white shadow fixed top-0 right-0 w-4/5 top-div"
            style={{ zIndex: 1000 }}
          >
            <p className="text-slate-400">
              {selectedMenu === "dashboard"
                ? "Dashboard"
                : selectedMenu === "intern"
                ? "Intern Details"
                : "Settings"}
            </p>
            <div className="flex flex-row gap-3 justify-center items-center">
              <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                {/* {user.name.charAt(0)} */}A
              </div>
            </div>
          </div>

          <div
            className="w-full"
            style={{ background: "#F6F7FB", paddingTop: "6rem" }}
          >
            {selectedMenu === "dashboard" && (
              <div className="bg-slate-100">
                <p className="px-6 pt-4 font-semibold text-2xl">Overview</p>
                <div className="w-full h-1/5 flex flex-row p-5 gap-6 overview-div">
                  <div
                    className="bg-slate-300 w-1/3 rounded-xl relative overview-box"
                    style={{ background: "#D3B881" }}
                  >
                    <div className=" flex flex-col p-8 gap-2">
                      <div className="w-full text-white text-2xl font-myFont ">
                        300
                      </div>
                      <div className="w-full text-white text-sm font-myFont">
                        Total employees
                      </div>
                    </div>
                    <FontAwesomeIcon
                      className="absolute h-8 w-8 right-10 top-12"
                      icon={faUser}
                    />
                  </div>
                  <div
                    className="bg-slate-300 w-1/3 rounded-xl relative overview-box"
                    style={{ background: "#D3B881" }}
                  >
                    <div className="flex flex-col p-8 gap-2">
                      <div className="w-full text-white text-2xl font-myFont ">
                        5
                      </div>
                      <div className="w-full text-white text-sm font-myFont">
                        Total admins
                      </div>
                    </div>
                    <FontAwesomeIcon
                      className="absolute h-8 w-8 right-10 top-12"
                      icon={faUserTie}
                    />
                  </div>
                  <div
                    className="bg-slate-300 w-1/3 rounded-xl relative overview-box"
                    style={{ background: "#D3B881" }}
                  >
                    <div className="flex flex-col p-8 gap-2">
                      <div className="w-full text-white text-2xl font-myFont ">
                        320
                      </div>
                      <div className="w-full text-white text-sm font-myFont">
                        Total users
                      </div>
                    </div>
                    <FontAwesomeIcon
                      className="absolute h-8 w-8 right-10 top-12"
                      icon={faUserGroup}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-5 px-5 py-5 h-full intern-attendance-detail">
                  <div className="relative w-2/6 h-3/5 p-5 gap-6 bg-white flex flex-col rounded-xl intern-detail">
                    <div className="flex gap-4 px-5 pt-5 w-full items-start justify-start">
                      <FontAwesomeIcon className="h-5 w-5" icon={faUserGroup} />
                      <p>Intern Lists</p>
                    </div>
                    {/* Search bar */}
                    <div className="mt-4 items-start w-full justify-start">
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl intern-list-search"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>
                    <div className="w-full items-start overflow-y-auto max-h-300px flex flex-col">
                      {filteredData.map((user) => (
                        <div
                          key={user.id}
                          className="w-full flex items-center gap-2 p-2 font-myFont leading-7 tracking-wide"
                        >
                          <div className="h-10 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                            {user.full_name.charAt(0)}
                          </div>
                          <div className="w-full">
                            <p className="font-normal intern-name">
                              {user.full_name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative w-4/5 h-3/5 p-5 gap-6 bg-white flex flex-col rounded-xl attendance-detail">
                    <div className="flex items-center p-5 gap-6 attendance-detail-text w-full  justify-start items-start">
                      <FontAwesomeIcon icon={faList} />
                      <p>Attendance Details</p>
                    </div>
                    <div className="absolute top-2 right-3 mt-2 mr-2 flex items-center bg-white p-2 rounded-md shadow month-div">
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="mr-2 cursor-pointer"
                        onClick={goToPreviousMonth}
                      />
                      <p>{`${monthNames[currentMonth]} ${currentYear}`}</p>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 cursor-pointer"
                        onClick={goToNextMonth}
                      />
                    </div>
                    <table className="w-full text-left border-collapse attendance-table">
                      <thead className="text-white attendance-table-head">
                        <tr>
                          <th className="px-6 rounded-l-lg font-medium text-sm">
                            Date
                          </th>
                          <th className="p-3 font-medium text-sm">Check In</th>
                          <th className="p-3 font-medium text-sm">Check Out</th>
                          <th className="p-3 rounded-r-lg font-medium text-sm">
                            Total Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 font-myFont">2023-05-15</td>
                          <td className="p-2 font-myFont">09:00 AM</td>
                          <td className="p-2 font-myFont">05:00 PM</td>
                          <td className="p-2 font-myFont">8h 0m</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2 font-myFont">2023-05-15</td>
                          <td className="p-2 font-myFont">09:00 AM</td>
                          <td className="p-2 font-myFont">05:00 PM</td>
                          <td className="p-2 font-myFont">8h 0m</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2 font-myFont">2023-05-15</td>
                          <td className="p-2 font-myFont">09:00 AM</td>
                          <td className="p-2 font-myFont">05:00 PM</td>
                          <td className="p-2 font-myFont">8h 0m</td>
                        </tr>
                        <tr className="border-b border-t">
                          <td className="p-2 font-myFont">2023-05-15</td>
                          <td className="p-2 font-myFont">09:00 AM</td>
                          <td className="p-2 font-myFont">05:00 PM</td>
                          <td className="p-2 font-myFont">8h 0m</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {selectedMenu === "intern" && (
              <div className="bg-slate-100">
                <p className="px-6 pt-4 font-semibold text-2xl">Overview</p>
                <div className="w-full h-1/5 flex flex-row p-5 gap-6 overview-div">
                  <div
                    className="bg-slate-300 w-1/3 rounded-xl relative overview-box"
                    style={{ background: "#D3B881" }}
                  >
                    <div className="flex flex-col p-8 gap-2">
                      <div className="w-full text-white text-2xl font-myFont ">
                        300
                      </div>
                      <div className="w-full text-white text-sm font-myFont">
                        Total employees
                      </div>
                    </div>
                    <FontAwesomeIcon
                      className="absolute h-8 w-8 right-10 top-12"
                      icon={faUser}
                    />
                  </div>
                  <div
                    className="bg-slate-300 w-1/3 rounded-xl relative overview-box"
                    style={{ background: "#D3B881" }}
                  >
                    <div className="flex flex-col p-8 gap-2">
                      <div className="w-full text-white text-2xl font-myFont ">
                        5
                      </div>
                      <div className="w-full text-white text-sm font-myFont">
                        Total admins
                      </div>
                    </div>
                    <FontAwesomeIcon
                      className="absolute h-8 w-8 right-10 top-12"
                      icon={faUserTie}
                    />
                  </div>
                  <div
                    className="bg-slate-300 w-1/3 rounded-xl relative overview-box"
                    style={{ background: "#D3B881" }}
                  >
                    <div className="flex flex-col p-8 gap-2">
                      <div className="w-full text-white text-2xl font-myFont ">
                        320
                      </div>
                      <div className="w-full text-white text-sm font-myFont">
                        Total users
                      </div>
                    </div>
                    <FontAwesomeIcon
                      className="absolute h-8 w-8 right-10 top-12"
                      icon={faUserGroup}
                    />
                  </div>
                </div>
                <div className="flex gap-5 px-5 py-5 h-full intern-full-detail ">
                  <div className="relative w-full h-3/5 p-5 gap-6 bg-white flex flex-col rounded-xl table-div">
                    <div
                      className="flex p-5 gap-6 intern-search"
                      style={{
                        flexDirection: "row",
                        width: "100%",
                      }}
                    >
                      <div className="flex flex-row gap-5 items-center ">
                        <FontAwesomeIcon className="pt-1" icon={faList} />
                        <p>Intern Details</p>
                      </div>

                      <input
                        type="text"
                        className="w-2/6 px-4 py-2 border border-gray-300 rounded-xl intern-search-bar"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchInterns}
                      />
                    </div>

                    <div className="absolute top-2 right-3 mt-2 mr-2 flex items-center bg-white p-2 rounded-md shadow month-div">
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="mr-2 cursor-pointer"
                        onClick={goToPreviousMonth}
                      />

                      <p>{`${monthNames[currentMonth]} ${currentYear}`}</p>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 cursor-pointer"
                        onClick={goToNextMonth}
                      />
                    </div>
                    <table className="w-full text-left border-collapse intern-detail-table">
                      <thead className="text-white intern-table">
                        <tr>
                          <th className="px-3 rounded-l-lg font-medium text-sm">
                            ID
                          </th>
                          <th className="px-3  font-medium text-sm">
                            Full Name
                          </th>
                          <th className="px-3 font-medium text-sm">Email</th>
                          <th className="p-3  font-medium text-sm">
                            Total Hours
                          </th>
                          <th className="p-3 rounded-r-lg text-sm font-medium">
                            View Details
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInterns.map((intern) => (
                          <tr key={intern.name}>
                            <td className="p-3 font-myFont">{intern.id}</td>
                            <td className="p-3 font-myFont">
                              {intern.full_name}
                            </td>
                            <td className="p-3 font-myFont">{intern.email}</td>
                            <td className="p-3 font-myFont">150</td>
                            <td className="p-3 font-myFont">
                              <button
                                className="rounded-3xl px-5 py-2 text-sm font-myFont  text-white hover:text-black view-button"
                                style={{ backgroundColor: "#1C5A41" }}
                                onClick={() =>
                                  handleNavigationButton(intern.pk)
                                }
                              >
                                View
                              </button>
                              <button
                                className="rounded-3xl px-5 ml-5 py-2 text-sm font-myFont  text-white hover:text-black view-button"
                                style={{ backgroundColor: "#1C5A41" }}
                                onClick={() => {
                                  handleAttendanceButton(intern.pk);
                                }}
                              >
                                Attendance
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {selectedMenu === "settings" && <SettingsPage />}

            {selectedMenu === "addUser" && <AddUserPage />}

            {selectedMenu === "logout" && HandleDelete()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
