import React, { useEffect, useState } from "react";
import skillAcademyLogo from "../../photos/skillxattendance.png";
import DashboardImage from "../../photos/Dashboard.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faUserGroup,
  faList,
  faArrowLeft,
  faPeopleGroup,
  faArrowRight,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import "../../input.css";
import "../../output.css";

const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Current month (0-11)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [extractedData, setExtractedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      let idCounter = 1;
      const extractedData = result.data.map((user) => ({
        id: idCounter++,
        name: user.name,
        email: user.email,
      }));
      setExtractedData(extractedData);
      console.log("Extracted data:", extractedData);
      console.log("Result data here:", result.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = extractedData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInterns = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredInterns = extractedData.filter((intern) =>
    intern.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleViewButton = (internId) => {
    navigate(`/admin/${internId}`);
    console.log("internId from view button.", internId);
  };

  return (
    <div>
      <div className="flex">
        {/* Left sidebar */}
        <div className="h-screen hidden l:flex w-1/5 bg-white relative flex flex-col justify-between">
          <div>
            <div className="flex justify-center pt-5">
              <img
                className="skill-img"
                src={skillAcademyLogo}
                alt="skill academy"
              />
            </div>
            <div className="flex justify-end">
              <div className="h-3/6 mt-20 w-5/6 rounded-l-3xl ">
                <div
                  className={`flex gap-4 h-12 items-center rounded-l-3xl cursor-pointer ${
                    selectedMenu === "dashboard" ? "selected-menu" : ""
                  }`}
                  onClick={() => handleMenuClick("dashboard")}
                >
                  <img
                    className="h-6 pl-5"
                    src={DashboardImage}
                    alt="Dashboard"
                  />
                  <p
                    className={`h-6 ${
                      selectedMenu === "dashboard" ? "text-white" : ""
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
                  <FontAwesomeIcon className="h-5 pl-5" icon={faPeopleGroup} />
                  <p
                    className={`h-6 ${
                      selectedMenu === "intern" ? "text-white" : ""
                    }`}
                  >
                    Interns
                  </p>
                </div>

                {/* Additional menu items */}
              </div>
            </div>
          </div>

          {/* Logout button container */}
          <div className="flex justify-end items-center mt-auto mb-20">
            <div
              className="flex gap-4 h-12 items-center rounded-l-3xl text-black cursor-pointer font-myFont"
              style={{ width: "80%" }}
            >
              <FontAwesomeIcon className="h-6 pl-5" icon={faRightFromBracket} />
              <p className="h-6 text-slate-500">Logout</p>
            </div>
          </div>
        </div>

        {/* Top right section */}
        <div className="h-10 w-4/5 bg-white">
          <p className="text-slate-400 p-7">
            {selectedMenu === "dashboard" ? "Dashboard" : "Intern Details"}
          </p>
          <div className="absolute right-10 top-7">
            <p className="font-myFont ">Admin</p>
          </div>
          <div className="h-screen" style={{ background: "#F6F7FB" }}>
            <p className="px-6 pt-4 font-semibold text-2xl">Overview</p>
            <div className="w-full h-1/5 flex flex-row p-5 gap-6 l:">
              <div
                className="bg-slate-300 w-1/3 rounded-xl relative"
                style={{ background: "#D3B881" }}
              >
                <div className="flex flex-col p-8 gap-2">
                  <div className=" text-white text-2xl font-myFont ">300</div>
                  <div className=" text-white text-sm font-myFont">
                    Total employees
                  </div>
                </div>
                <FontAwesomeIcon
                  className="absolute h-8 w-8 right-10 top-12"
                  icon={faUser}
                />
              </div>
              <div
                className="bg-slate-300 w-1/3 rounded-xl relative"
                style={{ background: "#D3B881" }}
              >
                <div className="flex flex-col p-8 gap-2">
                  <div className=" text-white text-2xl font-myFont ">5</div>
                  <div className=" text-white text-sm font-myFont">
                    Total admins
                  </div>
                </div>
                <FontAwesomeIcon
                  className="absolute h-8 w-8 right-10 top-12"
                  icon={faUserTie}
                />
              </div>
              <div
                className="bg-slate-300 w-1/3 rounded-xl relative"
                style={{ background: "#D3B881" }}
              >
                <div className="flex flex-col p-8 gap-2">
                  <div className=" text-white text-2xl font-myFont ">320</div>
                  <div className=" text-white text-sm font-myFont">
                    Total users
                  </div>
                </div>
                <FontAwesomeIcon
                  className="absolute h-8 w-8 right-10 top-12"
                  icon={faUserGroup}
                />
              </div>
            </div>
            {selectedMenu === "dashboard" && (
              <div className="flex gap-5 px-5 h-full">
                <div className="relative w-2/6 h-3/5 p-5 gap-6 bg-white flex flex-col">
                  <div className="flex items-center gap-4 px-5 pt-5">
                    <FontAwesomeIcon className="h-5 w-5" icon={faUserGroup} />
                    <p>Intern Lists</p>
                  </div>
                  {/* Search bar */}
                  <div className="mt-4">
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <div className="mt-4 flex items-start extracted-data-container">
                    {filteredData.map((user) => (
                      <div
                        key={user.name}
                        className="flex items-center gap-2 p-2 font-myFont leading-7 tracking-wide"
                      >
                        <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold">{user.name}</p>
                          <p className="text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative w-4/5 h-3/5 p-5 gap-6 bg-white flex flex-col">
                  <div className="flex items-center p-5 gap-6">
                    <FontAwesomeIcon icon={faList} />
                    <p>Attendance Details</p>
                  </div>
                  <div className="absolute top-2 right-3 mt-2 mr-2 flex items-center bg-white p-2 rounded-md shadow">
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
                  <table className="w-full text-left border-collapse">
                    <thead
                      style={{ backgroundColor: "#112130" }}
                      className="text-white"
                    >
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
            )}
            {selectedMenu === "intern" && (
              <div className="flex gap-5 px-5 h-full">
                <div className="relative w-full h-3/5 p-5 gap-6 bg-white flex flex-col">
                  <div className="flex items-center p-5 gap-6">
                    <FontAwesomeIcon icon={faList} />
                    <p>Intern Details</p>

                    <input
                      type="text"
                      className="w-2/6 px-4 py-2 border border-gray-300 rounded-xl"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleSearchInterns}
                    />
                  </div>

                  <div className="absolute top-2 right-3 mt-2 mr-2 flex items-center bg-white p-2 rounded-md shadow">
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
                  <table className="w-full text-left border-collapse">
                    <thead
                      style={{ backgroundColor: "#112130" }}
                      className="text-white"
                    >
                      <tr>
                        <th className="px-3 rounded-l-lg font-medium text-sm">
                          Full Name
                        </th>
                        <th className="px-3 font-medium text-sm">Email</th>
                        <th className="px-3 font-medium text-sm">ID</th>
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
                          <td className="p-3 font-myFont">{intern.name}</td>
                          <td className="p-3 font-myFont">{intern.email}</td>
                          <td className="p-3 font-myFont">{intern.id}</td>
                          <td className="p-3 font-myFont">150</td>
                          <td className="p-3 font-myFont">
                            <button
                              className="rounded-3xl bg-slate-200 px-5 py-2 text-sm font-myFont  text-white hover:text-black"
                              style={{ backgroundColor: "#1C5A41" }}
                              onClick={() => handleViewButton(intern.id)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
