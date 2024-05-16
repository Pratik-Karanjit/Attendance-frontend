import React, { useEffect, useState } from "react";
import SideMenu from "../../components/sidebar/SideMenu";
import Header from "../../components/Header/Header";
import "./adminrequest.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pendingRequest } from "../../actions/attendanceActions";
import { listUsers, userDetails } from "../../actions/userActions";

import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { PENDING_ATTENDANCE_REQUEST_RESET } from "../../constants/attendanceConstants";

function AdminRequest() {
  const dispatch = useDispatch();

  const pendingAttendance = useSelector((state) => state.pendingAttendance);
  const {
    error: pendingError,
    loading: pendingLoading,
    success: pendingSuccess,
    pendingData,
  } = pendingAttendance;

  useEffect(() => {
    dispatch(pendingRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listUsers());
  }, []);
  const usersList = useSelector((state) => state.userList);
  const { loading, error, users } = usersList;

  return (
    <>
      <div className="layout">
        <div className="leftpart">
          <div className="fixed">
            <div className={pendingLoading || pendingError ? "blur" : ""}>
              <SideMenu adminrequests=" adminrequests" />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="container">
            <div
              className={pendingLoading || pendingError ? "blur" : ""}
              style={{ position: "sticky", top: "0px", zIndex: "10" }}
            >
              <Header dashboard="dashboard" />
            </div>

            {pendingLoading && (
              <>
                {" "}
                <div className="pop-up-update">
                  <div className="info">
                    <Loader />
                  </div>
                </div>
              </>
            )}

            {pendingError && (
              <div className="error-approval">
                <Message error={pendingError} />
                <button
                  onClick={() => {
                    dispatch({ type: PENDING_ATTENDANCE_REQUEST_RESET });
                  }}
                >
                  Ok
                </button>
              </div>
            )}

            <div
              className={
                pendingLoading || pendingError
                  ? "adminrequest-card blur"
                  : "adminrequest-card"
              }
            >
              <h2>Pending Requests</h2>
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>S.N</th>
                      <th>User</th>
                      <th>Requested Attendance Date</th>
                      <th>Status</th>
                      <th>View More</th>
                    </tr>
                  </thead>
                  <tbody>
                    <>
                      {pendingData &&
                      Array.isArray(pendingData.request_attedence) ? (
                        pendingData.request_attedence.map((entry) => (
                          <>
                            <tr key={entry.id}>
                              <td>{entry.id}</td>
                              <td className="email">
                                
                                {users &&
                                  users.find((user) => user.pk === entry.user)
                                    ?.email}
                              </td>
                              <td>{entry.attedence_date}</td>
                              <td>{entry.status}</td>
                              <td>
                                <Link
                                  to={`/attendance-approval/${entry.user}/${entry.id}`}
                                >
                                  <button>View More</button>
                                </Link>
                              </td>
                            </tr>
                          </>
                        ))
                      ) : (
                        <>
                          <tr>
                            <td colSpan="5">No data</td>
                          </tr>
                        </>
                      )}
                    </>
                  </tbody>
                </table>
              </div>
              <div className="mobile-column">
                {pendingData && Array.isArray(pendingData.request_attedence) ? (
                  pendingData.request_attedence.map((entry) => (
                    <div key={entry.id}>
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
                          <p>User:</p>
                        </div>
                        <div className="values">
                          <p className="email">
                            {users &&
                              users.find((user) => user.pk === entry.user)
                                ?.email}
                          </p>
                        </div>
                      </div>
                      <div className="data">
                        <div className="fields">
                          <p>Department:</p>
                        </div>
                        <div className="values">
                          <p className="email">
                            {users &&
                              users.find((user) => user.pk === entry.user)
                                ?.department_name}
                          </p>
                        </div>
                      </div>
                      <div className="data">
                        <div className="fields">
                          <p>Attendance Date:</p>
                        </div>
                        <div className="values">
                          <p>{entry.attedence_date}</p>
                        </div>
                      </div>
                      <div className="data">
                        <div className="fields">
                          <p>Status:</p>
                        </div>
                        <div className="values">
                          <p>{entry.status}</p>
                        </div>
                      </div>
                      <div className="data">
                        <div className="fields">
                          <Link
                            to={`/attendance-approval/${entry.user}/${entry.id}`}
                          >
                            <button>View More</button>
                          </Link>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))
                ) : (
                  <>
                    <p>No Data</p>
                    <hr />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminRequest;
