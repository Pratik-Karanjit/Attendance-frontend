import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  userLoginReducer,
  userAttendanceReducer,
  userRegisterReducer,
  updatePasswordReducer,
  userListReducer,
  userUpdateReducer,
  userDetailReducer,
  userDeleteReducer,
} from "./reducers/userReducers";

import { composeWithDevTools } from "redux-devtools-extension";

import {
  inTimeReducer,
  outTimeReducer,
  Break1InReducer,
  Break1OutReducer,
  Break2InReducer,
  Break2OutReducer,
  staffAttendanceReducer,
  manualAttendanceReducer,
  attendanceDeleteReducer,
  attendanceUpdateReducer,
  attendanceDetailReducer,
  manualAttendanceRequestReducer,
  pendingAttendanceDetailReducer,
  pendingAttendanceReducer,
  pendingAttendanceDeleteReducer,
  adminAttendance,
} from "./reducers/attendanceReducers";
import { deleteAttendance } from "./actions/attendanceActions";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userAttendance: userAttendanceReducer,
  userInTime: inTimeReducer,
  userDetails: userDetailReducer,
  userOutTime: outTimeReducer,
  updatePassword: updatePasswordReducer,
  userList: userListReducer,
  staffAttendance: staffAttendanceReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  deleteAttendance: attendanceDeleteReducer,
  updateAttendance: attendanceUpdateReducer,
  break1In: Break1InReducer,
  break1Out: Break1OutReducer,
  break2In: Break2InReducer,
  break2Out: Break2OutReducer,
  manualAttendance: manualAttendanceReducer,
  manualAttendanceRequest: manualAttendanceRequestReducer,
  attendanceDetail: attendanceDetailReducer,
  pendingAttendanceDetail: pendingAttendanceDetailReducer,
  pendingAttendance: pendingAttendanceReducer,
  pendingDeletion: pendingAttendanceDeleteReducer,
  adminAttendance: adminAttendance,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const InTimeFromStorage = localStorage.getItem("inTime")
  ? JSON.parse(localStorage.getItem("inTime"))
  : null;

const OutTimeFromStorage = localStorage.getItem("outTime")
  ? JSON.parse(localStorage.getItem("outTime"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userInTime: { inTime: InTimeFromStorage },
  userOutTime: { outTime: OutTimeFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
