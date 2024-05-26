import React from "react";
import { useSelector } from "react-redux";

const InternProfile = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log("userInfo", userInfo);

  return (
    <div>
      <div className="flex flex-row">
        <h1>Email:</h1>
        <p>{userInfo.user_data.email}</p>
      </div>

      <div className="flex flex-row">
        <h1>Role:</h1>
        <p>{userInfo.user_data.role}</p>
      </div>

      <div className="flex flex-row">
        <h1>Department:</h1>
        <p>{userInfo.user_data.department_name}</p>
      </div>
    </div>
  );
};

export default InternProfile;
