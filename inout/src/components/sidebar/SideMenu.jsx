import React from "react";
import { Link } from "react-router-dom";
import "./sidemenu.css";
import { useSelector } from "react-redux";
function SideMenu({
  profile,
  staffs,
  dashboard,
  attendance,
  adminrequests,
  department,
  accounts,
}) {
  const userLogin = useSelector((state) => state.userLogin);
  return (
    <>
      <div className="sidemenu-div">
        <div className="top">
          <div className="logo-sidemenu">
            {/* <img src="/static/skill.png" alt="" /> */}
            <Link to={"/dashboard"}>
              
              <img src="/static/skill.png" alt="" />
            </Link>
          </div>
          <div className="nav">
            <ul className="menu">
              <Link to={"/dashboard"}>
                <li className={dashboard && "active"}>
                  <i class="fa fa-tachometer" aria-hidden="true"></i>
                  Dashboard
                </li>
              </Link>
              {userLogin.userInfo &&
                userLogin.userInfo.user_data.role == "intern" && (
                  <>
                    {" "}
                    <Link to={"/attendance"}>
                      <li className={attendance && "active"}>
                        <i class="fa fa-book" aria-hidden="true"></i>
                        Attendance
                      </li>
                    </Link>
                  </>
                )}

              <Link to={"/profile"}>
                <li className={profile && "active"}>
                  <i class="fa fa-user" aria-hidden="true"></i>
                  Profile
                </li>
              </Link>
              {userLogin.userInfo &&
              userLogin.userInfo.user_data.role == "admin" ? (
                <>
                  <Link to={"/staffs"}>
                    <li className={staffs && "active"}>
                      <i class="fa fa-users" aria-hidden="true"></i>
                      Staff Attendance
                    </li>
                  </Link>
                </>
              ) : (
                <></>
              )}
              {userLogin.userInfo &&
              userLogin.userInfo.user_data.role == "admin" &&   <Link to={"/admin-requests"}>
              <li className={adminrequests && "active"}>
                <i class="fa fa-lock" aria-hidden="true"></i>
                Admin Requests
              </li>
            </Link>}
            
              {userLogin.userInfo &&
                userLogin.userInfo.user_data.role == "super admin" && (
                  <Link>
                    <li className={department && "active"}>
                      <i class="fa fa-building" aria-hidden="true"></i>
                      Department
                    </li>
                  </Link>
                )}

              {/* <Link>
                <li>
                  <i class="fa fa-calendar" aria-hidden="true"></i>
                  Calendar
                </li>
              </Link> */}
            </ul>
          </div>
        </div>

        <div className="vector-image">
          <img src="/static/timeforskill.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default SideMenu;
