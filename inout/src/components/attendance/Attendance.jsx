import React from "react";
import "./attendance.css";
import { useDispatch, useSelector } from "react-redux";
import { listAttendance } from "../../actions/userActions";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";

function Attendance() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const userAttendance = useSelector((state) => state.userAttendance);
  const { attendance, loading, error } = userAttendance;
  const { daily_attendance } = userAttendance;

  useEffect(() => {
    if (userLogin.userInfo) {
      dispatch(listAttendance());
    }
  }, [dispatch, userLogin.userInfo]);

  const dailyAttendance = userAttendance.attendance?.daily_attendance || [];

  // Function to convert time string to standard AM/PM format
  const formatTime = (timeString) => {
    if (!timeString) return "No data"; // Handle case when timeString is null or undefined
    const [hoursStr, minutesStr, secondsStr] = timeString.split(/[:.]/);
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    let period = "AM";

    if (hours >= 12) {
      period = "PM";
      if (hours > 12) {
        hours -= 12;
      }
    }

    if (hours === 0) {
      hours = 12; // 12:00 AM
    }

    const formattedTime = `${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${period}`;
    return formattedTime;
  };

  // Function to convert total working hour time string to total hours
  const calculateTotalHours = (timeString) => {
    if (!timeString) return "No data"; // Handle case when timeString is null or undefined
    const [hoursStr, minutesStr, secondsStr] = timeString.split(/[:.]/);
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);
    const totalHours = hours + minutes / 60 + seconds / 3600;
    return totalHours.toFixed(2); // Round off to 2 decimal places
  };

  return (
    <div className="attendance">
      <div className="attendance-title">
        <h4>Attendance</h4>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>S.N</th>
              <th>Date</th>
              <th>In Time</th>

              <th>Break In</th>
              <th>Break Out</th>
              <th>Break In</th>
              <th>Break Out</th>
              <th>Out Time</th>
            </tr>
          </thead>
          <tbody>
            {error && <Message error={error} variant="error" />}
            {loading ? (
              <Loader />
            ) : (
              <>
                {dailyAttendance.length > 0 ? (
                  dailyAttendance.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.id}</td>
                      <td>{entry.entry_date}</td>
                      <td>{formatTime(entry.in_time)}</td>
                      <td>
                        {entry.first_break_in
                          ? formatTime(entry.first_break_in)
                          : "No Data"}
                      </td>
                      <td>
                        {entry.first_break_out
                          ? formatTime(entry.first_break_out)
                          : "No Data"}
                      </td>
                      <td>
                        {entry.first_break_in
                          ? formatTime(entry.second_break_in)
                          : "No Data"}
                      </td>
                      <td>
                        {entry.first_break_out
                          ? formatTime(entry.second_break_out)
                          : "No Data"}
                      </td>
                      <td>
                        {entry.out_time
                          ? formatTime(entry.out_time)
                          : "No Data"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No data</td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      <div className="mobile-column">
        {loading ? (
          <Loader />
        ) : (
          <>
            {" "}
            {attendance &&
            attendance.daily_attendance &&
            attendance.daily_attendance.length > 0 ? (
              attendance.daily_attendance.map((entry) => (
                <>
                  <div className="data">
                    <div className="fields">
                      <p style={{ fontWeight: "750", fontSize: "22px" }}>
                        S.N:
                      </p>
                    </div>
                    <div className="values">
                      <p style={{ fontWeight: "750", fontSize: "22px" }}>
                        {entry.id}
                      </p>
                    </div>
                  </div>
                  <div className="data">
                    <div className="fields">
                      {" "}
                      <p>Atd Date:</p>
                    </div>
                    <div className="values">
                      {" "}
                      <p>{entry.attedence_date}</p>
                    </div>
                  </div>

                  <div className="data">
                    <div className="fields">
                      <p>Entry Date:</p>
                    </div>
                    <div className="values">
                      {" "}
                      <p>{entry.entry_date}</p>
                    </div>
                  </div>
                  <div className="data">
                    <div className="fields">
                      {" "}
                      <p>In Time:</p>
                    </div>
                    <div className="values">{formatTime(entry.in_time)}</div>
                  </div>

                  <div className="data">
                    {" "}
                    <div className="fields">
                      {" "}
                      <p>Break In :</p>
                    </div>
                    <div className="values">
                      {formatTime(entry.first_break_in)}
                    </div>
                  </div>
                  <div className="data">
                    {" "}
                    <div className="fields">
                      {" "}
                      <p>Break Out :</p>
                    </div>
                    <div className="values">
                      {formatTime(entry.first_break_out)}
                    </div>
                  </div>
                  <div className="data">
                    {" "}
                    <div className="fields">
                      {" "}
                      <p>Break In :</p>
                    </div>
                    <div className="values">
                      {formatTime(entry.second_break_in)}
                    </div>
                  </div>
                  <div className="data">
                    {" "}
                    <div className="fields">
                      {" "}
                      <p>Break Out :</p>
                    </div>
                    <div className="values">
                      {formatTime(entry.second_break_out)}
                    </div>
                  </div>

                  <div className="data">
                    {" "}
                    <div className="fields">
                      {" "}
                      <p>Out Time:</p>
                    </div>
                    <div className="values">{formatTime(entry.out_time)}</div>
                  </div>

                  <hr />
                </>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data</td>
              </tr>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Attendance;
