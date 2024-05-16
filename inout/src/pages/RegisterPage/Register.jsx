import React from "react";
import "./register.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SideMenu from "../../components/sidebar/SideMenu";
import Header from "../../components/Header/Header";
import { register } from "../../actions/userActions";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { USER_REGISTER_RESET } from "../../constants/userConstants";

function Register() {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, newUser } = userRegister;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (password1 === password2) {
      dispatch(register(email, password1, role, department));
    }
  };
  console.log("'department' "+ department)
  console.log("`role'` "+role)
  console.log("`email` "+email)
  console.log("`password1` "+password2)

  const okSubmitHandler = (e) => {
    e.preventDefault();
    dispatch({ type: USER_REGISTER_RESET });
  };
  return (
    <>
      <div className="layout">
        <div className="leftpart">
          <div className="fixed">
            <div className={loading || newUser ? "blur" : ""}>
              <SideMenu />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="container">
            <div className={loading || newUser ? "blur" : ""}>
              <Header />
            </div>

            {loading && (
              <div className="pop-up">
                <div className="info-register">
                  <Loader />
                </div>
              </div>
            )}
            {newUser && (
              <div className="pop-up">
                <div className="info-register">
                  <h2>{newUser.message}</h2>
                  <div onClick={okSubmitHandler} className="ok-btn">
                    <p>Ok</p>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="pop-up">
                <div className="error">
                  <Message error={error} />
                  <button
                    onClick={() => dispatch({ type: USER_REGISTER_RESET })}
                  >
                    Ok
                  </button>
                </div>
              </div>
            )}
 

            <div
              className={
                loading || newUser
                  ? "registration-card blur"
                  : "registration-card"
              }
            >
              <h2 className="title">Register User</h2>

              <form onSubmit={submitHandler}>
                <div className="fields">
                  <div className="email">
                    <h2>Email:</h2>
                    <input
                      type="text"
                      value={email}
                      placeholder="Enter Your Email..."
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="password">
                    <h2>Password:</h2>
                    <div className="password-input">
                      <input
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        type={type}
                        placeholder="Enter Your Password..."
                        required
                      />
                      <div onClick={toggleVisibility} className="hide">
                        <i className={hideSee} aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                  <div className="password">
                    <h2>Comfirm Password:</h2>
                    <div className="password-input">
                      <input
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        type={type}
                        placeholder="Comfirm Your Password..."
                        required
                      />
                      <div onClick={toggleVisibility} className="hide">
                        <i className={hideSee} aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                  <div className="role">
                    <h2>Role:</h2>
                    <select
                      value={role}
                      onChange={handleRoleChange}
                      className="combo-box"
                      required
                    >
                      <option value="">Select an option </option>
                      <option value="admin">Admin</option>
                      <option value="staff">Staff</option>
                      <option value="intern">Intern</option>
                    </select>
                  </div>

                  <div className="department">
                    <h2>Department:</h2>
                    <select
                      value={department}
                      onChange={handleDepartmentChange}
                      className="combo-box"
                      
                      required
                    >
                      <option value="">Select an option </option>
                      <option value="2">Skill Museum</option>
                      <option value="3">CSR</option>
                      <option value="4">Digital</option>
                      <option value="5">I Create</option>
                      <option value="1">Super Admin</option>
                    </select>
                  </div>
                </div>
                {password1 != password2 && (

<div className="error-message">
  <Message error="Passwords doesnot match" variant="error" />


</div>
)}
                <button
                  style={{ border: "none" }}
                  type="submit"
                  className="register-btn btn"
                >
                  <span style={{ color: "white" }}>Register</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
