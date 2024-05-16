import React from "react";
import Header from "../../components/Header/Header";
import SideMenu from "../../components/sidebar/SideMenu";
import "../Dashboard/dashboard.css";
import "../UserEdit/useredit.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { deleteUser, updateUser, userDetails } from "../../actions/userActions";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { USER_DELETE_RESET } from "../../constants/userConstants";
function UserEdit() {
  const location = useLocation();
  const navigateto = useNavigate();
  const id = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [popup, setPopUp] = useState(false);
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [isError, setIsError] = useState(false);
  const Details = useSelector((state) => state.userDetails);
  const { loading, error, userDetail } = Details;
  const Update = useSelector((state) => state.userUpdate);
  const { loading: updateLoading, error: updateError, updated } = Update;
  const Delete = useSelector((state) => state.userDelete);
  const {
    loading: deleteLoading,
    error: deleteError,
    deleteData,
    success: deleteSuccess,
  } = Delete;
  useEffect(() => {
    dispatch(userDetails(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (userDetail) {
      setEmail(userDetail.email);
      setRole(userDetail.role);
      setDepartment(userDetail.department_name);
    } else {
      setEmail("Not Assigned");
      setRole("Not Assigned");
      setDepartment("Not Assigned");
    }
  }, [userDetail]);

  const submitHandler = () => {
    if (password1 == password2) {
      dispatch(updateUser(id, email, password1, role, department));
    } else {
      setIsError(true);
    }
  };
  const okSubmitHandler = () => {
    dispatch({ type: USER_DELETE_RESET });
    navigateto("/staffs");
  };
  const deleteHandler = () => {
    if (userDetail) {
      dispatch(deleteUser(userDetail.pk));
      setPopUp(false);
    }
  };
  return (
    <div className="layout">
      <div className="leftpart">
        <div className="fixed">
          <div className={popup || deleteSuccess || deleteLoading ? "blur" : ""}>
          <SideMenu />
          </div>
          
        </div>
      </div>
      <div className="right">
        <div className="container">
          <div className={popup || deleteSuccess || deleteLoading ? "blur" : ""}>
            <Header />
          </div>
          {deleteLoading && 
          <div className="pop-up">
          <Loader/>
          </div>
          }

          {deleteSuccess && (
            <div className="pop-up">
              <div className="info">
              <h3>User Successfully Deleted</h3>
              <div className="btns">
                <div className="delete-btn">
                  <button onClick={okSubmitHandler}>Ok</button>
                </div>
              </div>
              </div>
              
            </div>
          )}
          {popup && (
            <div className="pop-up">
              <div className="error">
              <h3>Delete User?</h3>
              <div className="btns">
                <div className="update-btn">
                  <button onClick={deleteHandler}>Delete</button>
                </div>
                <div className="delete-btn">
                  <button onClick={() => setPopUp(false)}>Cancel</button>
                </div>
              </div>
              </div>
              
            </div>
          )}
          <div
            className={
              popup || deleteSuccess || deleteLoading ? "update-card blur" : "update-card"
            }
          >
            {updateLoading && (
              <div className="pop-up">
                <Loader />
              </div>
            )}

            <h2>Edit User:</h2>
            <div className="error-message">
              <div className="message">
                {updateError && <Message error={updateError} variant="error" />}
              </div>
              <div className="message">
                {error && (
                  <>
                    <Message error={error} variant="error" /> <br />
                  </>
                )}
              </div>
              <div className="message">
                {isError && (
                  <Message error="Password Doesnot Match" variant="error" />
                )}
              </div>
            </div>

            {loading ? (
              <div className="loader-edit">
                <Loader />
              </div>
            ) : (
              <div className="fields">
                <div className="email">
                  <label>Email:</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="role">
                  <label>Role:</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    name=""
                    id=""
                  />
                </div>
                <div className="department">
                  <label>Department:</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(event) => setDepartment(event.target.value)}
                  />
                </div>
                <div className="password">
                  <label>Change Password:</label>
                  <input
                    type="text"
                    value={password1}
                    onChange={(event) => setPassword1(event.target.value)}
                  />
                </div>
                <div className="password">
                  <label>Confirm Password:</label>
                  <input
                    type="text"
                    value={password2}
                    onChange={(event) => setPassword2(event.target.value)}
                  />
                </div>
                <div className="btns">
                  <div className="update-btn">
                    <button onClick={submitHandler}>Update</button>
                  </div>
                  <div onClick={() => setPopUp(true)} className="delete-btn">
                    <button>Remove</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
