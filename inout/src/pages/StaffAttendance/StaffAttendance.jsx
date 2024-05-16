import React, { useEffect, useState } from "react";
import SideMenu from "../../components/sidebar/SideMenu";
import Header from "../../components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  deleteAttendance,
  staffAttendance,
} from "../../actions/attendanceActions";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { ATTENDANCE_DELETE_RESET } from "../../constants/attendanceConstants";
import * as XLSX from "xlsx";
import "./staffattendance.css";

function StaffAttendance() {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  useEffect(() => {
    if (id) dispatch(staffAttendance(id));
  }, [dispatch, id]);

  const [btnPress, setBtnPress] = useState(false);
  const [fromDate, setFromDate] = useState(""); // State for "from" date
  const [toDate, setToDate] = useState(""); // State for "to" date
  const [cumulativeHour, setCumulativeHour] = useState("");

  const userLogin = useSelector((state) => state.userLogin);

  const [idAttendance, setIdAttendance] = useState("");
  const staff = useSelector((state) => state.staffAttendance);
  const { error, success, loading, Attendance } = staff;
  const deletedAttendance = useSelector((state) => state.deleteAttendance);
  const {
    error: errorDeletedData,
    success: successDeletedData,
    loading: loadingDeletedData,
    deletedData,
  } = deletedAttendance;

  const formatTime = (timeString) => {
    if (!timeString) return "No data";
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
      hours = 12;
    }

    const formattedTime = `${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${period}`;
    return formattedTime;
  };

  const calculateTotalHours = (timeString) => {
    if (!timeString) return 0;
    const [hoursStr, minutesStr, secondsStr] = timeString.split(/[:.]/);
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);
    const totalHours = hours + minutes / 60 + seconds / 3600;
    return totalHours.toFixed(2);
  };

  const filterDataByDateRange = (data) => {
    if (!fromDate || !toDate) return data;
    const filteredData = data.filter((entry) => {
      return entry.attedence_date >= fromDate && entry.attedence_date <= toDate;
    });
    return filteredData;
  };
  let totalHours = 0;

  const excelData =
    Attendance && Attendance.attendances
      ? filterDataByDateRange(Attendance.attendances).map((entry) => {
          totalHours += parseFloat(
            calculateTotalHours(entry.total_working_hour)
          );
          return {
            "S.N": entry.pk,
            Email: Attendance.email,
            Department: Attendance.department_name,
            "Attendance From": fromDate ? fromDate : "No Filter",
            "Attendance To": toDate ? toDate : "No Filter",
            "Atd Date": entry.attedence_date,
            "Entry Date": entry.entry_date,
            "In Time": formatTime(entry.in_time),
            "Break In": formatTime(entry.first_break_in),
            "Break Out": formatTime(entry.first_break_out),
            "Break In 2": formatTime(entry.second_break_in),
            "Break Out 2": formatTime(entry.second_break_out),
            "Out Time": entry.out_time ? formatTime(entry.out_time) : "No data",
            "Total Hour": calculateTotalHours(entry.total_working_hour),
            "Total Hour Till Date": totalHours.toFixed(2),
          };
        })
      : [];

  const deleteHandler = (idAttendance) => {
    dispatch(deleteAttendance(idAttendance));
    dispatch(staffAttendance(id));
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, "AttendanceReport.xlsx");
  };

  return (
    <div className="layout">
      <div className="leftpart">
        <div className="fixed">
          <div
            className={
              btnPress ||
              loadingDeletedData ||
              successDeletedData ||
              errorDeletedData
                ? "blur"
                : ""
            }
          >
            <SideMenu />
          </div>
        </div>
      </div>
      <div className="right">
        <div className="container">
          <div
            className={
              btnPress ||
              loadingDeletedData ||
              successDeletedData ||
              errorDeletedData
                ? "blur"
                : ""
            }
          >
            <Header />
          </div>

          {btnPress && (
            <div className="pop-up-staff">
              <div className="error">
                <h1>Are you sure you want to delete?</h1>
                <div className="btns">
                  <button
                    onClick={() => {
                      deleteHandler(idAttendance);
                      setBtnPress(false);
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setBtnPress(false)}>No</button>
                </div>
              </div>
            </div>
          )}

          {loadingDeletedData && (
            <div className="pop-up-staff">
              <div className="info">
                <Loader />
              </div>
            </div>
          )}
          {errorDeletedData && (
            <div className="pop-up-staff">
              <div className="error">
                <Message error={errorDeletedData} variant="error" />
                <div className="btns">
                  <button
                    onClick={() => dispatch({ type: ATTENDANCE_DELETE_RESET })}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          )}
          {successDeletedData && (
            <div className="pop-up-staff">
              <div className="info">
                <h1>Attendance deleted successfully </h1>
                <div className="btns">
                  <button
                    onClick={() => {
                      setBtnPress(false);
                      dispatch({ type: ATTENDANCE_DELETE_RESET });
                      dispatch(staffAttendance(id));
                    }}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          )}
          <div
            className={
              btnPress ||
              loadingDeletedData ||
              successDeletedData ||
              errorDeletedData
                ? "blur attendance-card"
                : "attendance-card"
            }
          >
            <h1>Attendance Report</h1>
            {error && (
              <div className="error-message">
                <Message error={error} variant="error" />
              </div>
            )}

            <div className="info-user">
              <div>
                <label htmlFor="">Name:</label>
                <p
                  style={{
                    maxWidth: "600px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                  className="email"
                >
                  {Attendance && Attendance.email}
                </p>
              </div>
              <div>
                <label htmlFor="">Department:</label>
                <span>{Attendance && Attendance.department_name}</span>
              </div>
              <div>
                <label htmlFor="">Role:</label>
                <span>{Attendance && Attendance.role}</span>
              </div>
            </div>
            <div className="filter">
              <div className="from">
                <label htmlFor="">From:</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className="to">
                <label htmlFor="">To:</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>

            <button
              className="export-button"
              onClick={exportToExcel}
              disabled={loading || !Attendance}
            >
              <i className="fa fa-file-excel-o" aria-hidden="true"></i> Export
              to Excel
            </button>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Atd Date</th>
                    <th>Entry Date</th>
                    <th>In Time</th>
                    <th>Break In</th>
                    <th>Break Out</th>
                    <th>Break In</th>
                    <th>Break Out</th>
                    <th>Out Time</th>
                    <th>Total Hour</th>
                    <th>Total Hour Till Date</th>
                    <th>Update</th>
                    {userLogin &&
                      userLogin.userInfo &&
                      userLogin.userInfo.user_data.role == "superadmin" && (
                        <>
                          <th>Delete</th>
                        </>
                      )}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      {" "}
                      {Attendance &&
                      Attendance.attendances &&
                      Attendance.attendances.length > 0 ? (
                        filterDataByDateRange(Attendance.attendances).map(
                          (entry, index) => (
                            <tr key={index}>
                              <td>{entry.pk}</td>
                              <td>{entry.attedence_date}</td>
                              <td>{entry.entry_date}</td>
                              <td>{formatTime(entry.in_time)}</td>
                              <td>{formatTime(entry.first_break_in)}</td>
                              <td>{formatTime(entry.first_break_out)}</td>
                              <td>{formatTime(entry.second_break_in)}</td>
                              <td>{formatTime(entry.second_break_out)}</td>
                              <td>
                                {entry.out_time
                                  ? formatTime(entry.out_time)
                                  : "No data"}
                              </td>
                              <td>
                                {calculateTotalHours(entry.total_working_hour)}
                              </td>
                              <td>{totalHours.toFixed(2)}</td>
                              <td>
                                {" "}
                                <Link
                                  to={`/attendance-update/${id}/${entry.pk}`}
                                >
                                  <button
                                    onClick={() => {
                                      setBtnPress(true);
                                      setIdAttendance(entry.pk);
                                    }}
                                    className="update"
                                  >
                                    Update
                                  </button>
                                </Link>
                              </td>
                              {userLogin &&
                                userLogin.userInfo &&
                                userLogin.userInfo.user_data.role ==
                                  "superadmin" && (
                                  <>
                                    <td>
                                      {" "}
                                      <button
                                        onClick={() => {
                                          setBtnPress(true);
                                          setIdAttendance(entry.pk);
                                        }}
                                        className="delete"
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </>
                                )}
                            </tr>
                          )
                        )
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
                  {Attendance &&
                  Attendance.attendances &&
                  Attendance.attendances.length > 0 ? (
                    Attendance.attendances.map((entry, index) => (
                      <div key={index}>
                        <div className="data">
                          <div className="fields">
                            <p style={{ fontWeight: "750", fontSize: "22px" }}>
                              S.N:
                            </p>
                          </div>
                          <div className="values">
                            <p style={{ fontWeight: "750", fontSize: "22px" }}>
                              {entry.pk}
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
                          <div className="values">
                            {formatTime(entry.in_time)}
                          </div>
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
                          <div className="fields">
                            <p>Break Out :</p>
                          </div>
                          <div className="values">
                            {formatTime(entry.first_break_out)}
                          </div>
                        </div>
                        <div className="data">
                          <div className="fields">
                            <p>Break In :</p>
                          </div>
                          <div className="values">
                            {formatTime(entry.second_break_in)}
                          </div>
                        </div>
                        <div className="data">
                          <div className="fields">
                            <p>Break Out :</p>
                          </div>
                          <div className="values">
                            {formatTime(entry.second_break_out)}
                          </div>
                        </div>
                        <div className="data">
                          <div className="fields">
                            <p>Out Time:</p>
                          </div>
                          <div className="values">
                            {formatTime(entry.out_time)}
                          </div>
                        </div>
                        <div className="data">
                          <div className="fields">
                            <p>Total Hour:</p>
                          </div>
                          <div className="values">
                            {calculateTotalHours(entry.total_working_hour)}
                          </div>
                        </div>
                        <div className="data">
                          <div className="fields">
                            <p>Total Hour Till Date:</p>
                          </div>
                          <div className="values">{totalHours}</div>
                        </div>
                        <div className="data">
                          <div className="fields">
                            {" "}
                            <Link to={`/attendance-update/${id}/${entry.pk}`}>
                              <button className="update">Update</button>
                            </Link>
                          </div>
                          {userLogin &&
                                userLogin.userInfo &&
                                userLogin.userInfo.user_data.role ==
                                  "superadmin" && (
                                  <>
                                  <div className="values">
                            <button
                              className="delete"
                              onClick={() => {
                                setBtnPress(true);
                                setIdAttendance(entry.pk);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                                  </>
                                )}
                         
                        </div>
                        <hr />
                      </div>
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
        </div>
      </div>
    </div>
  );
}

export default StaffAttendance;
