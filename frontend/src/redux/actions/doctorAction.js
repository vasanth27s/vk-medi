import axios from "axios";
import { GET_DOCTORS, UPDATE_SELECTED_DOCTOR, CLEAR_DOCTOR_STATE } from "../types";

import { API_URL } from "../../config/config";
import { showSpinner, hideSpinner } from "./spinnerAction";

export const getDoctors = () => async (dispatch) => {
  try {
    dispatch(showSpinner("Fetching Doctors ..."));
    const res = await axios.get(API_URL + "/api/doctors");
    dispatch(hideSpinner());
    dispatch({ type: GET_DOCTORS, payload: res.data.doctors });
  } catch (error) {
    dispatch(hideSpinner());
    console.log(error);
  }
};

export const updateSelectedDoctor =
  (doctorId, doctorDetails) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SELECTED_DOCTOR,
        payload: { doctorId, doctorDetails },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const clearDoctorState = () => ({
  type: CLEAR_DOCTOR_STATE,
});
