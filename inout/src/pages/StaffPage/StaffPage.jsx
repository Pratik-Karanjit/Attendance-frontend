import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import SideMenu from "../../components/sidebar/SideMenu";
import { listUsers } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import "./staffpage.css";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
function StaffPage() {
  const { loading, error, users } = useSelector((state) => state.userList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  return (
    <>
      <div className="layout">
        <div className="leftpart">
          <div className="fixed">
            <SideMenu staffs="staffs" />
          </div>
        </div>
        <div className="right">
          <div className="container">
            <Header staffs="staffs" />
            <div className="staff-card">
              <h2>Users</h2>

              <div className="user-table">
                {error && (
                  <div className="error-message">
                    <Message error={error} variant="error" />
                  </div>
                )}
                {loading ? (
                  <div className="user-column">
                    <Loader />
                  </div>
                ) : (
                  <>
                    {users && users.length > 0 ? (
                      users.map((user) => (
                        <>
                          <div className="user-column">
                            <div className="user-data" key={user.pk}>
                              <div className="fields">
                                <label htmlFor="">S.N</label>
                                <label htmlFor="">Email</label>
                                <label htmlFor="">Role</label>
                                <label htmlFor="">Department</label>
                              </div>
                              <div className="values">
                                <p>{user.pk}</p>
                                <p className="Email">{user.email}</p>
                                <p className="Role">{user.role}</p>
                                <p className="Repartment">
                                  {user.department_name}
                                </p>
                              </div>
                            </div>
                            <div className="control">
                              <Link to={`/staffs/attendance/${user.pk}`}>
                                <div className="attendance-btn">Attendance</div>
                              </Link>
                              <Link to={`/staffs/edit/${user.pk}`}>
                                <div className="edit-btn">Edit</div>
                              </Link>
                            </div>
                            <hr />
                          </div>
                        </>
                      ))
                    ) : (
                      <tr className="user-column">
                        <td colSpan="5">No data</td>
                      </tr>
                    )}
                  </>
                )}

                <table>
                  <thead>
                    <tr>
                      <th>S.N</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Department</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        {users && users.length > 0 ? (
                          users.map((user) => (
                            <>
                              <tr key={user.pk}>
                                <td>{user.pk}</td>
                                <td style={{ width: "10vw" }}>{user.email}</td>
                                <td style={{ width: "10vw" }}>{user.role}</td>
                                <td style={{ width: "15vw" }}>
                                  {user.department_name}
                                </td>

                                <td className="control">
                                  <Link to={`/staffs/attendance/${user.pk}`}>
                                    <div className="attendance-btn">
                                      Attendance
                                    </div>
                                  </Link>
                                  <Link to={`/staffs/edit/${user.pk}`}>
                                    <div className="edit-btn">Edit</div>
                                  </Link>
                                </td>
                              </tr>
                            </>
                          ))
                        ) : (
                          <tr className="data-row">
                            <td colSpan="5">No data</td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StaffPage;
