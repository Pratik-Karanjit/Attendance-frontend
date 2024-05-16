import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

function Header({
  profile,
  staffs,
  dashboard,
  attendance,
  adminrequests,
  department,
  accounts,
}) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAMPM] = useState("");
  const [sideMenu, setSideMenu] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  function convertTo24HourFormat(time12h) {
    console.log("Input time:", time);
    // Split the time string into hours, minutes, and AM/PM parts
    const [time, modifier] = time12h.split(" ");

    // Split the hours and minutes
    const [hours, minutes] = time.split(":");

    // Convert hours to 24-hour format
    let hours24 = parseInt(hours, 10);
    if (modifier === "PM" && hours24 < 12) {
      hours24 += 12;
    } else if (modifier === "AM" && hours24 === 12) {
      hours24 = 0;
    }

    function handleTimeChange(input) {
      const time = input.value.trim(); // Trim whitespace from the input

      // Split the input time into hours and minutes
      const [hours, minutes] = time
        .split(":")
        .map((part) => parseInt(part, 10));

      // Adjust the hours for 12 PM and 12 AM
      let adjustedHours = hours;
      if (adjustedHours === 12) {
        adjustedHours = input.value.includes("AM") ? 0 : 12;
      } else if (input.value.includes("PM")) {
        adjustedHours += 12;
      }

      // Format the adjusted time
      const formattedTime = `${adjustedHours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

      // Update the input value with the formatted time
      input.value = formattedTime;
    }

    // Pad hours and minutes with leading zeros if needed
    const paddedHours = hours24.toString().padStart(2, "0");
    const paddedMinutes = minutes.padStart(2, "0");

    // Return the time in 24-hour format
    return `${paddedHours}:${paddedMinutes}:00`;
  }

  function formatTime(time) {
    if (!time) return ""; // Return empty string if time is undefined
    // Extract hour, minute, and second parts
    const [hour, minute] = time.split(":").slice(0, 2);
    // Format hour part to 12-hour format and determine AM or PM
    let formattedHour = parseInt(hour, 10) % 12 || 12; // Convert hour to 12-hour format
    const amPM = parseInt(hour, 10) >= 12 ? "PM" : "AM"; // Determine AM or PM
    formattedHour = formattedHour.toString().padStart(2, "0"); // Ensure two digits for hour
    // Return formatted time with AM/PM indicator
    return ` ${formattedHour}:${minute} ${amPM}`;
  }

  function extractHours(timeValue) {
    if (!timeValue) return "";
    // Split the time value by colon to extract hours, minutes, seconds, and milliseconds
    const [hoursStr, minutesStr, secondsStr] = timeValue.split(":");
    // Convert hours, minutes, and seconds to numbers
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);
    // Calculate the total hours by converting minutes and seconds to hours
    const totalHours = hours + minutes / 60 + seconds / 3600;
    // Return the total hours rounded to 2 decimal places
    return totalHours.toFixed(2);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setYear(now.getFullYear());
      setMonth(now.getMonth() + 1);
      setDay(now.getDate());
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert hours to 12-hour format
      setHour(hours);
      setMinute(minutes < 10 ? "0" + minutes : minutes);
      setAMPM(ampm);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className={sideMenu ? "header blur-effect" : "header"}>
        <div className="logo-menu">
          <div onClick={() => setSideMenu(!sideMenu)} className="menu">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
          <div className="logo">
            <Link to={"/dashboard"}>
              <img src="/static/skill.png" alt="" />
            </Link>
          </div>
        </div>
        <div className="beta-version">
          <Link to={"/dashboard"}>
            <img src="/static/beta er.png" alt="" />
          </Link>
        </div>

        <div className="card-currentdate">
          <div className="date">
            <div className="row">
              {year && month && day ? (
                <>
                  <div className="year">{year}</div>
                  <div className="colon">:</div>
                  <div className="month">{month}</div>
                  <div className="colon">:</div>
                  <div className="day">{day}</div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="time">
            <div className="row">
              {hour && minute && ampm ? (
                <>
                  {" "}
                  <div className="year">{hour}</div>
                  <div className="colon">:</div>
                  <div className="month">
                    {minute} <span style={{ fontSize: "10px" }}>{ampm}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="year"></div>
                  <div className="colon"></div>
                  <div className="month">
                    <span style={{ fontSize: "10px" }}></span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="icons">
          {/* <div className="search">
            <i class="fa fa-search" aria-hidden="true"></i>
          </div> */}
          <div className="bell">
            <i class="fa fa-bell" aria-hidden="true"></i>
          </div>
          {userLogin.userInfo &&
            userLogin.userInfo.user_data.role == "admin" && (
              <>
                <Link to={"/register"}>
                  <div className="create">
                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                  </div>
                </Link>
              </>
            )}

          <Link to={"/profile"}>
            <div className="user">
              <i className="fa fa-user" aria-hidden="true"></i>
            </div>
          </Link>
        </div>
      </div>

      <div className={!sideMenu ? "sidemenu" : "sidemenu side-menu-show"}>
        <div onClick={() => setSideMenu(!sideMenu)} className="cross">
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
        <div className="top">
          <div className="logo-sidemenu">
            {/* <img src="/static/skill.png" alt="" /> */}
            <img src="/static/skillxattendance.png" alt="" />
          </div>
          <div className="nav">
            <ul className="menu">
              <Link to="/dashboard">
                <li className={dashboard && "active"}>
                  <i className="fa fa-tachometer" aria-hidden="true"></i>
                  Dashboard
                </li>
              </Link>
              {userLogin.userInfo &&
                userLogin.userInfo.user_data.role == "intern" && (
                  <Link to={"/attendance"}>
                    <li className={attendance && "active"}>
                      <i className="fa fa-book" aria-hidden="true"></i>
                      Attendance
                    </li>
                  </Link>
                )}
              <Link to={"/profile"}>
                <li className={profile && "active"}>
                  <i className="fa fa-user" aria-hidden="true"></i>
                  Profile
                </li>
              </Link>

              {userLogin.userInfo &&
                userLogin.userInfo.user_data.role == "super admin" && (
                  <Link>
                    <li className={department && "active"}>
                      <i class="fa fa-building" aria-hidden="true"></i>
                      Department
                    </li>
                  </Link>
                )}
              {userLogin.userInfo &&
              userLogin.userInfo.user_data.role == "admin" ? (
                <>
                  <Link to={"/staffs"}>
                    <li className={staffs && "active"}>
                      <i class="fa fa-users" aria-hidden="true"></i>
                      Staff Attendance
                    </li>
                  </Link>
                </>
              ) : (
                <></>
              )}
              {userLogin.userInfo &&
                userLogin.userInfo.user_data.role == "admin" && (
                  <Link to={"/admin-requests"}>
                    <li>
                      <i className="fa fa-lock" aria-hidden="true"></i>
                      Admin Requests
                    </li>
                  </Link>
                )}
              {/* <Link>
                <li>
                  <i class="fa fa-calendar" aria-hidden="true"></i>
                  Calendar
                </li>
              </Link> */}
            </ul>
          </div>
        </div>

        <div className="vector-image">
          <img src="/static/timeforskill.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default Header;
