import React, { useEffect, useState } from "react";
import SideMenu from "../../components/sidebar/SideMenu";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import "./attendanceapproval.css";
import { userDetails } from "../../actions/userActions";
import { useLocation } from "react-router-dom";
import {
  manualAttendance,
  pendingDelete,
  pendingRequestDetail,
} from "../../actions/attendanceActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import {
  MANUAL_ATTENDANCE_RESET,
  PENDING_ATTENDANCE_DELETE_RESET,
  PENDING_ATTENDANCE_DETAIL_REQUEST_REQUEST,
  PENDING_ATTENDANCE_DETAIL_REQUEST_RESET,
  PENDING_ATTENDANCE_REQUEST_RESET,
} from "../../constants/attendanceConstants";
import { USER_DETAIL_RESET } from "../../constants/userConstants";

function AttendanceApproval() {
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[2];

  const [sendPress, setSendPress] = useState("");

  const Details = useSelector((state) => state.userDetails);
  const { error, loading, success } = Details;

  const userLogin = useSelector((state) => state.userLogin);

  const pendingDetail = useSelector((state) => state.pendingAttendanceDetail);
  const {
    error: pendingError,
    loading: pendingLoading,
    success: pendingSuccess,
    pendingDetailData,
  } = pendingDetail;

  const deletePending = useSelector((state) => state.pendingDeletion);
  const {
    error: pendingDeletionError,
    loading: pendingDeletionLoading,
    success: pendingDeleteSuccess,
    pendingDataDelete,
  } = deletePending;
  const attendanceId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(userDetails(id));
  }, []);


  const [selectedUser, setSelectedUser] = useState(id);
  const [attendanceDate, setAttendanceDate] = useState(
    pendingDetailData?.request_attedence?.attedence_date ?? ""
  );
  const [rejectpress, setRejectPress] = useState("");
  const [inTimeManual, setInTimeManual] = useState(
    pendingDetailData?.request_attedence?.in_time ?? ""
  );
  const [firstBreakIn, setFirstBreakIn] = useState(
    pendingDetailData?.request_attedence?.first_break_in ?? ""
  );
  const [firstBreakOut, setFirstBreakOut] = useState(
    pendingDetailData?.request_attedence?.first_break_out ?? ""
  );
  const [secondBreakIn, setSecondBreakIn] = useState(
    pendingDetailData?.request_attedence?.second_break_in ?? ""
  );
  const [secondBreakOut, setSecondBreakOut] = useState(
    pendingDetailData?.request_attedence?.second_break_out ?? ""
  );
  const [outTimeManual, setOutTimeManual] = useState(
    pendingDetailData?.request_attedence?.out_time ?? ""
  );

  useEffect(() => {
    dispatch(pendingRequestDetail(attendanceId));
  }, [attendanceId]);
  let manualInTime = inTimeManual;
  let manualBreak1In = firstBreakIn;
  let manualBreak1Out = firstBreakOut;
  let manualBreak2In = secondBreakIn;
  let manualBreak2Out = secondBreakOut;
  let manualOutTime = outTimeManual;

  const submitHandler = (event) => {
    event.preventDefault();


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

    if (
      userLogin &&
      userLogin.userInfo &&
      userLogin.userInfo.user_data &&
      userLogin.userInfo.user_data.role != "intern"
    ) {
      dispatch(manualAttendance(dataToSend));
    }

    setSendPress(false);
  };
  const rejectHandler = (event) => {
    event.preventDefault();
    if (
      userLogin &&
      userLogin.userInfo &&
      userLogin.userInfo.user_data &&
      userLogin.userInfo.user_data.role != "intern"
    ) {
      dispatch(pendingDelete(attendanceId));
    }

    setRejectPress(false);
  };

  const manual = useSelector((state) => state.manualAttendance);
  const {
    loading: loadingManual,
    error: errorManuaL,
    manualData,
    success: successManual,
  } = manual;

  const intimeBeforeDot = pendingDetailData &&
  pendingDetailData.request_attedence &&
  pendingDetailData.request_attedence.in_time?.split(".")[0];


  return (
    <div>
      <div className="layout">
        <div className="leftpart">
          <div className="fixed">
            <div
              className={
                loadingManual ||
                loading ||
                pendingLoading ||
                errorManuaL ||
                error ||
                pendingError ||
                successManual ||
                sendPress ||
                rejectpress ||
                pendingDeleteSuccess ||
                pendingDeletionError ||
                pendingDeletionLoading
                  ? "blur"
                  : ""
              }
            >
              <SideMenu/>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="container">
            <div
              className={
                loadingManual ||
                loading ||
                pendingLoading ||
                errorManuaL ||
                error ||
                pendingError ||
                successManual ||
                sendPress || rejectpress ||
                pendingDeleteSuccess ||
                pendingDeletionError ||
                pendingDeletionLoading
                  ? "blur"
                  : ""
              }
              style={{ position: "sticky", top: "0px", zIndex: "10" }}
            >
              <Header dashboard="dashboard" />
            </div>
            {sendPress && (
              <>
                {!manualInTime || !manualOutTime || !attendanceDate ? (
                  <>
                    <div className="error-approval">
                      <Message error="Please enter all the required fields " />
                      <button onClick={() => setSendPress(false)}>Ok</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="pop-up-update">
                      <h2>
                        Are you sure you want to update with given details?
                      </h2>
                      <div className="btns">
                        <button className="success-btn" onClick={submitHandler}>
                          yes
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => setSendPress(false)}
                        >
                          No
                        </button>
                        {console.log("intime " + inTimeManual &&  inTimeManual)}
                        {console.log("outtime " + outTimeManual &&  outTimeManual)}
                        {console.log("attendancedate " + attendanceDate &&  attendanceDate)}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {rejectpress && (
              <>
                <div className="pop-up-update">
                  <h2>Are you sure you want to reject the request ?</h2>
                  <div className="btns">
                    <button className="success-btn" onClick={rejectHandler}>
                      yes
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => setRejectPress(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </>
            )}

            {successManual && (
              <div className="pop-up-update">
                <div className="info">
                  <h2>Attedance Updated Successfully</h2>
                  <div className="btns">
                    <button
                      onClick={() =>
                        dispatch({ type: MANUAL_ATTENDANCE_RESET })
                      }
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            )}

            {pendingDeleteSuccess && (
              <div className="pop-up-update">
                <div className="info">
                  <h2>Requested Attendance Rejeted Successfully</h2>
                  <div className="btns">
                    <button
                      onClick={() =>
                        dispatch({ type: PENDING_ATTENDANCE_DELETE_RESET })
                      }
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            )}

            {successManual && (
              <div className="pop-up-update">
                <div className="info">
                  <h2>Attedance Updated Successfully</h2>
                  <div className="btns">
                    <button
                      onClick={() =>
                        dispatch({ type: MANUAL_ATTENDANCE_RESET })
                      }
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <>
                <div className="pop-up-update">
                  <div className="info">
                    <Loader />
                  </div>
                </div>
              </>
            )}

            {pendingDeletionLoading && (
              <>
                <div className="pop-up-update">
                  <div className="info">
                    <Loader />
                  </div>
                </div>
              </>
            )}

            {pendingLoading && (
              <>
                <div className="pop-up-update">
                  <div className="info">
                    <Loader />
                  </div>
                </div>
              </>
            )}

            {loadingManual && (
              <>
                <div className="pop-up-update">
                  <div className="info">
                    <Loader />
                  </div>
                </div>
              </>
            )}

            {errorManuaL && (
              <div className="error-approval">
                <Message error={errorManuaL} />
                <button
                  onClick={() => {
                    dispatch({ type: MANUAL_ATTENDANCE_RESET });
                  }}
                >
                  Ok
                </button>
              </div>
            )}

            {pendingError && (
              <div className="error-approval">
                <Message error={pendingError} />
                <button
                  onClick={() => {
                    dispatch({ type: MANUAL_ATTENDANCE_RESET });
                    dispatch({ type: PENDING_ATTENDANCE_DETAIL_REQUEST_RESET });
                  }}
                >
                  Ok
                </button>
              </div>
            )}

            {pendingDeletionError && (
              <div className="error-approval">
                <Message error={pendingDeletionError} />
                <button
                  onClick={() => {
                    dispatch({ type: PENDING_ATTENDANCE_DELETE_RESET });
                  }}
                >
                  Ok
                </button>
              </div>
            )}
            {error && (
              <div className="error-approval">
                <Message error={error} />
                <button
                  onClick={() => {
                    dispatch({ type: USER_DETAIL_RESET });
                  }}
                >
                  Ok
                </button>
              </div>
            )}

            <div
              className={
                loadingManual ||
                loading ||
                pendingLoading ||
                errorManuaL ||
                error ||
                pendingError ||
                successManual ||
                sendPress || rejectpress ||
                pendingDeleteSuccess ||
                pendingDeletionError ||
                pendingDeletionLoading
                  ? "adminrequest-card blur"
                  : "adminrequest-card"
              }
            >
              <h2>Attendance Approval</h2>
              <div className="manual-attendance">
                <div className="attendance">
                  <div className="form-attendance">
                    <div className="field">
                      <div className="field-name">
                        <label htmlFor="">User:</label>
                      </div>

                      <div className="value">
                        <p>{Details.userDetail && Details.userDetail.email}</p>
                      </div>
                    </div>
                    <div className="field">
                      <div className="field-name">
                        <label htmlFor="">Department :</label>
                      </div>

                      <div className="value">
                        <p>
                          {Details.userDetail &&
                            Details.userDetail.department_name}
                        </p>
                      </div>
                    </div>
                    <div className="field">
                      <div className="field-name">
                        <label htmlFor="">Attendance Date(Required):</label>
                      </div>
                      <div className="value">
                        <input
                          onChange={(event) =>
                            setAttendanceDate(event.target.value)
                          }
                          defaultValue={    pendingDetailData &&
                            pendingDetailData.request_attedence &&
                            pendingDetailData.request_attedence.attedence_date}
                          type="date"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="field-name">
                        <label htmlFor="">In Time (Required):</label>
                      </div>
                      <div className="value">
                        <input
                        defaultValue={ intimeBeforeDot}
                         
                          onChange={(event) =>
                            setInTimeManual(event.target.value)
                          }
                          type="time"
                          step="1"
                          pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
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
                        defaultValue={    pendingDetailData &&
                          pendingDetailData.request_attedence &&
                          pendingDetailData.request_attedence.first_break_in}
                    
                          onChange={(event) =>
                            setFirstBreakIn(event.target.value)
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
                        defaultValue={    pendingDetailData &&
                          pendingDetailData.request_attedence &&
                          pendingDetailData.request_attedence.first_break_out}
                   
                          onChange={(event) =>
                            setFirstBreakOut(event.target.value)
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
                         
                          defaultValue={pendingDetailData &&
                            pendingDetailData.request_attedence &&
                            pendingDetailData.request_attedence.second_break_in}
                          onChange={(event) =>
                            setSecondBreakIn(event.target.value)
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
                       
                          defaultValue={    pendingDetailData &&
                            pendingDetailData.request_attedence &&
                            pendingDetailData.request_attedence.second_break_out}
                          onChange={(event) =>
                            setSecondBreakOut(event.target.value)
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
                          defaultValue={    pendingDetailData &&
                            pendingDetailData.request_attedence &&
                            pendingDetailData.request_attedence.out_time}
                          onChange={(event) =>
                            setOutTimeManual(event.target.value)
                          }
                          type="time"
                          step="1"
                          pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="field-name">
                        <label htmlFor="">Reason:</label>
                      </div>
                      <div className="value">
                        <textarea
                          style={{
                            backgroundColor: "#eeeeee",
                            border: "none",
                            padding: "10px",
                            borderRadius: "10px",
                          }}
                          defaultValue={pendingDetailData &&
                            pendingDetailData.request_attedence &&
                            pendingDetailData.request_attedence.reason}
                            /
                        >
                          
                       
                      </div>
                    </div>
                    <div style={{ cursor: "pointer" }} className="btns">
                      <button
                        onClick={() => setSendPress(true)}
                        className="btn"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setRejectPress(true)}
                        className="btn-reject"
                      >
                        Reject
                      </button>
                    </div>
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

export default AttendanceApproval;
