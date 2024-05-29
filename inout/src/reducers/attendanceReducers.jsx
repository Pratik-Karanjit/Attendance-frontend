import {
  ATTENDANCE_INTIME_REQUEST,
  ATTENDANCE_INTIME_SUCCESS,
  ATTENDANCE_INTIME_FAIL,
  ATTENDANCE_OUTTIME_REQUEST,
  ATTENDANCE_OUTTIME_SUCCESS,
  ATTENDANCE_OUTTIME_FAIL,
  ATTENDANCE_INTIME_RESET,
  ATTENDANCE_OUTTIME_RESET,
  ATTENDANCE_Break1InTime_REQUEST,
  ATTENDANCE_Break1InTime_SUCCESS,
  ATTENDANCE_Break1InTime_FAIL,
  ATTENDANCE_Break1InTime_RESET,
  ATTENDANCE_Break1OutTime_REQUEST,
  ATTENDANCE_Break1OutTime_SUCCESS,
  ATTENDANCE_Break1OutTime_FAIL,
  ATTENDANCE_Break1OutTime_RESET,
  ATTENDANCE_Break2InTime_REQUEST,
  ATTENDANCE_Break2InTime_SUCCESS,
  ATTENDANCE_Break2InTime_FAIL,
  ATTENDANCE_Break2InTime_RESET,
  ATTENDANCE_Break2OutTime_REQUEST,
  ATTENDANCE_Break2OutTime_SUCCESS,
  ATTENDANCE_Break2OutTime_FAIL,
  ATTENDANCE_Break2OutTime_RESET,
  STAFF_ATTENDANCE_REQUEST,
  STAFF_ATTENDANCE_SUCCESS,
  STAFF_ATTENDANCE_FAIL,
  STAFF_ATTENDANCE_RESET,
  MANUAL_ATTENDANCE_REQUEST,
  MANUAL_ATTENDANCE_SUCCESS,
  MANUAL_ATTENDANCE_FAIL,
  MANUAL_ATTENDANCE_RESET,
  MANUAL_ATTENDANCE_REQUEST_REQUEST,
  MANUAL_ATTENDANCE_REQUEST_SUCCESS,
  MANUAL_ATTENDANCE_REQUEST_FAIL,
  MANUAL_ATTENDANCE_REQUEST_RESET,
  ATTENDANCE_DELETE_REQUEST,
  ATTENDANCE_DELETE_SUCCESS,
  ATTENDANCE_DELETE_FAIL,
  ATTENDANCE_DELETE_RESET,
  ATTENDANCE_UPDATE_REQUEST,
  ATTENDANCE_UPDATE_SUCCESS,
  ATTENDANCE_UPDATE_FAIL,
  ATTENDANCE_UPDATE_RESET,
  ATTENDANCE_DETAIL_REQUEST,
  ATTENDANCE_DETAIL_SUCCESS,
  ATTENDANCE_DETAIL_FAIL,
  ATTENDANCE_DETAIL_RESET,
  PENDING_ATTENDANCE_REQUEST_REQUEST,
  PENDING_ATTENDANCE_REQUEST_SUCCESS,
  PENDING_ATTENDANCE_REQUEST_FAIL,
  PENDING_ATTENDANCE_REQUEST_RESET,
  PENDING_ATTENDANCE_DETAIL_REQUEST_REQUEST,
  PENDING_ATTENDANCE_DETAIL_REQUEST_SUCCESS,
  PENDING_ATTENDANCE_DETAIL_REQUEST_FAIL,
  PENDING_ATTENDANCE_DETAIL_REQUEST_RESET,
  PENDING_ATTENDANCE_DELETE_REQUEST,
  PENDING_ATTENDANCE_DELETE_SUCCESS,
  PENDING_ATTENDANCE_DELETE_FAIL,
  PENDING_ATTENDANCE_DELETE_RESET,
  ADMIN_ATTENDANCE_RESET,
} from "../constants/attendanceConstants";
import {
  ADMIN_ATTENDANCE_FAIL,
  ADMIN_ATTENDANCE_REQUEST,
  ADMIN_ATTENDANCE_SUCCESS,
} from "../constants/userConstants";

export const inTimeReducer = (state = { inTime: [] }, action) => {
  switch (action.type) {
    case ATTENDANCE_INTIME_REQUEST:
      return { loading: true, success: false };
    case ATTENDANCE_INTIME_SUCCESS:
      return { loading: false, inTime: action.payload, success: true };
    case ATTENDANCE_INTIME_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ATTENDANCE_INTIME_RESET:
      return {};
    default:
      return state;
  }
};

export const outTimeReducer = (state = { outTime: [] }, action) => {
  switch (action.type) {
    case ATTENDANCE_OUTTIME_REQUEST:
      return { loading: true, success: false };
    case ATTENDANCE_OUTTIME_SUCCESS:
      return { loading: false, outTime: action.payload, success: true };
    case ATTENDANCE_OUTTIME_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ATTENDANCE_OUTTIME_RESET:
      return {};

    default:
      return state;
  }
};

export const Break1InReducer = (state = { break1InTime: [] }, action) => {
  switch (action.type) {
    case ATTENDANCE_Break1InTime_REQUEST:
      return { loading: true, success: false };
    case ATTENDANCE_Break1InTime_SUCCESS:
      return { loading: false, break1InTime: action.payload, success: true };
    case ATTENDANCE_Break1InTime_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ATTENDANCE_Break1InTime_RESET:
      return {};
    default:
      return state;
  }
};

export const Break1OutReducer = (state = { break1OutTime: [] }, action) => {
  switch (action.type) {
    case ATTENDANCE_Break1OutTime_REQUEST:
      return { loading: true, success: false };
    case ATTENDANCE_Break1OutTime_SUCCESS:
      return { loading: false, break1OutTime: action.payload, success: true };
    case ATTENDANCE_Break1OutTime_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ATTENDANCE_Break1OutTime_RESET:
      return {};

    default:
      return state;
  }
};

export const Break2InReducer = (state = { break2InTime: [] }, action) => {
  switch (action.type) {
    case ATTENDANCE_Break2InTime_REQUEST:
      return { loading: true, success: false };
    case ATTENDANCE_Break2InTime_SUCCESS:
      return { loading: false, break2InTime: action.payload, success: true };
    case ATTENDANCE_Break2InTime_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ATTENDANCE_Break2InTime_RESET:
      return {};
    default:
      return state;
  }
};

export const Break2OutReducer = (state = { break2OutTime: [] }, action) => {
  switch (action.type) {
    case ATTENDANCE_Break2OutTime_REQUEST:
      return { loading: true, success: false };
    case ATTENDANCE_Break2OutTime_SUCCESS:
      return { loading: false, break2OutTime: action.payload, success: true };
    case ATTENDANCE_Break2OutTime_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ATTENDANCE_Break2OutTime_RESET:
      return {};
    default:
      return state;
  }
};

export const staffAttendanceReducer = (state = { Attendance: [] }, action) => {
  switch (action.type) {
    case STAFF_ATTENDANCE_REQUEST:
      return { loading: true, success: false };
    case STAFF_ATTENDANCE_SUCCESS:
      return { loading: false, Attendance: action.payload, success: true };
    case STAFF_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case STAFF_ATTENDANCE_RESET:
      return {};

    default:
      return state;
  }
};

export const pendingAttendanceReducer = (
  state = { pendingData: [] },
  action
) => {
  switch (action.type) {
    case PENDING_ATTENDANCE_REQUEST_REQUEST:
      return { loading: true, success: false };
    case PENDING_ATTENDANCE_REQUEST_SUCCESS:
      return { loading: false, pendingData: action.payload, success: true };
    case PENDING_ATTENDANCE_REQUEST_FAIL:
      return { loading: false, error: action.payload, success: false };
    case PENDING_ATTENDANCE_REQUEST_RESET:
      return {};

    default:
      return state;
  }
};

export const pendingAttendanceDetailReducer = (
  state = { pendingDetailData: [] },
  action
) => {
  switch (action.type) {
    case PENDING_ATTENDANCE_DETAIL_REQUEST_REQUEST:
      return { loading: true, success: false };
    case PENDING_ATTENDANCE_DETAIL_REQUEST_SUCCESS:
      return {
        loading: false,
        pendingDetailData: action.payload,
        success: true,
      };
    case PENDING_ATTENDANCE_DETAIL_REQUEST_FAIL:
      return { loading: false, error: action.payload, success: false };
    case PENDING_ATTENDANCE_DETAIL_REQUEST_RESET:
      return {};

    default:
      return state;
  }
};

export const pendingAttendanceDeleteReducer = (
  state = { pendingDataDelete: [] },
  action
) => {
  switch (action.type) {
    case PENDING_ATTENDANCE_DELETE_REQUEST:
      return { loading: true, success: false };
    case PENDING_ATTENDANCE_DELETE_SUCCESS:
      return {
        loading: false,
        pendingDataDelete: action.payload,
        success: true,
      };
    case PENDING_ATTENDANCE_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case PENDING_ATTENDANCE_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const manualAttendanceReducer = (state = { manualData: [] }, action) => {
  switch (action.type) {
    case MANUAL_ATTENDANCE_REQUEST:
      return { loading: true, success: false };
    case MANUAL_ATTENDANCE_SUCCESS:
      return { loading: false, manualData: action.payload, success: true };
    case MANUAL_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case MANUAL_ATTENDANCE_RESET:
      return {};

    default:
      return state;
  }
};

export const manualAttendanceRequestReducer = (
  state = { manualRequestData: [] },
  action
) => {
  switch (action.type) {
    case MANUAL_ATTENDANCE_REQUEST_REQUEST:
      return { loading: true, success: false };
    case MANUAL_ATTENDANCE_REQUEST_SUCCESS:
      return {
        loading: false,
        manualRequestData: action.payload,
        success: true,
      };
    case MANUAL_ATTENDANCE_REQUEST_FAIL:
      return { loading: false, error: action.payload, success: false };
    case MANUAL_ATTENDANCE_REQUEST_RESET:
      return {};

    default:
      return state;
  }
};

export const attendanceDeleteReducer = (
  state = { deletedData: [] },
  action
) => {
  switch (action.type) {
    case ATTENDANCE_DELETE_REQUEST:
      return { loading: true, success: false };
    case ATTENDANCE_DELETE_SUCCESS:
      return { loading: false, deletedData: action.payload, success: true };
    case ATTENDANCE_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ATTENDANCE_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const attendanceUpdateReducer = (
  state = { updatedData: [] },
  action
) => {
  switch (action.type) {
    case ATTENDANCE_UPDATE_REQUEST:
      return { loading: true, success: false };
    case ATTENDANCE_UPDATE_SUCCESS:
      return { loading: false, updatedData: action.payload, success: true };
    case ATTENDANCE_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ATTENDANCE_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

export const attendanceDetailReducer = (state = { detailData: [] }, action) => {
  switch (action.type) {
    case ATTENDANCE_DETAIL_REQUEST:
      return { loading: true, success: false };
    case ATTENDANCE_DETAIL_SUCCESS:
      return { loading: false, detailData: action.payload, success: true };
    case ATTENDANCE_DETAIL_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ATTENDANCE_DETAIL_RESET:
      return {};

    default:
      return state;
  }
};

export const adminAttendance = (state = { detailData: [] }, action) => {
  switch (action.type) {
    case ADMIN_ATTENDANCE_REQUEST:
      return { loading: true, success: false };
    case ADMIN_ATTENDANCE_SUCCESS:
      return { loading: false, detailData: action.payload, success: true };
    case ADMIN_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ADMIN_ATTENDANCE_RESET:
      return {};

    default:
      return state;
  }
};
