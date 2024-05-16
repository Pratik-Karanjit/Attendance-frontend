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

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_lOGOUT:
      return {};
    default:
      return state;
  }
};

export const userAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ATTENDANCE_REQUEST:
      return { loading: true };
    case USER_ATTENDANCE_SUCCESS:
      return { loading: false, attendance: action.payload };
    case USER_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, newUser: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const updatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return { loading: true, success: false };
    case UPDATE_PASSWORD_SUCCESS:
      return { loading: false, change: action.payload, success: true };
    case UPDATE_PASSWORD_FAIL:
      return { loading: false, error: action.payload, success: false };
    case UPDATE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true, success: false };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload, success: true };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload, success: false };
    case USER_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const userDetailReducer = (state = { userDetail: [] }, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return { loading: true, success: false };
    case USER_DETAIL_SUCCESS:
      return { loading: false, userDetail: action.payload, success: true };
    case USER_DETAIL_FAIL:
      return { loading: false, error: action.payload, success: false };
    case USER_DETAIL_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { updated: [] }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true, success: false };
    case USER_UPDATE_SUCCESS:
      return { loading: false, updated: action.payload, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true, success: false };
    case USER_DELETE_SUCCESS:
      return { loading: false, deleteData: action.payload, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };
      case USER_DELETE_RESET:
        return { };
    default:
      return state;
  }
};
