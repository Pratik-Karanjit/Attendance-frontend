import React, { useEffect, useState } from "react";
import "./currentdate.css";

import { useDispatch, useSelector } from "react-redux";
import Message from "../Message/Message";
import { listAttendance, listUsers } from "../../actions/userActions";
import {
  Break1InTime,
  manualAttendance,
  manualAttendanceRequest,
  staffAttendance,
} from "../../actions/attendanceActions";
import Loader from "../Loader/Loader";
import {
  MANUAL_ATTENDANCE_REQUEST_RESET,
  MANUAL_ATTENDANCE_RESET,
} from "../../constants/attendanceConstants";
import SideMenu from "../sidebar/SideMenu";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function CurrentDate({ sendPress, setSendPress }) {
  const [notFill, setNotFill] = useState(false);
  const [matchingAttendances, setMatchingAttendances] = useState(false);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAMPM] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");
  const [inTimeManual, setInTimeManual] = useState("");
  const [firstBreakIn, setFirstBreakIn] = useState("");
  const [firstBreakOut, setFirstBreakOut] = useState("");
  const [secondBreakIn, setSecondBreakIn] = useState("");
  const [secondBreakOut, setSecondBreakOut] = useState("");
  const [outTimeManual, setOutTimeManual] = useState("");
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();
  const userOutTime = useSelector((state) => state.userOutTime);
  const { loading: loadingOuttime, error: errorOuttime, outTime } = userOutTime;
  const usersList = useSelector((state) => state.userList);
  const { loading: loadingUserList, error: errorUserList, users } = usersList;
  const userLogin = useSelector((state) => state.userLogin);
  const userAttendance = useSelector((state) => state.userAttendance);
  const {
    attendance,
    loading: attendanceLoading,
    error: attendanceError,
  } = userAttendance;
  const staffAttendances = useSelector((state) => state.staffAttendance);
  const {
    Attendance,
    loading: staffAttendanceLoading,
    error: staffAttendanceError,
  } = staffAttendances;
  const latestAttendance =
    attendance &&
    attendance.daily_attendance.map((data, index) => {
      if (index === 0) {
        return data;
      }
      return null;
    })[0];
  const manual = useSelector((state) => state.manualAttendance);
  const {
    loading: loadingManual,
    error: errorManual,
    manualData,
    success: successManual,
  } = manual;

  const manualRequest = useSelector((state) => state.manualAttendanceRequest);
  const {
    loading: loadingManualRequest,
    error: errorManualRequest,
    manualRequestData,
    success: successManualRequest,
  } = manualRequest;

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
    if (successManualRequest) {
      Swal.fire({
        icon: "success",
        title: "Attendance request success",
        text: "Your attendance request has been sent successfully.",
      });

      // Clear form fields
      setSelectedUser("");
      setAttendanceDate("");
      setInTimeManual("");
      setFirstBreakIn("");
      setFirstBreakOut("");
      setSecondBreakIn("");
      setSecondBreakOut("");
      setOutTimeManual("");
      setReason("");

      // Dispatch reset action
      dispatch({ type: MANUAL_ATTENDANCE_REQUEST_RESET });
    }
  }, [successManualRequest, dispatch]);

  const matchingAttendance =
    Attendance && selectedUser && Attendance.attendances
      ? Attendance.attendances.filter(
          (entry) => entry.attedence_date == attendanceDate
        )
      : [];
  let manualInTime = inTimeManual;
  let manualBreak1In = firstBreakIn;
  let manualBreak1Out = firstBreakOut;
  let manualBreak2In = secondBreakIn;
  let manualBreak2Out = secondBreakOut;
  let manualOutTime = outTimeManual;
  const submitHandler = (event) => {
    event.preventDefault();

    console.log(manualInTime);
    console.log(attendanceDate);
    const dataToSend = {
      selectedUser,
      attendanceDate,
      manualInTime,
      manualBreak1In,
      manualBreak1Out,
      manualBreak2In,
      manualBreak2Out,
      manualOutTime,
    };

    const dataToSendByIntern = {
      attendanceDate,
      manualInTime,
      manualBreak1In,
      manualBreak1Out,
      manualBreak2In,
      manualBreak2Out,
      manualOutTime,
      reason,
    };

    dispatch(manualAttendanceRequest(dataToSendByIntern));

    setSendPress(false);
  };

  useEffect(() => {
    if (attendanceDate && inTimeManual && outTimeManual) {
      setNotFill(false);
    }

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
  useEffect(() => {
    if (userLogin.userInfo.user_data.role != "intern" && selectedUser) {
      dispatch(staffAttendance(parseInt(selectedUser)));
      console.log(selectedUser);
    }
    if (userLogin.userInfo.user_data.role != "intern") {
      dispatch(listUsers());
    }
  }, [dispatch, userLogin]);

  return (
    <>
      {/* {loadingManual ||
        (loadingManualRequest && (
          <>
            <div className="pop-up">
              <Loader />
            </div>
          </>
        ))} */}
      {sendPress && (
        <>
          <div className="pop-up-manual-attendance">
            {(userLogin.userInfo.user_data.role == "intern" || selectedUser) &&
            attendanceDate &&
            manualInTime &&
            manualOutTime ? (
              <>
                <div className="info">
                  <h1>Are you sure you want to submit?</h1>
                  <div className="btns">
                    <button onClick={() => setSendPress(false)}>No</button>
                    <button onClick={submitHandler}>yes</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="error">
                  <h1>Please fill all the fields</h1>
                  <div>
                    <button onClick={() => setSendPress(false)}>Ok</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {errorManual && (
        <>
          <div className="error-approval">
            <Message error={errorManual} />
            <button
              onClick={() => {
                dispatch({ type: MANUAL_ATTENDANCE_RESET });
              }}
            >
              Ok
            </button>
          </div>
        </>
      )}

      {errorManualRequest && (
        <>
          <div className="error-approval">
            <Message error={errorManualRequest} />
            <button
              onClick={() => {
                dispatch({ type: MANUAL_ATTENDANCE_REQUEST_RESET });
              }}
            >
              Ok
            </button>
          </div>
        </>
      )}

      {successManual && (
        <>
          <div className="pop-up-manual-attendance">
            {userLogin.userInfo.user_data.role != "intern" && (
              <>
                <div className="info">
                  <h1>Manual attendance successfully done</h1>
                  <div className="btns">
                    <Link to={`/staffs/attendance/${selectedUser}`}>
                      <button
                        onClick={() =>
                          dispatch({ type: MANUAL_ATTENDANCE_RESET })
                        }
                      >
                        Ok
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {successManualRequest && <></>}

      {userLogin.userInfo &&
        latestAttendance &&
        userLogin.userInfo.user_data.role != "admin" &&
        latestAttendance.out_time != null && (
          <div
            className={
              sendPress ? "recent-attendance blur " : "recent-attendance"
            }
          >
            <Message
              date={`Date : ${latestAttendance.attedence_date}`}
              inTime={`Intime :${formatTime(latestAttendance.in_time)} `}
              nonAnimatedOnline="online"
              nonAnimatedOffline="offline"
              variant="info"
              outTime={` OutTime :${formatTime(latestAttendance.out_time)}`}
              workingHour={` Total Working Hours:${extractHours(
                latestAttendance.total_working_hour
              )}`}
              break1In={`First Break Start:${formatTime(
                latestAttendance.first_break_in
              )}`}
              break1Out={`First Break End:${formatTime(
                latestAttendance.first_break_out
              )}`}
              break2In={`Second Break Start:${formatTime(
                latestAttendance.second_break_in
              )}`}
              break2Out={`Second Break End:${formatTime(
                latestAttendance.second_break_out
              )}`}
              recentAttendance="Recent Attendance"
              profile="View More"
            />
          </div>
        )}
      <div className="row">
        <div
          className={
            sendPress ||
            errorManual ||
            successManual ||
            successManualRequest ||
            errorManualRequest
              ? "manual-attendance"
              : "manual-attendance"
          }
        >
          <div className="attendance">
            {userLogin.userInfo &&
            userLogin.userInfo.user_data.role === "intern" ? (
              <>
                <h1 className="font-bold text-xl">Manual Attendance Request</h1>
              </>
            ) : (
              <>
                <h1>Manual Attendance</h1>
              </>
            )}

            <div className="form-attendance">
              {userLogin.userInfo &&
                userLogin.userInfo.user_data.role != "intern" && (
                  <>
                    <div className="field">
                      <div className="field-name">
                        <label htmlFor="">User (Required):</label>
                      </div>

                      <div className="value">
                        <select
                          value={selectedUser}
                          onChange={(event) =>
                            setSelectedUser(event.target.value)
                          }
                        >
                          <option value="">User</option>
                          {users &&
                            users.map((option, index) => (
                              <option key={index} value={option.pk}>
                                {option.email}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-6/12">
                  <div className="w-full">
                    <label
                      style={{ fontWeight: "normal", fontSize: "16px" }}
                      htmlFor=""
                    >
                      Attendance Date <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="w-full">
                    <input
                      className="w-full"
                      value={attendanceDate}
                      onChange={(event) =>
                        setAttendanceDate(event.target.value)
                      }
                      type="date"
                      required
                    />
                  </div>
                </div>

                <div className="w-6/12">
                  <div className="flex flex-col w-full">
                    <div className="w-full">
                      <label
                        style={{ fontWeight: "normal", fontSize: "16px" }}
                        htmlFor=""
                      >
                        In Time <span style={{ color: "red" }}>*</span>
                      </label>
                    </div>
                    <div className="w-full">
                      <input
                        className="w-full"
                        value={inTimeManual}
                        onChange={(event) =>
                          setInTimeManual(event.target.value)
                        }
                        type="time"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row w-full">
                <div className="flex flex-col w-6/12">
                  <div className="w-full">
                    <label
                      style={{ fontWeight: "normal", fontSize: "16px" }}
                      htmlFor=""
                    >
                      First Break In:
                    </label>
                  </div>
                  <div className="w-full">
                    <input
                      className="w-full"
                      value={firstBreakIn}
                      onChange={(event) => setFirstBreakIn(event.target.value)}
                      type="time"
                    />
                  </div>
                </div>

                <div className="w-6/12">
                  <div className="flex flex-col w-full">
                    <div className="w-full">
                      <label
                        style={{ fontWeight: "normal", fontSize: "16px" }}
                        htmlFor=""
                      >
                        First Break Out
                      </label>
                    </div>
                    <div className="w-full">
                      <input
                        className="w-full"
                        value={firstBreakOut}
                        onChange={(event) =>
                          setFirstBreakOut(event.target.value)
                        }
                        type="time"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row w-full">
                <div className="flex flex-col w-4/12">
                  <div className="w-full">
                    <label
                      style={{ fontWeight: "normal", fontSize: "16px" }}
                      htmlFor=""
                    >
                      Second Break In
                    </label>
                  </div>
                  <div className="w-full">
                    <input
                      className="w-full"
                      value={secondBreakIn}
                      onChange={(event) => setSecondBreakIn(event.target.value)}
                      type="time"
                    />
                  </div>
                </div>
                <div className="w-4/12">
                  <div className="flex flex-col w-full">
                    <div className="w-full">
                      <label
                        style={{ fontWeight: "normal", fontSize: "16px" }}
                        htmlFor=""
                      >
                        Second Break Out
                      </label>
                    </div>
                    <div className="w-full">
                      <input
                        className="w-full"
                        value={secondBreakOut}
                        onChange={(event) =>
                          setSecondBreakOut(event.target.value)
                        }
                        type="time"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-4/12">
                  <div className="flex flex-col w-full">
                    <div className="w-full">
                      <label
                        style={{ fontWeight: "normal", fontSize: "16px" }}
                        htmlFor=""
                      >
                        Out Time <span style={{ color: "red" }}>*</span>
                      </label>
                    </div>
                    <div className="w-full">
                      <input
                        className="w-full"
                        value={outTimeManual}
                        onChange={(event) =>
                          setOutTimeManual(event.target.value)
                        }
                        type="time"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {userLogin.userInfo &&
                userLogin.userInfo.user_data.role === "intern" && (
                  <>
                    <div className="description">
                      <label htmlFor="">
                        Reason<span style={{ color: "red" }}>*</span>
                      </label>
                      <textarea
                        style={{ borderRadius: "10px" }}
                        placeholder="Write your reason for manual attendance..."
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        required
                      ></textarea>
                    </div>
                  </>
                )}

              <div className="w-full flex items-end justify-end">
                <button
                  onClick={() => setSendPress(true)}
                  style={{ cursor: "pointer" }}
                  className="btn "
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentDate;
