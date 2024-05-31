import {
  faList,
  faFileExport,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { attendanceRequest } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

const AttendanceRequest = () => {
  const [attendanceRequestList, setAttendanceRequestList] = useState();
  const listData = useSelector(
    (state) => state?.attendanceReducer?.attendanceData?.request_attedence
  );
  //   console.log("list data ", listData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(attendanceRequest());
  }, [dispatch]);

  const handleNavigationButton = (internId) => {
    navigate(`/attendanceRequestDetail/${internId}`);
  };

  return (
    <div
      className="l:h-screen l:p-5 xsm:p-0"
      style={{ backgroundColor: "#F5F5F5 " }}
    >
      <div className="relative w-full h-4/5 p-5 gap-6 bg-white flex flex-col rounded-xl">
        <div className="flex items-center p-5 gap-6 attendance-detail-text w-full justify-start items-start ">
          <FontAwesomeIcon icon={faList} />
          <p>Attendance Requests</p>
        </div>

        <div className="overflow-auto">
          <table className="w-full h-screen text-left border-collapse attendance-table">
            <thead className="text-white attendance-table-head">
              <tr>
                <th className="px-6 rounded-l-lg font-medium text-sm">S.No.</th>
                <th className="px-6 rounded-l-lg font-medium text-sm">User</th>
                <th className="p-3 font-medium text-sm">Check In</th>
                <th className="p-3 font-medium text-sm">Check Out</th>
                <th className="p-3 rounded-r-lg font-medium text-sm">
                  Working Hours
                </th>
                <th className="p-3 rounded-r-lg font-medium text-sm">Date</th>
                <th className="p-3 rounded-r-lg font-medium text-sm">
                  View More
                </th>
              </tr>
            </thead>
            <tbody style={{ maxHeight: "300px" }}>
              {listData?.map((attendance, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {attendance.user_full_name}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {attendance.in_time}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {attendance.out_time}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {attendance.total_working_hour}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {attendance.attedence_date}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <button
                      className="rounded-3xl px-5 py-2 text-sm font-myFont  text-white view-button"
                      style={{ backgroundColor: "#1C5A41" }}
                      onClick={() => handleNavigationButton(attendance.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceRequest;
