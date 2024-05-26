import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_lOGOUT,
  USER_ATTENDANCE_FAIL,
  USER_ATTENDANCE_SUCCESS,
  USER_ATTENDANCE_REQUEST,
  USER_REGISTER_RESET,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  USER_DETAIL_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
} from "../constants/userConstants";

import {
  ATTENDANCE_OUTTIME_RESET,
  ATTENDANCE_INTIME_RESET,
  STAFF_ATTENDANCE_REQUEST,
  STAFF_ATTENDANCE_SUCCESS,
  STAFF_ATTENDANCE_FAIL,
} from "../constants/attendanceConstants";

import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/users/login",
      { email: email, password: password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log("error logging in", error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const register =
  (email, password1, role, department) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      console.log(userInfo);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${userInfo.Token}`,
        },
      };
      const { data } = await axios.post(
        "http://110.34.30.120:8000/api/users/create",
        {
          email: email,
          password: password1,
          role: role,
          department: department,
        },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data.error === "Invalid Email Domain") {
            dispatch({
              type: USER_REGISTER_FAIL,
              payload:
                "Invalid email domain. Please use a valid email address.",
            });
          } else if (error.response.data.non_field_errors) {
            dispatch({
              type: USER_REGISTER_FAIL,
              payload: error.response.data.non_field_errors.join("\n"),
            });
          } else {
            dispatch({
              type: USER_REGISTER_FAIL,
              payload: "An unexpected error occurred. Please try again later.",
            });
          }
        } else {
          dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.data.detail || error.message,
          });
        }
      } else {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload:
            "Network error. Please check your internet connection and try again.",
        });
      }
    }
  };

export const updatePassword =
  (oldPassword, password1, password2) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_PASSWORD_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      console.log(userInfo);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${userInfo.Token}`,
        },
      };
      const { data } = await axios.post(
        "http://110.34.30.120:8000/api/users/change_password/",
        {
          old_password: oldPassword,
          password: password1,
          password2: password2,
        },
        config
      );

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listAttendance = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ATTENDANCE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${userInfo.Token}`,
      },
    };
    const { data } = await axios.get(
      `http://110.34.30.120:8000/api/user_attedence/`,

      config
    );
    dispatch({
      type: USER_ATTENDANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ATTENDANCE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${userInfo.Token}`,
      },
    };
    const { data } = await axios.get(
      `http://127.0.0.1:8000//api/users/`,

      config
    );
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAIL_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${userInfo.Token}`,
      },
    };
    const { data } = await axios.get(
      `http://127.0.0.1:8000//api/users/${id}/`,

      config
    );
    dispatch({
      type: USER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateUser =
  (id, email, password1, role, department) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${userInfo.Token}`,
        },
      };
      const { data } = await axios.put(
        `http://110.34.30.120:8000/api/users/${id}/`,
        {
          email: email,
          password: password1,
          role: role,
          department: department,
        },
        config
      );
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${userInfo.Token}`,
      },
    };
    const { data } = await axios.delete(
      `http://110.34.30.120:8000/api/users/${id}/`,
      config
    );
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("outTime");
  localStorage.removeItem("inTime");
  dispatch({
    type: ATTENDANCE_OUTTIME_RESET,
  });
  dispatch({
    type: ATTENDANCE_INTIME_RESET,
  });
  dispatch({ type: USER_lOGOUT });
};

//     dispatch({
//       type: USER_DETAILS_REQUEST,
//     });
//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.get(
//       ``,

//       config
//     );

//     dispatch({
//       type: USER_DETAILS_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: USER_DETAILS_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };
