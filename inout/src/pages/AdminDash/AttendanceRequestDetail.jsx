import {
  faCalendarDays,
  faClock,
  faEnvelope,
  faHourglassStart,
  faList,
  faMoneyBill,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "../../App.css";
import { acceptPendingRequest } from "../../actions/attendanceActions";

const AttendanceRequestDetail = () => {
  const params = useParams();
  const { internId } = params;
  console.log("params:", params); // Log the entire params object to see available keys
  console.log("internId:", internId); // Log internId to verify it's correct

  const dispatch = useDispatch();

  const listData = useSelector(
    (state) => state?.attendanceReducer?.attendanceData?.request_attedence || []
  );
  console.log("listData:", listData); // Log listData to ensure it's not empty

  const navigate = useNavigate();

  // Find the attendance data for the specific id
  const attendance = listData.find((item) => item.id === parseInt(internId));
  console.log("attendance:", attendance); // Log attendance to verify if it's found

  const handleNavigationButton = (internId, action) => {
    // Implement your accept/reject logic here
    console.log(`${action} request for id: ${internId}`);
  };

  if (!attendance) {
    return <div>No data found for the requested ID.</div>;
  }

  const handleAcceptButton = (pk) => {
    console.log("pk  here", pk);
    let status = "accepted";
    console.log("status  here", status);
    let navigateTo = navigate("/adminDashboard");
    dispatch(acceptPendingRequest(pk, status, navigateTo));
  };

  const handleRejectButton = (pk) => {
    console.log("pk  here", pk);
    let status = "rejected";
    console.log("status  here", status);
    dispatch(acceptPendingRequest(pk, status, navigate));
  };

  return (
    <div
      className="flex item-center justify-start px-5"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className="w-full bg-white rounded-xl p-5 mt-5">
        <div className="w-full">
          <p className="font-semibold text-2xl font-myFont tracking-wide w-full">
            Attendance Request Details
          </p>

          <div className="w-full flex flex-col gap-2 ">
            <div className="w-full flex items-start flex-row">
              <div className="w-3/12">
                <p className=" mt-5 font-myFont text-sm w-full text-start">
                  Full Name
                </p>
                <div className="relative w-full">
                  <div className="w-full rounded-lg h-12 border pl-10 custom-input flex items-center">
                    {" "}
                    {attendance.user_full_name}{" "}
                  </div>
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
              </div>

              <div className="w-3/12">
                <p className="mt-5 font-myFont text-sm w-full text-start">
                  Email
                </p>
                <div className="relative w-full">
                  <div className="w-full rounded-lg h-12 border pl-10 custom-input flex items-center overflow-hidden">
                    {" "}
                    {attendance.user_email}{" "}
                  </div>
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
              </div>
              <div className="w-3/12">
                <p className="mt-5 font-myFont text-sm  w-full text-start">
                  Attendance Date
                </p>
                <div className="relative w-full">
                  <div className="w-full rounded-lg h-12 border pl-10 custom-input flex items-center">
                    {" "}
                    {attendance.attedence_date}{" "}
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      style={{
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#A0AEC0",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="w-3/12">
                <p className="mt-5 font-myFont text-sm w-full text-start">
                  Entry Date
                </p>
                <div className="relative w-full">
                  <div className="w-full justify-start rounded-lg h-12 pl-10 border flex items-center">
                    {attendance.entry_date}
                  </div>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#A0AEC0",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-start flex-row">
              <div className="w-3/12">
                <p className=" mt-5 font-myFont text-sm w-full text-start">
                  Update Date
                </p>
                <div className="relative w-full">
                  <div className="w-full rounded-lg h-12 border pl-10 custom-input flex items-start">
                    {" "}
                    {attendance.update_date ? (
                      attendance.update_date
                    ) : (
                      <p>- - -</p>
                    )}{" "}
                  </div>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#A0AEC0",
                    }}
                  />
                </div>
              </div>

              <div className="w-3/12">
                <p className="mt-5 font-myFont text-sm w-full text-start">
                  In Time
                </p>
                <div className="relative w-full">
                  <div className="w-full rounded-lg h-12 border pl-10 custom-input flex items-start">
                    {" "}
                    {attendance.in_time}{" "}
                  </div>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#A0AEC0",
                    }}
                  />
                </div>
              </div>
              <div className="w-3/12">
                <p className="mt-5 font-myFont text-sm  w-full text-start">
                  First Break In
                </p>
                <div className="relative w-full">
                  <div className="w-full rounded-lg h-12 border pl-10 custom-input flex items-start">
                    {" "}
                    {attendance.first_break_in ? (
                      attendance.first_break_in
                    ) : (
                      <p>- - -</p>
                    )}{" "}
                  </div>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#A0AEC0",
                    }}
                  />
                </div>
              </div>

              <div className="w-3/12">
                <p className="mt-5 font-myFont text-sm w-full text-start">
                  First Break Out
                </p>
                <div className="relative w-full">
                  <div className="w-full flex items-start justify-start rounded-lg h-12 pl-10 border flex items-start">
                    {attendance.first_break_out ? (
                      attendance.first_break_out
                    ) : (
                      <p>- - -</p>
                    )}
                  </div>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#A0AEC0",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-start flex-row">
              <div className="w-3/12">
                <p className=" mt-5 font-myFont text-sm w-full text-start">
                  Second Break In
                </p>
                <div className="relative w-full">
                  <div className="w-full rounded-lg h-12 border pl-10 custom-input flex items-start">
                    {" "}
                    {attendance.second_break_in ? (
                      attendance.second_break_in
                    ) : (
                      <p>- - -</p>
                    )}{" "}
                  </div>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#A0AEC0",
                    }}
                  />
                </div>
              </div>

              <div className="w-3/12">
                <p className="mt-5 font-myFont text-sm w-full text-start">
                  Second Break Out
                </p>
                <div className="relative w-full">
                  <div className="w-full rounded-lg h-12 border pl-10 custom-input flex items-start">
                    {attendance.second_break_out ? (
                      attendance.second_break_out
                    ) : (
                      <p>- - -</p>
                    )}{" "}
                  </div>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#A0AEC0",
                    }}
                  />
                </div>
              </div>
              <div className="w-3/12">
                <p className="mt-5 font-myFont text-sm  w-full text-start">
                  Out Time
                </p>
                <div className="relative w-full">
                  <div className="w-full rounded-lg h-12 border pl-10 custom-input flex items-start">
                    {attendance.out_time}
                  </div>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#A0AEC0",
                    }}
                  />
                </div>
              </div>

              <div className="w-3/12">
                <p className="mt-5 font-myFont text-sm w-full text-start">
                  Total Working Hours
                </p>
                <div className="relative w-full">
                  <div className="w-full justify-start rounded-lg h-12 pl-10 border flex items-start">
                    {attendance.total_working_hour}
                  </div>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#A0AEC0",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-start flex-row">
              <div className="w-6/12">
                <p className=" mt-5 font-myFont text-sm w-full text-start">
                  Total Amount
                </p>
                <div className="relative w-full">
                  <div className="w-full rounded-lg h-12 border pl-10 custom-input flex items-start">
                    {attendance.total_amount}
                  </div>
                  <FontAwesomeIcon
                    icon={faMoneyBill}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#A0AEC0",
                    }}
                  />
                </div>
              </div>

              <div className="w-6/12">
                <p className="mt-5 font-myFont text-sm w-full text-start">
                  Status
                </p>
                <div className="relative w-full">
                  <div className="w-full rounded-lg h-12 border pl-10 custom-input flex items-start">
                    {attendance.status}
                  </div>
                  <FontAwesomeIcon
                    icon={faHourglassStart}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#A0AEC0",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-start flex-row">
              <div className="w-full">
                <p className=" mt-5 font-myFont text-sm w-full text-start">
                  Reason
                </p>
                <div className="relative w-full">
                  <div className="w-full rounded-lg h-12 border pl-3 custom-input flex items-start">
                    {attendance.reason}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-5 mt-5 justify-end w-full">
              <button
                className="w-1/5 rounded-lg h-12 font-semibold text-sm border border-orange-200 custom-cancel"
                style={{ color: "orange" }}
              >
                Go Back
              </button>
              <button
                className="w-1/5 rounded-lg h-12 font-semibold text-sm border border-orange-200 custom-cancel"
                style={{ color: "orange" }}
                onClick={() => {
                  handleRejectButton(attendance.id, attendance.status);
                }}
              >
                Reject
              </button>
              <button
                className="w-1/5 bg-orange-400 rounded-lg h-12 text-white font-semibold text-sm confirm-button"
                onClick={() => {
                  handleAcceptButton(attendance.id, attendance.status);
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceRequestDetail;
