import React, { useEffect, useState } from "react";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../App.css";
import "../../Nav.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment, registerNewUser } from "../../actions/userActions";
import Swal from "sweetalert2";
import { USER_REGISTER_FAIL } from "../../constants/userConstants";

const AddUserPage = () => {
  const dispatch = useDispatch();
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    role: "",
    department: "", // This will now hold the department ID
    password: "",
  });

  const userDepartment = useSelector(
    (state) => state.userLogin.userInfo.user_data.department_name
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(fetchDepartment());
        console.log("result of department from AddUser page here:", result);
        if (Array.isArray(result) && result.length > 0) {
          setDepartments(result);
        }
      } catch (error) {
        console.log("error fetching departments: " + error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddUserButton = async (e) => {
    e.preventDefault();
    const { full_name, email, password, role, department } = formData;
    console.log({ full_name, email, password, role, department });

    try {
      let actionPayload = [full_name, email, password, role];
      if (department) {
        actionPayload.push(department);
      }
      const response = await dispatch(registerNewUser(...actionPayload));
      if (response?.success) {
        // Reset form data
        setFormData({
          full_name: "",
          email: "",
          password: "",
          role: "",
          department: "",
        });
      } else {
        console.log("no form cleared");
      }
    } catch (error) {
      // Catch any other errors not handled by redux
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: error.message,
      });
    }
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <div
        className="flex item-center justify-start px-5"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="w-full bg-white rounded-xl p-5 mt-5">
          <div className="w-full">
            <p className="font-semibold text-xl font-myFont tracking-wide w-full">
              Create User
            </p>
            <p className="text-slate-400 text-sm w-full">
              Enter user information.
            </p>
            <form
              onSubmit={handleAddUserButton}
              className="w-full flex flex-col gap-2"
            >
              <p className="mt-5 font-myFont text-sm w-full text-start">
                Full Name
              </p>
              <div className="relative w-full">
                <input
                  className="w-full rounded-lg h-12 border pl-10 custom-input"
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required
                />
                <FontAwesomeIcon
                  icon={faUser}
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#A0AEC0",
                  }}
                />
              </div>

              <p className="mt-5 font-myFont text-sm w-full text-start">
                Email
              </p>
              <div className="relative w-full">
                <input
                  className="w-full rounded-lg h-12 border pl-10 custom-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#A0AEC0",
                  }}
                />
              </div>
              <p className="mt-5 font-myFont text-sm w-full text-start">Role</p>
              <select
                className="w-full rounded-lg h-12 pl-3 border"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled hidden>
                  Select Role
                </option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="intern">Intern</option>
              </select>

              {userDepartment === "Super Admin" ? (
                <>
                  <p className="mt-5 font-myFont text-sm w-full text-start">
                    Department
                  </p>
                  <select
                    className="w-full rounded-lg h-12 pl-3 border"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled hidden>
                      Select Department
                    </option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.department_name}
                      </option>
                    ))}
                  </select>
                </>
              ) : null}

              <p className="mt-5 font-myFont text-sm w-full text-start">
                Password
              </p>
              <div className="relative w-full">
                <input
                  className="w-full rounded-lg h-12 border custom-input pl-10"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
                  required
                />
                <FontAwesomeIcon
                  icon={faLock}
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#A0AEC0",
                  }}
                />
              </div>
              <div className="flex flex-row gap-5 mt-5 justify-end w-full">
                <button
                  className="w-1/5 rounded-lg h-12 font-semibold text-sm border border-orange-200 custom-cancel"
                  style={{ color: "orange" }}
                  type="button"
                  onClick={() =>
                    setFormData({
                      full_name: "",
                      email: "",
                      role: "",
                      department: "",
                      password: "",
                    })
                  }
                >
                  Cancel
                </button>
                <button
                  className="w-1/5 bg-orange-400 rounded-lg h-12 text-white font-semibold text-sm confirm-button"
                  type="submit"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;
