import {
  faList,
  faFileExport,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { attendanceRequest } from "../../actions/userActions";

const AttendanceRequest = () => {
  const [attendanceRequestList, setAttendanceRequestList] = useState();
  const listData = useSelector(
    (state) => state.attendanceReducer.attendanceData.request_attedence
  );
  //   console.log("list data ", listData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(attendanceRequest());
  });

  return (
    <div className="h-screen" style={{ backgroundColor: "#F5F5F5 " }}>
      <div className="relative w-full h-4/5 p-5 gap-6 bg-white flex flex-col rounded-xl">
        <div className="flex items-center p-5 gap-6 attendance-detail-text w-full justify-start items-start ">
          <FontAwesomeIcon icon={faList} />
          <p>Attendance Requests</p>
        </div>

        <div className="overflow-auto">
          <table className="w-full h-screen text-left border-collapse attendance-table">
            <thead className="text-white attendance-table-head">
              <tr>
                <th className="px-6 rounded-l-lg font-medium text-sm">User</th>
                <th className="p-3 font-medium text-sm">Check In</th>
                <th className="p-3 font-medium text-sm">Check Out</th>
                <th className="p-3 rounded-r-lg font-medium text-sm">
                  Working Hours
                </th>
                <th className="p-3 rounded-r-lg font-medium text-sm">
                  View More
                </th>
              </tr>
            </thead>
            <tbody style={{ maxHeight: "300px" }}>
              {listData.map((attendance, index) => (
                <tr key={index} className="border-b border-gray-200">
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
                    {/* You can add a button or link here for viewing more details */}
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
