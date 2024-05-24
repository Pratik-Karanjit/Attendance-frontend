// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { login } from "../../actions/userActions";
// import "../../App.css";
// import "../../output.css";
// import "../../input.css";

// import Loader from "../../components/Loader/Loader";
// import Message from "../../components/Message/Message";
// function LoginPage() {
//   const dispatch = useDispatch();
//   const navigateTo = useNavigate();
//   const location = useLocation();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const [type, setType] = useState("password");

//   const userLogin = useSelector((state) => state.userLogin);
//   const { error, loading, userInfo } = userLogin;

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(login(email, password));
//     console.log("logged");
//   };

//   useEffect(() => {
//     if (userInfo) {
//       navigateTo("/dashboard");
//     }
//   }, [navigateTo, userInfo]);

//   return (
//     <div id="root">
//       <div className="white-background">
//         <div className="logo">
//           <div className="parent">
//             <img className="skill" src="/static/skillxattendance.png" />
//           </div>
//         </div>

//         <h2 className="text-2xl text-center text-red-400">Account Login</h2>

//         <div className="card">
//           {loading && <Loader />}
//           {error && (
//             <div className="error-message">
//               <Message error={error} variant="error" />
//             </div>
//           )}
//           <form onSubmit={submitHandler}>
//             <div className="fields">
//               <div className="email">
//                 <h2>Email:</h2>
//                 <input
//                   type="text"
//                   value={email}
//                   placeholder="Enter Your Email..."
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div className="password">
//                 <h2>Password:</h2>
//                 <div className="password-input">
//                   <input
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     type={type}
//                     placeholder="Enter Your Password..."
//                   />
//                   <div onClick={toggleVisibility} className="hide">
//                     <i class={hideSee} aria-hidden="true"></i>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <button
//               style={{ border: "none" }}
//               type="submit"
//               className="login-btn btn"
//             >
//               <span style={{ color: "white" }}>Login</span>
//             </button>
//           </form>

//           <p>
//             Having Problem?
//             <span style={{ textDecoration: "underline", cursor: "pointer" }}>
//               Report
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

import "../../App.css";
import "../../index.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import skillAcademyLogo from "../../photos/skillxattendance.png";
import loginMan from "../../photos/login-man.webp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  console.log("user info", userInfo);

  useEffect(() => {
    if (userInfo) {
      // Redirect based on user role
      if (userInfo.user_data.role === "admin") {
        navigate("/adminDashboard");
      } else if (userInfo.user_data.role === "intern") {
        navigate("/dashboard");
      }
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (error) {
      // Display error message using Swal
      handleErrorAlert();
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch login action
    dispatch(login(email, password));
  };

  const handleErrorAlert = () => {
    Swal.fire({
      title: "Login Error",
      text: "Incorrect email or password.",
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-full xl:w-3/6 px-2 py-4 xl:px-20 xl:py-24 l:px-10 l:py-16 sm:px-6 sm:py-12 xsm:px-2 xsm:py-8 bg-white rounded-3xl">
        <div className="flex flex-col xl:flex-row justify-between gap-10">
          <div className="w-full xl:w-5/6 bg-orange-400 rounded-3xl p-10 hidden xl:block">
            <p className="text-2xl text-white font-bold font-myFont leading-10">
              Login to enter the attendance dashboard.{" "}
            </p>
            <div>
              <p className="text-base text-white font-normal font-myFont leading-10">
                {" "}
                Access your attendance data by logging in this form.
              </p>
            </div>
            <div className="flex justify-center">
              <img className="skill-img" src={loginMan} alt="skill academy" />
            </div>
          </div>

          <div className="w-full xl:w-2/3 bg-white p-4 rounded-3xl">
            <div className="flex justify-center">
              <img
                className="skill-img"
                src={skillAcademyLogo}
                alt="skill academy"
              />
            </div>
            <div className="login-text">
              <p className="text-3xl font-bold font-myFont">Welcome Back</p>{" "}
              <p className="text-gray-500 font-light">
                Please login to your account
              </p>
            </div>

            <div className="flex flex-col items-start  justify-center gap-4">
              <input
                className="bg-gray-100 w-full max-w-xs rounded-lg h-12 mt-4 pl-3 login-email-input"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="w-full relative flex flex-col items-start justify-left gap-4">
                <input
                  className="bg-gray-100 w-full max-w-xs rounded-lg h-12 mt-2 pl-3 login-password-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye} // Font Awesome icon
                  className="absolute right-4 top-5 cursor-pointer h-6 w-6"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              <button
                className="w-full max-w-xs bg-orange-400 rounded-lg h-12 text-white font-semibold font text-sm mt-2 outline-none login-button"
                onClick={submitHandler}
              >
                {loading ? <Loader /> : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
