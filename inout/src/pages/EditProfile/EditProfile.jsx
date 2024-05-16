import React from "react";
import SideMenu from "../../components/sidebar/SideMenu";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Dashboard/dashboard.css";
import "../EditProfile/editprofile.css";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { useState } from "react";
import { updatePassword } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

function EditProfile() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const [oldPassword, setOldPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [type, setType] = useState("password");
  const [hideSee, setHideSee] = useState("fa fa-eye-slash");
  const toggleVisibility = () => {
    // Toggle between 'fa fa-eye' and 'fa fa-eye-slash'
    const nextHideSee =
      hideSee === "fa fa-eye" ? "fa fa-eye-slash" : "fa fa-eye";

    // Toggle between 'password' and 'text'
    const nextType = type === "password" ? "text" : "password";

    // Update the state with the new values
    setHideSee(nextHideSee);
    setType(nextType);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (password1 == password2) {
      dispatch(updatePassword(oldPassword, password1, password2));
    }
  };
  const updatepassword = useSelector((state) => state.updatePassword);
  const { loading, error, change, success } = updatepassword;

  const okSubmitHandler = (e) => {
    e.preventDefault();
    dispatch({ type: UPDATE_PASSWORD_RESET });
  };
  return (
    <div>
      <div className="layout">
        <div className="leftpart">
          <div className="fixed">
            <SideMenu />
          </div>
        </div>
        {loading && (
          <div className="pop-up">
            {loading && <Loader />}
            {success && <Message error="Changed succesfully" variant="info" />}
          </div>
        )}
        {success == true && loading == false && (
          <div className="pop-up">
            <h2>Password Changed Succesfully</h2>
            <div onClick={okSubmitHandler} className="ok-btn">
              <p>Ok</p>
            </div>
          </div>
        )}
        <div className={success ? "right blur" : "right"}>
          <div className="messages">
            {error && <Message error={error} variant="error" />}
            {password1 != password2 && (
              <Message error="Passwords doesnot match" variant="error" />
            )}
          </div>
          <div className="container">
            <Header />
            <div className="edit-card">
              <h2>Personal Details:</h2>
              <div className="fields">
                <div className="email">
                  <label>Email:</label>
                  <div className="value">
                    <div>{userInfo.user_data.email}</div>
                  </div>
                </div>
                <div className="role">
                  <label>Role:</label>
                  <div className="value">
                    {userInfo.user_data.role ? (
                      <>{userInfo.user_data.role}</>
                    ) : (
                      "Not Assigned"
                    )}
                  </div>
                </div>
                <div className="department">
                  <label>Department:</label>
                  <div className="value">
                    {userInfo.user_data.department ? (
                      <>{userInfo.user_data.department}</>
                    ) : (
                      "Not Assigned"
                    )}
                  </div>
                </div>
              </div>
              <hr />
              <h2>Change Password:</h2>
              <div className="password">
                <h2>Old Password:</h2>
                <div className="password-input">
                  <input
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    type={type}
                    placeholder="Enter Your Old Password..."
                    required
                  />
                  <div onClick={toggleVisibility} className="hide">
                    <i className={hideSee} aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <div className="password">
                <h2>New Password:</h2>
                <div className="password-input">
                  <input
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    type={type}
                    placeholder="Enter Your New Password..."
                    required
                  />
                  <div onClick={toggleVisibility} className="hide">
                    <i class={hideSee} aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <div className="password">
                <h2>Comfirm New Password:</h2>
                <div className="password-input">
                  <input
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    type={type}
                    placeholder="Comfirm Your New Password..."
                    required
                  />
                  <div onClick={toggleVisibility} className="hide">
                    <i className={hideSee} aria-hidden="true"></i>
                  </div>
                </div>
              </div>

              <div onClick={submitHandler} className="change-password">
                Change Password
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
