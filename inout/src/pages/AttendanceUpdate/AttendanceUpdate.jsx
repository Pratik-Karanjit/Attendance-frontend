import React, { useEffect, useState } from "react";
import SideMenu from "../../components/sidebar/SideMenu";
import Header from "../../components/Header/Header";
import "./attendanceupdate.css";
import "../../components/CurrentDate/currentdate.css";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../../actions/userActions";
import "../../components/CurrentDate/currentdate.css";
import {
  detailAttendance,
  updateAttendance,
} from "../../actions/attendanceActions";
import { ATTENDANCE_UPDATE_RESET } from "../../constants/attendanceConstants";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
function AttendanceUpdate() {
  const dispatch = useDispatch();

  const [updateInTime, setUpdateInTime] = useState("");
  const [sendPress, setSendPress] = useState("");
  const [updateBreak1In, setUpdateBreak1In] = useState("");
  const [updateBreak1Out, setUpdateBreak1Out] = useState("");
  const [updateBreak2In, setUpdateBreak2In] = useState("");
  const [updateBreak2Out, setUpdateBreak2Out] = useState("");
  const [updateOutTime, setUpdateOutTime] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const Details = useSelector((state) => state.userDetails);
  const detailsAttendance = useSelector((state) => state.attendanceDetail);
  const {
    loading: detailAttendanceLoading,
    error: detailAttendanceError,
    detailData,
  } = detailsAttendance;
  const attendanceUpdate = useSelector((state) => state.updateAttendance);
  const {
    loading: updateAttendanceLoading,
    error: updateAttendanceError,
    updatedData,
    success: updateAttendanceSuccess,
  } = attendanceUpdate;

  const { loading, error, userDetail } = Details;
  const id = location.pathname.split("/")[2];
  console.log("userid" + id);
  const attendanceId = location.pathname.split("/")[3];
  console.log("attendanceid" + attendanceId);
  useEffect(() => {
    dispatch(userDetails(id));
    dispatch(detailAttendance(attendanceId));
  }, [dispatch, id, attendanceId]);

  const updateHandler = () => {
    dispatch(
      updateAttendance({
        updateInTime,
        updateBreak1In,
        updateBreak1Out,
        updateBreak2In,
        updateBreak2Out,
        updateOutTime,
        attendanceId,
      })
    );
  };

  return (
    <div className="layout">
      <div className="leftpart">
        <div className="fixed">
          <div
            className={
              updateAttendanceError ||
              updateAttendanceLoading ||
              updateAttendanceSuccess ||
              sendPress
                ? "blur"
                : ""
            }
          >
            <SideMenu adminrequests="adminrequests" />
          </div>
        </div>
      </div>
      <div className="right">
        <div className="container">
          <div
            className={
              updateAttendanceError ||
              updateAttendanceLoading ||
              updateAttendanceSuccess ||
              sendPress
                ? "blur"
                : ""
            }
            style={{ position: "sticky", top: "0px", zIndex: "10" }}
          >
            <Header dashboard="dashboard" />
          </div>
          {sendPress &&  (
            <>
            { !updateInTime || !updateOutTime ?   
             (<>
              <div className="error-update">
              <Message error="Please enter all the required fields " />
              <button
                onClick={() => setSendPress(false)}
              >
                Ok
              </button>
            </div>
            </>):(<>
              <div className="pop-up-update">
                <h2>Are you sure you want to update with given details?</h2>
                <div className="btns">
                  <button
                    className="success-btn"
                    onClick={() => {
                      updateHandler();
                      setSendPress(false);
                    }}
                  >
                    yes
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => setSendPress(false)}
                  >
                    
                    No
                  </button>
                </div>
              </div>
            </>)  }
              
            </>
          ) 
          }

          {updateAttendanceSuccess && (
            <div className="pop-up-update">
              <div className="info">
                <h2>Attedance Updated Successfully</h2>
                <div className="btns">
                  <button
                    onClick={() => dispatch({ type: ATTENDANCE_UPDATE_RESET })}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          )}

          {updateAttendanceLoading || loading && (
            <div className="pop-up-update">
              <div className="info">
                <Loader />
              </div>
            </div>
          )}

          {updateAttendanceError || error && (
            <div className="error-update">
              <Message error={updateAttendanceError && updateAttendanceError} />
              <button
                onClick={() => dispatch({ type: ATTENDANCE_UPDATE_RESET })}
              >
                Ok
              </button>
            </div>
          )}

          <div
            className={
              updateAttendanceError ||
              updateAttendanceLoading ||
              updateAttendanceSuccess ||
              sendPress
                ? "adminrequest-card blur"
                : "adminrequest-card"
            }
          >
            <h2>Attendance Update</h2>
            <div className="manual-attendance">
              <div className="attendance">
                <div className="form-attendance">
                  <>
                    <div className="field">
                      <div className="field-name">
                        <label htmlFor="">User :</label>
                      </div>

                      <div className="value">
                        <p className="user">{userDetail && userDetail.email}</p>
                      </div>
                    </div>
                  </>

                  {/* <div className="field">
                    <div className="field-name">
                      <label htmlFor="">Attendance Date(Required):</label>
                    </div>
                    <div className="value">
                      <p className="user">
                        .............................................................
                      </p>
                    </div>
                  </div> */}
                  <div className="field">
                    <div className="field-name">
                      <label htmlFor="">In Time (Required):</label>
                    </div>
                    <div className="value">
                      <input
                        value={updateInTime}
                        onChange={(event) =>
                          setUpdateInTime(event.target.value)
                        }
                        type="time"
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="field-name">
                      <label htmlFor="">First Break In:</label>
                    </div>
                    <div className="value">
                      <input
                        value={updateBreak1In}
                        onChange={(event) =>
                          setUpdateBreak1In(event.target.value)
                        }
                        type="time"
                        step="1"
                        pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="field-name">
                      <label htmlFor="">First Break Out:</label>
                    </div>
                    <div className="value">
                      <input
                        value={updateBreak1Out}
                        onChange={(event) =>
                          setUpdateBreak1Out(event.target.value)
                        }
                        type="time"
                        step="1"
                        pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="field-name">
                      <label htmlFor="">Second Break In:</label>
                    </div>
                    <div className="value">
                      <input
                        value={updateBreak2In}
                        onChange={(event) =>
                          setUpdateBreak2In(event.target.value)
                        }
                        type="time"
                        step="1"
                        pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="field-name">
                      <label htmlFor="">Second Break Out:</label>
                    </div>
                    <div className="value">
                      <input
                        value={updateBreak2Out}
                        onChange={(event) =>
                          setUpdateBreak2Out(event.target.value)
                        }
                        type="time"
                        step="1"
                        pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="field-name">
                      <label htmlFor="">Out Time (Required):</label>
                    </div>
                    <div className="value">
                      <input
                        value={updateOutTime}
                        onChange={(event) =>
                          setUpdateOutTime(event.target.value)
                        }
                        type="time"
                        step="1"
                        pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                        required
                      />
                    </div>
                  </div>

                  <div
                    onClick={() => setSendPress(true)}
                    style={{ cursor: "pointer" }}
                    className="btn"
                  >
                    <p>Send</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceUpdate;
