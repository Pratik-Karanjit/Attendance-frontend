import React, { useEffect } from "react";
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
import Swal from "sweetalert2";

function EditProfile() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const [oldPassword, setOldPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [type, setType] = useState("password");

  const [oldPasswordType, setOldPasswordType] = useState("password");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const [oldPasswordIcon, setOldPasswordIcon] = useState("fa fa-eye-slash");
  const [newPasswordIcon, setNewPasswordIcon] = useState("fa fa-eye-slash");
  const [confirmPasswordIcon, setConfirmPasswordIcon] =
    useState("fa fa-eye-slash");

  const toggleVisibility = (field) => {
    if (field === "old") {
      const nextType = oldPasswordType === "password" ? "text" : "password";
      const nextIcon =
        oldPasswordIcon === "fa fa-eye" ? "fa fa-eye-slash" : "fa fa-eye";
      setOldPasswordType(nextType);
      setOldPasswordIcon(nextIcon);
    } else if (field === "new") {
      const nextType = newPasswordType === "password" ? "text" : "password";
      const nextIcon =
        newPasswordIcon === "fa fa-eye" ? "fa fa-eye-slash" : "fa fa-eye";
      setNewPasswordType(nextType);
      setNewPasswordIcon(nextIcon);
    } else if (field === "confirm") {
      const nextType = confirmPasswordType === "password" ? "text" : "password";
      const nextIcon =
        confirmPasswordIcon === "fa fa-eye" ? "fa fa-eye-slash" : "fa fa-eye";
      setConfirmPasswordType(nextType);
      setConfirmPasswordIcon(nextIcon);
    }
  };

  const updatePassState = useSelector((state) => state.userUpdate.success);

  useEffect(() => {
    if (updatePassState === true) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your password has been updated successfully.",
      }).then(() => {
        // Clear form fields
        setPassword1("");
        setPassword2("");
        setOldPassword("");

        // Dispatch reset action
        dispatch({ type: UPDATE_PASSWORD_RESET });
      });
    }
  }, [updatePassState, dispatch]);

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

        <div className={success ? "right" : "right"}>
          {/* <div className="messages">
            {error && <Message error={error} variant="error" />}
            {password1 != password2 && (
              <Message error="Passwords doesnot match" variant="error" />
            )}
          </div> */}
          <div className="container">
            <Header />
            <div className="l:w-3/6 bg-white l:p-10 border rounded-2xl xsm:w-full sm:w-full vsm:w-full vsm:p-5">
              <div className="flex flex-col" style={{ gap: "2rem" }}>
                <h1 className="flex items-start font-bold text-xl justify-start w-full">
                  Change Password
                </h1>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col w-full">
                    <div className="l:w-full l:flex-row gap-5 flex vsm:flex-col">
                      <label
                        className="l:w-3/6 vsm:w-full"
                        style={{ fontWeight: "normal", fontSize: "16px" }}
                        htmlFor=""
                      >
                        Current Password <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="w-full password-input flex flex-row relative">
                        <input
                          className="w-full bg-gray-200 h-10 border rounded-xl pl-5 pr-10"
                          style={{ height: "3rem" }}
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          type={oldPasswordType}
                          placeholder="Enter Your Current Password..."
                          required
                        />
                        <div
                          onClick={() => toggleVisibility("old")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        >
                          <i className={oldPasswordIcon} aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row w-full">
                  <div className="flex flex-col w-full">
                    <div className="l:w-full l:flex-row gap-5 flex vsm:flex-col">
                      <label
                        className="l:w-3/6 vsm:w-full"
                        style={{ fontWeight: "normal", fontSize: "16px" }}
                        htmlFor=""
                      >
                        New Password <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="w-full password-input flex flex-row relative">
                        <input
                          className="w-full bg-gray-200 h-10 border rounded-xl pl-5 pr-10"
                          style={{ height: "3rem" }}
                          value={password1}
                          onChange={(e) => setPassword1(e.target.value)}
                          type={newPasswordType}
                          placeholder="Enter Your New Password..."
                          required
                        />
                        <div
                          onClick={() => toggleVisibility("new")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        >
                          <i className={newPasswordIcon} aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row w-full">
                  <div className="flex flex-col w-full">
                    <div className="l:w-full l:flex-row gap-5 flex vsm:flex-col">
                      <label
                        className="l:w-3/6 vsm:w-full"
                        style={{ fontWeight: "normal", fontSize: "16px" }}
                        htmlFor=""
                      >
                        Confirm Password <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="w-full password-input flex flex-row relative">
                        <input
                          className="w-full bg-gray-200 h-10 border rounded-xl pl-5 pr-10"
                          style={{ height: "3rem" }}
                          value={password2}
                          onChange={(e) => setPassword2(e.target.value)}
                          type={confirmPasswordType}
                          placeholder="Confirm Your New Password..."
                          required
                        />
                        <div
                          onClick={() => toggleVisibility("confirm")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        >
                          <i
                            className={confirmPasswordIcon}
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                onClick={submitHandler}
                className="w-full p-3 mt-5 border rounded-2xl  text-white tracking-wide flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: "#FB923C" }}
              >
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
