import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Banner from "../../components/banner/Banner";
import SideMenu from "../../components/sidebar/SideMenu";
import CurrentDate from "../../components/CurrentDate/CurrentDate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listAttendance } from "../../actions/userActions";
import "./dashboard.css";

function DashboardPage() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [outTimePress, setOutTimePress] = useState(false);
  const [inTimePress, setInTimePress] = useState(false);
  const [break1InPress, setBreak1InPress] = useState(false);
  const [break1OutPress, setBreak1OutPress] = useState(false);
  const [break2InPress, setBreak2InPress] = useState(false);
  const [break2OutPress, setBreak2OutPress] = useState(false);
  const [sendPress, setSendPress] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRole = userInfo?.user_data?.role;

  useEffect(() => {
    if (!userInfo) {
      navigateTo("/");
    } else {
      dispatch(listAttendance());
    }
  }, [dispatch, navigateTo, userInfo]);

  useEffect(() => {
    if (userRole === "admin") {
      window.location.href = "/adminDashboard";
    } else if (userRole === "user") {
      window.location.href = "/dashboard";
    }
  }, [userRole]);

  return (
    <div className="layout">
      <div className="leftpart">
        <div className="fixed">
          <div
            className={
              outTimePress ||
              inTimePress ||
              break1InPress ||
              break1OutPress ||
              break2InPress ||
              break2OutPress
                ? "blur fixed"
                : "fixed"
            }
          >
            <SideMenu dashboard="dashboard" />
          </div>
        </div>
      </div>
      <div className="right">
        <div className="container">
          <div
            className={
              outTimePress ||
              inTimePress ||
              break1InPress ||
              break1OutPress ||
              break2InPress ||
              break2OutPress ||
              sendPress
                ? "blur"
                : ""
            }
            style={{ position: "sticky", top: "0px", zIndex: "10" }}
          >
            <Header dashboard="dashboard" />
          </div>
          <div className={sendPress ? "blur" : ""}>
            <Banner
              userLogin={userLogin}
              outTimePress={outTimePress}
              inTimePress={inTimePress}
              break1InPress={break1InPress}
              break1OutPress={break1OutPress}
              break2InPress={break2InPress}
              break2OutPress={break2OutPress}
              setInTimePress={setInTimePress}
              setOutTimePress={setOutTimePress}
              setBreak1InPress={setBreak1InPress}
              setBreak1OutPress={setBreak1OutPress}
              setBreak2InPress={setBreak2InPress}
              setBreak2OutPress={setBreak2OutPress}
            />
          </div>

          <div
            className={
              outTimePress ||
              inTimePress ||
              break1InPress ||
              break1OutPress ||
              break2InPress ||
              break2OutPress
                ? "paragraph blur"
                : "paragraph"
            }
          >
            <CurrentDate sendPress={sendPress} setSendPress={setSendPress} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
