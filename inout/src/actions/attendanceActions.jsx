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
  ATTENDANCE_UPDATE_REQUEST,
  ATTENDANCE_UPDATE_SUCCESS,
  ATTENDANCE_UPDATE_FAIL,
  ATTENDANCE_DETAIL_REQUEST,
  ATTENDANCE_DETAIL_SUCCESS,
  ATTENDANCE_DETAIL_FAIL,
  PENDING_ATTENDANCE_REQUEST_REQUEST ,
  PENDING_ATTENDANCE_REQUEST_SUCCESS,
  PENDING_ATTENDANCE_REQUEST_FAIL,
  PENDING_ATTENDANCE_REQUEST_RESET,
  PENDING_ATTENDANCE_DETAIL_REQUEST_REQUEST,
  PENDING_ATTENDANCE_DETAIL_REQUEST_SUCCESS,
  PENDING_ATTENDANCE_DETAIL_REQUEST_FAIL,
  PENDING_ATTENDANCE_DETAIL_REQUEST_RESET,
  PENDING_ATTENDANCE_DELETE_REQUEST,
  PENDING_ATTENDANCE_DELETE_SUCCESS,
  PENDING_ATTENDANCE_DELETE_FAIL
} from "../constants/attendanceConstants";

import axios from "axios";

export const InTime = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ATTENDANCE_INTIME_REQUEST,
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
      `http://110.34.30.120:8000/api/in_time/`,
      null,
      config
    );
    dispatch({
      type: ATTENDANCE_INTIME_SUCCESS,
      payload: data,
    });
    localStorage.setItem("inTime", JSON.stringify(data));
    localStorage.removeItem("outTime");
    dispatch({
      type: ATTENDANCE_OUTTIME_RESET,
    });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_INTIME_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const OutTime = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ATTENDANCE_OUTTIME_REQUEST,
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
    const { data } = await axios.post(
      `http://110.34.30.120:8000/api/out_time/`,
      null,
      config
    );
    dispatch({
      type: ATTENDANCE_OUTTIME_SUCCESS,
      payload: data,
    });
    localStorage.setItem("outTime", JSON.stringify(data));
    localStorage.removeItem("inTime");
    dispatch({
      type: ATTENDANCE_INTIME_RESET,
    });
    dispatch({
      type: ATTENDANCE_OUTTIME_RESET,
    });
    dispatch({
      type: ATTENDANCE_Break2OutTime_RESET,
    });
    dispatch({
      type: ATTENDANCE_Break2InTime_RESET,
    });
    dispatch({
      type: ATTENDANCE_Break1InTime_RESET,
    });
    dispatch({
      type: ATTENDANCE_Break1OutTime_RESET,
    });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_OUTTIME_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const Break1InTime = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ATTENDANCE_Break1InTime_REQUEST,
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
      `http://110.34.30.120:8000/api/first_break_in/`,
      null,
      config
    );
    dispatch({
      type: ATTENDANCE_Break1InTime_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_Break1InTime_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const Break1OutTime = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ATTENDANCE_Break1OutTime_REQUEST,
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
    const { data } = await axios.post(
      `http://110.34.30.120:8000/api/first_break_out/`,
      null,
      config
    );
    dispatch({
      type: ATTENDANCE_Break1OutTime_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_Break1OutTime_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const Break2InTime = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ATTENDANCE_Break2InTime_REQUEST,
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
      `http://110.34.30.120:8000/api/second_break_in/`,
      null,
      config
    );
    dispatch({
      type: ATTENDANCE_Break2InTime_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_Break2InTime_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const Break2OutTime = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ATTENDANCE_Break2OutTime_REQUEST,
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
    const { data } = await axios.post(
      `http://110.34.30.120:8000/api/second_break_out/`,
      null,
      config
    );
    dispatch({
      type: ATTENDANCE_Break2OutTime_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_Break2OutTime_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const staffAttendance = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STAFF_ATTENDANCE_REQUEST,
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
      `http://110.34.30.120:8000/api/daily_attendence/${id}/`,

      config
    );
    dispatch({
      type: STAFF_ATTENDANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STAFF_ATTENDANCE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const pendingRequest = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PENDING_ATTENDANCE_REQUEST_REQUEST,
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
      `http://110.34.30.120:8000/api/attedence_request/`,

      config
    );
    dispatch({
      type: PENDING_ATTENDANCE_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PENDING_ATTENDANCE_REQUEST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const pendingDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PENDING_ATTENDANCE_DELETE_REQUEST,
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
      `http://110.34.30.120:8000/api/attedence_request/${id}/`,

      config
    );
    dispatch({
      type: PENDING_ATTENDANCE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PENDING_ATTENDANCE_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const pendingRequestDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PENDING_ATTENDANCE_DETAIL_REQUEST_REQUEST,
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
      `http://110.34.30.120:8000/api/attedence_request/${id}/`,

      config
    );
    dispatch({
      type: PENDING_ATTENDANCE_DETAIL_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PENDING_ATTENDANCE_DETAIL_REQUEST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const manualAttendance =
  ({
    selectedUser,
    attendanceDate,
    manualInTime,
    manualBreak1In,
    manualBreak1Out,
    manualBreak2In,
    manualBreak2Out,
    manualOutTime,
  }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: MANUAL_ATTENDANCE_REQUEST,
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
      const dataToSend = {
        user_id: selectedUser,
        attedence_date: attendanceDate,
        in_time:manualInTime,
        out_time: manualOutTime,
        ...(manualBreak1In && { first_break_in: manualBreak1In }),
        ...(manualBreak1Out && { first_break_out: manualBreak1Out }),
        ...(manualBreak2In && { second_break_in: manualBreak2In }),
        ...(manualBreak2Out && { second_break_out: manualBreak2Out }),
      };
      console.log(dataToSend);
      const { data } = await axios.post(
        `http://110.34.30.120:8000/api/daily_attendence/`,
        dataToSend,

        config
      );
      dispatch({
        type: MANUAL_ATTENDANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
      
      if (error.response) {
        const responseData = error.response.data;
        if (responseData.non_field_errors) {
          errorMessage = responseData.non_field_errors[0];
        } else if (responseData.first_break_in) {
          errorMessage = responseData.first_break_in[0];
        } else if (responseData.first_break_out) {
          errorMessage = responseData.first_break_out[0];
        } else if (responseData.second_break_in) {
          errorMessage = responseData.second_break_in[0];
        } else if (responseData.second_break_out) {
          errorMessage = responseData.second_break_out[0];
        }
      }
  
      dispatch({
        type: MANUAL_ATTENDANCE_FAIL,
        payload: errorMessage,
      });
    }
  };


  export const manualAttendanceRequest =
  ({
    
    attendanceDate,
    manualInTime,
    manualBreak1In,
    manualBreak1Out,
    manualBreak2In,
    manualBreak2Out,
    manualOutTime,
    reason
  }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: MANUAL_ATTENDANCE_REQUEST_REQUEST,
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
      const dataToSend = {

        attedence_date: attendanceDate,
        in_time:manualInTime,
        out_time: manualOutTime,
        ...(manualBreak1In && { first_break_in: manualBreak1In }),
        ...(manualBreak1Out && { first_break_out: manualBreak1Out }),
        ...(manualBreak2In && { second_break_in: manualBreak2In }),
        ...(manualBreak2Out && { second_break_out: manualBreak2Out }),
        reason:reason
      };
      {console.log(manualBreak1In)}
      {console.log(manualBreak1Out)}
      console.log(dataToSend);
      const { data } = await axios.post(
        `http://110.34.30.120:8000/api/attedence_request/`,
        dataToSend,

        config
      );
      dispatch({
        type: MANUAL_ATTENDANCE_REQUEST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      let errorMessage = "Please make sure you have filled all the information as insructed.";
      
      if (error.response) {
        const responseData = error.response.data;
        if (responseData.non_field_errors) {
          errorMessage = responseData.non_field_errors[0];
        } else if (responseData.first_break_in) {
          errorMessage = responseData.first_break_in[0];
        } else if (responseData.first_break_out) {
          errorMessage = responseData.first_break_out[0];
        } else if (responseData.second_break_in) {
          errorMessage = responseData.second_break_in[0];
        } else if (responseData.second_break_out) {
          errorMessage = responseData.second_break_out[0];
        }
      }
  
      dispatch({
        type: MANUAL_ATTENDANCE_REQUEST_FAIL,
        payload: errorMessage,
      });
    }
  };


  export const deleteAttendance = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ATTENDANCE_DELETE_REQUEST,
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
        `http://110.34.30.120:8000/api/daily_attendence/${id}/`,
  
        config
      );
      dispatch({
        type: ATTENDANCE_DELETE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: ATTENDANCE_INTIME_RESET,
      });
    } catch (error) {
      dispatch({
        type: ATTENDANCE_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const updateAttendance =   ({
  
    
    updateInTime,
    updateBreak1In,
    updateBreak1Out,
    updateBreak2In,
    updateBreak2Out,
    updateOutTime,
    attendanceId
  }) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ATTENDANCE_UPDATE_REQUEST,
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
      const updatedData = {
   
        in_time:updateInTime,
        out_time: updateOutTime,
        ...(updateBreak1In && { first_break_in: updateBreak1In}),
        ...(updateBreak1Out && { first_break_out: updateBreak1Out }),
        ...(updateBreak2In && { second_break_in: updateBreak2In }),
        ...(updateBreak2Out && { second_break_out: updateBreak2Out }),
      };
      const { data } = await axios.put(
        `http://110.34.30.120:8000/api/daily_attendence/${attendanceId}/`,
        updatedData,
        config
      );
      dispatch({
        type:ATTENDANCE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ATTENDANCE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const detailAttendance = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ATTENDANCE_DETAIL_REQUEST,
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
        `http://110.34.30.120:8000/api/daily_attendence/${id}/`,
        config
      );
      dispatch({
        type:ATTENDANCE_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ATTENDANCE_DETAIL_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

