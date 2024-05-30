import React, { useEffect, useMemo, useState } from "react";

import PropTypes from "prop-types"; // Import PropTypes
import "./banner.css";
import { useSelector, useDispatch } from "react-redux";
import {
  InTime,
  OutTime,
  Break1InTime,
  Break1OutTime,
  Break2InTime,
  Break2OutTime,
} from "../../actions/attendanceActions";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { listAttendance } from "../../actions/userActions";
import { Link } from "react-router-dom";

function Banner({
  userLogin,
  inTimePress,
  outTimePress,
  break1InPress,
  break1OutPress,
  break2InPress,
  break2OutPress,
  setBreak1InPress,
  setBreak1OutPress,
  setBreak2InPress,
  setBreak2OutPress,
  setInTimePress,
  setOutTimePress,
}) {
  // const [outTimePress, setOutTimePress] = useState(false);
  // const [inTimePress, setInTimePress] = useState(false);
  // const [break1InPress, setBreak1InPress] = useState(false);
  // const [break1OutPress, setBreak1OutPress] = useState(false);
  // const [break2InPress, setBreak2InPress] = useState(false);
  // const [break2OutPress, setBreak2OutPress] = useState(false);
  const userInTime = useSelector((state) => state.userInTime);
  const {
    loading: loadingIntime,
    error: errorIntime,
    success: successIntime,
    inTime,
  } = userInTime;
  const userOutTime = useSelector((state) => state.userOutTime);
  const { loading: loadingOuttime, error: errorOuttime, outTime } = userOutTime;
  const userAttendance = useSelector((state) => state.userAttendance);
  const {
    attendance,
    loading: attendanceLoading,
    error: attendanceError,
  } = userAttendance;
  const latestAttendance = attendance?.daily_attendance?.[0] ?? null;

  console.log("l " + latestAttendance);
  const userBreak1InTime = useSelector((state) => state.break1In);
  const {
    loading: loadingbreak1in,
    error: errorbreak1in,
    success: successbreak1in,
    break1InTime,
  } = userBreak1InTime;
  const userBreak1OutTime = useSelector((state) => state.break1Out);
  const {
    loading: loadingbreak1out,
    error: errorbreak1out,
    success: successbreak1out,
    break1OutTime,
  } = userBreak1OutTime;
  const userBreak2InTime = useSelector((state) => state.break2In);
  const {
    loading: loadingbreak2in,
    error: errorbreak2in,
    success: successbreak2in,
    break2InTime,
  } = userBreak2InTime;
  const userBreak2OutTime = useSelector((state) => state.break2Out);
  const {
    loading: loadingbreak2out,
    error: errorbreak2out,
    success: successbreak2out,
    break2OutTime,
  } = userBreak2OutTime;
  const dispatch = useDispatch();

  const InTimeHandler = () => {
    dispatch(listAttendance());
    if (userLogin.userInfo) {
      dispatch(InTime());
      dispatch(listAttendance());
      setInTimePress(false);
    }
  };

  const OutTimeHandler = () => {
    dispatch(listAttendance());
    if (
      userLogin.userInfo &&
      latestAttendance.out_time == null &&
      latestAttendance.in_time != null
    ) {
      dispatch(OutTime());
      dispatch(listAttendance());
      setOutTimePress(false);
    }
  };
  const BreakIn1Handler = () => {
    dispatch(listAttendance());
    if (
      userLogin.userInfo &&
      latestAttendance.first_break_in == null &&
      latestAttendance.attedence_date == todayDate &&
      latestAttendance.out_time == null &&
      latestAttendance.in_time != null
    ) {
      dispatch(listAttendance());
      dispatch(Break1InTime());
      setBreak1InPress(false);
    }
  };
  const BreakOut1Handler = () => {
    dispatch(listAttendance());
    if (
      userLogin.userInfo &&
      latestAttendance.first_break_in != null &&
      latestAttendance.first_break_out == null &&
      latestAttendance.attedence_date == todayDate &&
      latestAttendance.in_time != null &&
      latestAttendance.out_time == null
    ) {
      dispatch(listAttendance());
      dispatch(Break1OutTime());
      setBreak1OutPress(false);
    }
  };
  const BreakIn2Handler = () => {
    dispatch(listAttendance());
    if (
      userLogin.userInfo &&
      latestAttendance.second_break_in == null &&
      latestAttendance.second_break_out == null &&
      latestAttendance.attedence_date == todayDate &&
      latestAttendance.first_break_out &&
      latestAttendance.out_time == null &&
      latestAttendance.in_time != null
    ) {
      dispatch(listAttendance());
      dispatch(Break2InTime());
      setBreak2InPress(false);
    }
  };
  const BreakOut2Handler = () => {
    dispatch(listAttendance());
    if (
      userLogin.userInfo &&
      latestAttendance.second_break_out == null &&
      latestAttendance.second_break_in &&
      latestAttendance.first_break_in &&
      latestAttendance.first_break_out &&
      latestAttendance.out_time == null &&
      latestAttendance.in_time != null
    ) {
      dispatch(listAttendance());
      dispatch(Break2OutTime());
      setBreak2OutPress(false);
    }
  };

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
  const today = new Date();

  // Extract year, month, and day separately
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // getMonth returns zero-based month
  const day = String(today.getDate()).padStart(2, "0");

  // Combine year, month, and day in desired format
  const todayDate = `${year}-${month}-${day}`;
  console.log(todayDate);
  useEffect(() => {
    dispatch(listAttendance());
  }, [dispatch]);

  return (
    <>
      {outTimePress && (
        <>
          <div className="pop-up-banner">
            {!inTime ? (
              <>
                <div className="danger">
                  <h1>Please Enter your Intime first </h1>
                  <div>
                    <button onClick={() => setOutTimePress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : latestAttendance &&
              latestAttendance.first_break_in &&
              latestAttendance.first_break_out == null ? (
              <>
                <div className="danger">
                  <h1>Please End Your First Break </h1>
                  <div>
                    <button onClick={() => setOutTimePress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : latestAttendance &&
              latestAttendance.second_break_in &&
              latestAttendance.second_break_out == null ? (
              <>
                <div className="danger">
                  <h1>Please End Your Second Break </h1>
                  <div>
                    <button onClick={() => setOutTimePress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : latestAttendance && latestAttendance.out_time ? (
              <>
                <>
                  <div className="danger">
                    <h1>Attendance for today is already done</h1>
                    <p>Contact your admin for any changes</p>
                    <div>
                      <button onClick={() => setOutTimePress(false)}>Ok</button>
                    </div>
                  </div>
                </>
              </>
            ) : (
              latestAttendance &&
              latestAttendance.in_time &&
              inTime != null &&
              latestAttendance.attedence_date != todayDate && (
                <>
                  <div className="feedback">
                    <h1>Are you sure you want to end ?</h1>
                    <div className="btns">
                      <button onClick={OutTimeHandler}>Yes</button>
                      <button
                        className="reject"
                        onClick={() => setOutTimePress(false)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </>
      )}
      {inTimePress && (
        <>
          <div className="pop-up-banner">
            {latestAttendance &&
            latestAttendance.attedence_date == todayDate &&
            latestAttendance.in_time ? (
              <>
                <div className="danger">
                  <h1>Attendance for today is already done</h1>
                  <p>Contact your admin for any changes</p>
                  <div>
                    <button onClick={() => setInTimePress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="feedback">
                  <h1>Are you sure you want to enter your in time ?</h1>
                  <div className="btns">
                    <button onClick={InTimeHandler}>Yes</button>
                    <button
                      className="reject"
                      onClick={() => setInTimePress(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {outTimePress && (
        <>
          <div className="pop-up-banner">
            {(latestAttendance && !latestAttendance.in_time) ||
            latestAttendance == null ? (
              <>
                <div className="danger">
                  <h1>Enter your intime first!</h1>

                  <div>
                    <button onClick={() => setOutTimePress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : latestAttendance &&
              latestAttendance.first_break_in &&
              latestAttendance.first_break_out == null ? (
              <>
                <div className="danger">
                  <h1>Please End Your First Break </h1>
                  <div>
                    <button onClick={() => setOutTimePress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : latestAttendance &&
              latestAttendance.second_break_in &&
              latestAttendance.second_break_out == null ? (
              <>
                <div className="danger">
                  <h1>Please End Your Second Break </h1>
                  <div>
                    <button onClick={() => setOutTimePress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : latestAttendance &&
              latestAttendance.attedence_date == todayDate &&
              latestAttendance.out_time ? (
              <>
                <>
                  <div className="danger">
                    <h1>Attendance for today is already done</h1>
                    <p>Contact your admin for any changes</p>
                    <div>
                      <button onClick={() => setOutTimePress(false)}>Ok</button>
                    </div>
                  </div>
                </>
              </>
            ) : (
              <>
                <div className="feedback">
                  <h1>Are you sure you want to end ?</h1>
                  <div className="btns">
                    <button onClick={OutTimeHandler}>Yes</button>
                    <button
                      className="reject"
                      onClick={() => setOutTimePress(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {break1InPress && (
        <>
          <div className="pop-up-banner">
            {inTime == null ? (
              <>
                <div className="danger">
                  <h1>Enter your intime first!</h1>

                  <div>
                    <button onClick={() => setBreak1InPress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : latestAttendance &&
              latestAttendance.attedence_date == todayDate &&
              latestAttendance.first_break_in &&
              latestAttendance.out_time == null ? (
              <>
                <div className="danger">
                  <h1>Already Entered!</h1>

                  <div>
                    <button onClick={() => setBreak1InPress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : latestAttendance &&
              latestAttendance.attedence_date == todayDate &&
              latestAttendance.out_time ? (
              <>
                <>
                  <div className="danger">
                    <h1>Attendance for today is already done</h1>
                    <p>Contact your admin for any changes</p>
                    <div>
                      <button onClick={() => setBreak1InPress(false)}>
                        Ok
                      </button>
                    </div>
                  </div>
                </>
              </>
            ) : (
              <>
                <div className="feedback">
                  <h1>
                    Are you sure you want to enter your first break in time ?
                  </h1>
                  <div className="btns">
                    <button onClick={BreakIn1Handler}>Yes</button>
                    <button
                      className="reject"
                      onClick={() => setBreak1InPress(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {break1OutPress && (
        <>
          <div className="pop-up-banner">
            {inTime == null ? (
              <>
                <div className="danger">
                  <h1>Enter your intime first!</h1>

                  <div>
                    <button onClick={() => setBreak1OutPress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : latestAttendance &&
              latestAttendance.attedence_date == todayDate &&
              latestAttendance.first_break_in == null ? (
              <>
                <div className="danger">
                  <h1>Enter your first break in time at first </h1>

                  <div>
                    <button onClick={() => setBreak1OutPress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : latestAttendance &&
              latestAttendance.attedence_date == todayDate &&
              latestAttendance.first_break_out &&
              latestAttendance.out_time == null ? (
              <>
                <div className="danger">
                  <h1>Already Entered!</h1>

                  <div>
                    <button onClick={() => setBreak1OutPress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="feedback">
                  <h1>
                    Are you sure you want to enter your first break out time ?
                  </h1>
                  <div className="btns">
                    <button onClick={BreakOut1Handler}>Yes</button>
                    <button
                      className="reject"
                      onClick={() => setBreak1OutPress(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {break2InPress && (
        <>
          <div className="pop-up-banner">
            {inTime == null ? (
              <>
                <div className="danger">
                  <h1>Enter your intime first!</h1>

                  <div>
                    <button onClick={() => setBreak2InPress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : latestAttendance &&
              latestAttendance.attedence_date == todayDate &&
              latestAttendance.second_break_in &&
              latestAttendance.out_time == null ? (
              <>
                <div className="danger">
                  <h1>Already Entered!</h1>

                  <div>
                    <button onClick={() => setBreak2InPress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : (latestAttendance &&
                latestAttendance.attedence_date == todayDate &&
                latestAttendance.first_break_in == null) ||
              latestAttendance.first_break_out == null ? (
              <>
                <div className="danger">
                  <h1>Complete your first break at first </h1>

                  <div>
                    <button onClick={() => setBreak2InPress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : latestAttendance &&
              latestAttendance.attedence_date == todayDate &&
              latestAttendance.out_time ? (
              <>
                <>
                  <div className="danger">
                    <h1>Attendance for today is already done</h1>
                    <p>Contact your admin for any changes</p>
                    <div>
                      <button onClick={() => setBreak2InPress(false)}>
                        Ok
                      </button>
                    </div>
                  </div>
                </>
              </>
            ) : (
              <>
                <div className="feedback">
                  <h1>
                    Are you sure you want to enter your second break in time ?
                  </h1>
                  <div className="btns">
                    <button onClick={BreakIn2Handler}>Yes</button>
                    <button
                      className="reject"
                      onClick={() => setBreak2InPress(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {break2OutPress && (
        <>
          <div className="pop-up-banner">
            {inTime == null ? (
              <>
                <div className="danger">
                  <h1>Enter your intime first!</h1>

                  <div>
                    <button onClick={() => setBreak2OutPress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : latestAttendance &&
              latestAttendance.attedence_date == todayDate &&
              latestAttendance.second_break_in == null ? (
              <>
                <div className="danger">
                  <h1>Enter your second break in time at first </h1>

                  <div>
                    <button onClick={() => setBreak2OutPress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : (latestAttendance &&
                latestAttendance.attedence_date == todayDate &&
                latestAttendance.first_break_in == null) ||
              latestAttendance.first_break_out == null ? (
              <>
                <div className="danger">
                  <h1>Complete your first break at first </h1>

                  <div>
                    <button onClick={() => setBreak2OutPress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : latestAttendance &&
              latestAttendance.attedence_date == todayDate &&
              latestAttendance.second_break_out &&
              latestAttendance.out_time == null ? (
              <>
                <div className="danger">
                  <h1>Already Entered!</h1>

                  <div>
                    <button onClick={() => setBreak2OutPress(false)}>Ok</button>
                  </div>
                </div>
              </>
            ) : latestAttendance &&
              latestAttendance.attedence_date == todayDate &&
              latestAttendance.out_time ? (
              <>
                <>
                  <div className="danger">
                    <h1>Attendance for today is already done</h1>
                    <p>Contact your admin for any changes</p>
                    <div>
                      <button onClick={() => setBreak2OutPress(false)}>
                        Ok
                      </button>
                    </div>
                  </div>
                </>
              </>
            ) : (
              <>
                <div className="feedback">
                  <h1>
                    Are you sure you want to enter your second break out time ?
                  </h1>
                  <div className="btns">
                    <button onClick={BreakOut2Handler}>Yes</button>
                    <button
                      className="reject"
                      onClick={() => setBreak2OutPress(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
      <div
        className={
          outTimePress ||
          inTimePress ||
          break1InPress ||
          break1OutPress ||
          break2InPress ||
          break2OutPress
            ? "banner blur"
            : "banner"
        }
      >
        <div
          className={
            outTimePress ||
            inTimePress ||
            break1InPress ||
            break1OutPress ||
            break2InPress ||
            break2OutPress
              ? "left blur"
              : "left"
          }
        >
          <h1>Welcome!</h1>
          {userLogin.userInfo ? (
            <h2 className="banner-email">
              {userLogin.userInfo.user_data.full_name
                ? userLogin.userInfo.user_data.full_name
                : userLogin.userInfo.user_data.email}
            </h2>
          ) : (
            <h2>User</h2>
          )}
          {loadingIntime ||
          loadingOuttime ||
          loadingbreak1in ||
          loadingbreak1out ||
          loadingbreak2in ||
          loadingbreak2out ? (
            <Loader />
          ) : null}
          {errorIntime && (
            <div className="error-message-banner">
              <Message error={errorIntime} variant="error" />
            </div>
          )}
          {errorOuttime && (
            <div className="error-message-banner">
              <Message error={errorOuttime} variant="error" />
            </div>
          )}
          {errorbreak1in && (
            <div className="error-message-banner">
              <Message error={errorbreak1in} variant="error" />
            </div>
          )}
          {errorbreak1out && (
            <div className="error-message-banner">
              <Message error={errorbreak1out} variant="error" />
            </div>
          )}
          {errorbreak2in && (
            <div className="error-message-banner">
              <Message error={errorbreak2in} variant="error" />
            </div>
          )}
          {errorbreak2out && (
            <div className="error-message-banner">
              <Message error={errorbreak2out} variant="error" />
            </div>
          )}
          {latestAttendance &&
            latestAttendance.in_time &&
            userLogin.userInfo.user_data.role != "admin" &&
            latestAttendance.attedence_date == todayDate &&
            !latestAttendance.out_time && (
              <div className="intime-display">
                <Message
                  inTime={`Intime :${formatTime(latestAttendance.in_time)}`}
                  variant="success"
                />
              </div>
            )}
          {latestAttendance &&
            latestAttendance.first_break_in &&
            latestAttendance.first_break_out == null &&
            latestAttendance.attedence_date == todayDate && (
              <div className="break-display">
                <Message
                  Onbreak={`First Break Running From:${formatTime(
                    latestAttendance.first_break_in
                  )}`}
                  variant="break"
                  nonAnimatedOffline="online"
                />
              </div>
            )}
          {successbreak2in &&
            !successbreak2out &&
            latestAttendance &&
            latestAttendance.attedence_date == todayDate && (
              <div className="break-display">
                <Message
                  Onbreak={`Second break started at:${formatTime(
                    latestAttendance.second_break_in
                  )}`}
                  variant="break"
                  nonAnimatedOffline="online"
                />
              </div>
            )}

          {userLogin.userInfo &&
          userLogin.userInfo.user_data.role === "intern" ? (
            <>
              <div className="time-card">
                <div className="timing">
                  <div className="inout-card">
                    <div
                      onClick={() => setInTimePress(true)}
                      className="intime"
                    >
                      <h3 style={{ color: "#423636" }}>In Time:</h3>
                      <div className="time">
                        <h4 style={{ color: "#423636" }}>Start Work </h4>
                        <div style={{ color: "#423636" }} className="arrow">
                          <i
                            className="fa fa-arrow-right"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>

                    <div className="separator"></div>
                    <div
                      onClick={() => setOutTimePress(true)}
                      className={
                        !inTime && !outTime
                          ? "outtime"
                          : inTime
                          ? "outtime"
                          : outTime && "outtime"
                      }
                    >
                      <h3 style={{ color: "#423636" }}>Out Time:</h3>
                      <div className="time">
                        <h4 style={{ color: "#423636" }}>Stop Work </h4>
                        <div className="arrow">
                          <i
                            style={{ color: "#423636" }}
                            className="fa fa-arrow-right"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="breaks">
                  <div className="breaks-card">
                    <div
                      onClick={() => setBreak1InPress(true)}
                      className={
                        !inTime && !outTime
                          ? "outtime"
                          : inTime
                          ? "outtime"
                          : outTime && "outtime"
                      }
                    >
                      <h3 style={{ color: "#423636" }}> Break 1:</h3>
                      <div className="time">
                        <h4 style={{ color: "#423636" }}>Start Break </h4>
                        <div className="arrow">
                          <i
                            style={{ color: "#423636" }}
                            className="fa fa-arrow-right"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                    <div className="separator"></div>
                    <div
                      onClick={() => setBreak1OutPress(true)}
                      className={
                        !inTime && !outTime
                          ? "intime"
                          : inTime
                          ? "intime"
                          : outTime && "intime"
                      }
                    >
                      <h3 style={{ color: "#423636" }}>Break 1:</h3>
                      <div className="time">
                        <h4 style={{ color: "#423636" }}>Stop Break </h4>
                        <div className="arrow">
                          <i
                            style={{ color: "#423636" }}
                            className="fa fa-arrow-right"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="breaks">
                  <div className="breaks-card">
                    <div
                      onClick={() => setBreak2InPress(true)}
                      className={
                        !inTime && !outTime
                          ? "outtime"
                          : inTime
                          ? "outtime"
                          : outTime && "outtime"
                      }
                    >
                      <h3 style={{ color: "#423636" }}>Break 2:</h3>
                      <div className="time">
                        <h4 style={{ color: "#423636" }}>Start Break </h4>
                        <div className="arrow">
                          <i
                            style={{ color: "#423636" }}
                            className="fa fa-arrow-right"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                    <div className="separator"></div>
                    <div
                      onClick={() => setBreak2OutPress(true)}
                      className={
                        !inTime && !outTime
                          ? "intime"
                          : inTime
                          ? "intime"
                          : outTime && "intime"
                      }
                    >
                      <h3 style={{ color: "#423636" }}>Break 2:</h3>
                      <div className="time">
                        <h4 style={{ color: "#423636" }}>Stop Break </h4>
                        <div className="arrow">
                          <i
                            style={{ color: "#423636" }}
                            className="fa fa-arrow-right"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="staff-status">
                <Link to="/staffs">
                  <div className="active">
                    <h2>
                      {" "}
                      <i className="fa fa-users" aria-hidden="true"></i>
                      <br /> Staffs
                    </h2>
                  </div>
                </Link>

                <div className="seperator"></div>
                <Link to="/register">
                  <div className="not-active">
                    <h2>
                      <i className="fa fa-user-plus" aria-hidden="true"></i>{" "}
                      <br /> Add Staff{" "}
                    </h2>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="right">
          <img src="/static/timeforskill.png" alt="" />
        </div>
      </div>
    </>
  );
}

// PropTypes validation
Banner.propTypes = {
  userLogin: PropTypes.shape({
    userInfo: PropTypes.shape({
      user_data: PropTypes.shape({
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Banner;
