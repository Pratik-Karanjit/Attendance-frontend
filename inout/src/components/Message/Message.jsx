import React from "react";
import "./message.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Message({
  error,
  message,
  inTime,
  outTime,
  nonAnimatedOnline,
  nonAnimatedOffline,
  workingHour,
  break1In,
  break1Out,
  break2In,
  break2Out,
  recentAttendance,
  profile,
  Onbreak,
  variant,
  date,
}) {
  return (
    <>
      <div className={`message-card ${variant}`}>
        {recentAttendance && (
          <h2 style={{ marginBottom: "20px" }}>{recentAttendance}</h2>
        )}
        {error && (
          <div>
            {error == "Request failed with status code 400"
              ? "Please enter correct credentials"
              : error}
          </div>
        )}
        {date && (
          <div className="flex">
            <div></div>
            <div>
              <i
                style={{ marginRight: "5px" }}
                class="fa fa-calendar-check-o"
                aria-hidden="true"
              ></i>

              {date}
            </div>
          </div>
        )}

        {inTime && (
          <div className="flex">
            <div
              className={nonAnimatedOnline ? "online" : "online-animated"}
            ></div>
            <div>{inTime}</div>
          </div>
        )}
        {Onbreak && (
          <div className="flex">
            <div></div>
            <div>{Onbreak}</div>
          </div>
        )}
        {outTime && (
          <div className="flex">
            <div
              className={nonAnimatedOffline ? "offline" : "offline-animated"}
            ></div>
            <div>{outTime}</div>
          </div>
        )}

        {break1In != null && (
          <div className="flex">
            <div></div>
            <div>
              {" "}
              <i
                style={{ marginRight: "10px" }}
                class="fa fa-arrow-right"
                aria-hidden="true"
              ></i>
              {break1In}
            </div>
          </div>
        )}
        {break1Out && (
          <div className="flex">
            <div></div>
            <div>
              {" "}
              <i
                style={{ marginRight: "10px" }}
                class="fa fa-arrow-left"
                aria-hidden="true"
              ></i>
              {break1Out}
            </div>
          </div>
        )}
        {break2In && (
          <div className="flex">
            <div></div>
            <div>
              <i
                style={{ marginRight: "10px" }}
                class="fa fa-arrow-right"
                aria-hidden="true"
              ></i>

              {break2In}
            </div>
          </div>
        )}
        {break2Out && (
          <div className="flex">
            <div></div>
            <div>
              <i
                style={{ marginRight: "10px" }}
                class="fa fa-arrow-left"
                aria-hidden="true"
              ></i>
              {break2Out}
            </div>
          </div>
        )}

        {workingHour && (
          <div>
            <i
              style={{ marginLeft: "10px" }}
              class="fa fa-clock-o"
              aria-hidden="true"
            ></i>
            {workingHour}
          </div>
        )}

        {profile && (
          <Link to={"/attendance"}>
            <div
              style={{ cursor: "pointer", marginTop: "20px" }}
              className="link"
            >
              {profile}{" "}
            </div>
          </Link>
        )}
      </div>
    </>
  );
}
Message.propTypes = {
  error: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Message;
