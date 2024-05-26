import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import UserDetails from "./pages/UserDetails/UserDetails";
import Register from "./pages/RegisterPage/Register";
import StaffPage from "./pages/StaffPage/StaffPage";
import EditProfile from "./pages/EditProfile/EditProfile";
import UserEdit from "./pages/UserEdit/UserEdit";
import StaffAttendance from "./pages/StaffAttendance/StaffAttendance";
import Attendance from "./components/attendance/Attendance";
import AttendancePage from "./pages/AttendancePage/AttendancePage";
import AdminRequest from "./pages/AdminRequest/AdminRequest";
import AttendanceApproval from "./pages/AttendanceApproval/AttendanceApproval";
import AttendanceUpdate from "./pages/AttendanceUpdate/AttendanceUpdate";
import AdminDashboard from "./pages/AdminDash/AdminDashboard";
import InternProfile from "./pages/AdminDash/InternProfile";
import UserProfilePage from "./pages/AdminDash/UserProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} exact />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/userProfilePage" element={<UserProfilePage />} />
        <Route path="/profile" element={<UserDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/staffs" element={<StaffPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/profile/update" element={<EditProfile />} />
        <Route path="/staffs/edit/:id" element={<UserEdit />} />
        <Route path="/staffs/attendance/:id" element={<StaffAttendance />} />
        <Route path="/admin-requests" element={<AdminRequest />} />
        <Route
          path="/userProfilePage/:internId"
          element={<UserProfilePage />}
        />

        <Route
          path="/attendance-approval/:id/:pk"
          element={<AttendanceApproval />}
        />
        <Route
          path="/attendance-update/:id/:pk"
          element={<AttendanceUpdate />}
        />
      </Routes>
    </>
  );
}

export default App;
