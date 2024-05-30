import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "../../App.css";
import {
  faList,
  faArrowLeft,
  faFileExport,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { monthUserAttendance } from "../../actions/userActions";
import { useParams } from "react-router-dom";

const InternAttendancePage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const dispatch = useDispatch();
  const { internId } = useParams();

  function formatTime(timeString) {
    if (!timeString) return null;
    const [hours, minutes, seconds] = timeString.split(":");
    const date = new Date();
    date.setHours(hours, minutes, seconds);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  }

  function formatWorkingHours(durationString) {
    if (!durationString) return null;
    const [hours, minutes, seconds] = durationString.split(":");
    const totalHours = parseInt(hours);
    const totalMinutes = parseInt(minutes);
    return `${totalHours} hr ${totalMinutes} min`;
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const attendanceData = useSelector(
    (state) => state?.adminAttendance?.detailData?.daily_attendance
  );

  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth === 0 ? 11 : prevMonth - 1;
      const newYear = prevMonth === 0 ? currentYear - 1 : currentYear;
      dispatch(monthUserAttendance(internId, newMonth + 1, newYear)); // Increment newMonth by 1 to match the 1-indexed month
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth === 11 ? 0 : prevMonth + 1;
      const newYear = prevMonth === 11 ? currentYear + 1 : currentYear;
      dispatch(monthUserAttendance(internId, newMonth + 1, newYear)); // Increment newMonth by 1 to match the 1-indexed month
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  useEffect(() => {
    fetchData(internId);
  }, [internId]);

  const fetchData = (internId) => {
    dispatch(monthUserAttendance(internId));
  };

  useEffect(() => {
    console.log(
      `Current Month in useEffect: ${currentMonth}, Current Year in useEffect: ${currentYear}`
    );
  }, [currentMonth, currentYear]);

  return (
    <div className="h-screen" style={{ backgroundColor: "#F5F5F5 " }}>
      <p className="font-semibold text-2xl p-5 font-myFont tracking-wide">
        Settings
      </p>
      <p className="font-normal text-sm text-slate-500 pl-5">
        Control your profile setup and integrations.
      </p>

      <div className="relative w-full h-4/5 p-5 gap-6 bg-white flex flex-col rounded-xl">
        <div className="flex items-center p-5 gap-6 attendance-detail-text w-full justify-start items-start ">
          <FontAwesomeIcon icon={faList} />
          <p>Attendance Details</p>
        </div>

        <div className="absolute top-2 right-3 mt-2 mr-2 flex items-center p-2 month-div">
          <button className="border bg-gray p-3 export-excel-btn tracking-wide export-btn">
            <div className="flex">
              <FontAwesomeIcon icon={faFileExport} />
              Export To Excel
            </div>
          </button>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="mr-2 cursor-pointer"
            onClick={goToPreviousMonth}
          />
          <p>{`${monthNames[currentMonth]} ${currentYear}`}</p>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="ml-2 cursor-pointer"
            onClick={goToNextMonth}
          />
        </div>
        <div className="overflow-auto">
          <table className="w-full h-screen text-left border-collapse attendance-table">
            <thead className="text-white attendance-table-head">
              <tr>
                <th className="px-6 rounded-l-lg font-medium text-sm">
                  Attendance Date
                </th>
                <th className="p-3 font-medium text-sm">Check In</th>
                <th className="p-3 font-medium text-sm">Check Out</th>
                <th className="p-3 rounded-r-lg font-medium text-sm">
                  Working Hours
                </th>
              </tr>
            </thead>
            <tbody style={{ maxHeight: "300px" }}>
              {" "}
              {/* Set maxHeight to control the body height */}
              {attendanceData && attendanceData.length > 0 ? (
                attendanceData.map((attendance) => (
                  <tr key={attendance.id} className="border-t">
                    <td className="p-2 font-myFont">
                      {attendance.attedence_date}
                    </td>
                    <td className="p-2 font-myFont">
                      {formatTime(attendance.in_time)}
                    </td>
                    <td className="p-2 font-myFont">
                      {formatTime(attendance.out_time)}
                    </td>
                    <td className="p-2 font-myFont">
                      {formatWorkingHours(attendance.total_working_hour)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-2 font-myFont text-center">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InternAttendancePage;
