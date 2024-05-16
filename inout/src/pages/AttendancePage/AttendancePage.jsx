import React from "react";
import "../Dashboard/dashboard.css";
import SideMenu from "../../components/sidebar/SideMenu";
import Header from "../../components/Header/Header";
import Attendance from "../../components/attendance/Attendance";

function AttendancePage() {
  return (
    <div className="layout">
      <div className="leftpart">
        <div className="fixed">
          <SideMenu attendance="attendance" />
        </div>
      </div>
      <div className="right">
        <div className="container">
          <Header />
          <div className="attendance-card">
            <Attendance />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendancePage;
