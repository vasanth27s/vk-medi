import axios from "axios";
import {
  UPDATE_SELECTED_DATE,
  FETCH_SLOTS_SUCCESS,
  FETCH_SLOTS_ERROR,
  SELECT_SLOT_TIME,
  SET_APPOINTMENT_DETAILS,
  APPOINTMENTS_SUCCESS,
  APPOINTMENTS_FAIL,
  CANCEL_APPOINTMENT,
  UPDATE_EDITING_APPOINTMENT,
  UPDATE_MODE,
  CLEAR_APPOINTMENT_STATE
} from "../types";
import { API_URL } from "../../config/config";
import moment from "moment";
import { hideSpinner, showSpinner } from "./spinnerAction";
import { showNotification } from "./notificationAction";
export const updateSelectedDate = (date) => async (dispatch, getState) => {
  try {
    const doctorId = getState().doctor.selectedDoctor;
    const formattedDate = moment(date).format("YYYY-MM-DD");
    dispatch(showSpinner(`Fetching slots for ${formattedDate}`));
    const response = await axios.get(
      `${API_URL}/api/doctors/${doctorId}/slots?date=${formattedDate}`
    );
    dispatch(hideSpinner());
    dispatch({ type: UPDATE_SELECTED_DATE, payload: date });
    dispatch({ type: FETCH_SLOTS_SUCCESS, payload: response.data.slots });
    dispatch(
      showNotification({
        type: "success",
        message: "Please select a slot for your appointment",
        sticky: false,
      })
    );
  } catch (error) {
    dispatch(hideSpinner())
    console.error("Error fetching slots:", error);
    dispatch({ type: FETCH_SLOTS_ERROR, payload: error.message });

    dispatch(
      showNotification({
        type: "error",
        message: 'Error fetching slots',
        sticky: true,
      })
    );
  }
};

export const selectSlotTime = (slotTime) => (dispatch) => {
  dispatch({ type: SELECT_SLOT_TIME, payload: slotTime });
};

export const setAppointmentDetails = (appointmentData) => (dispatch) => {
  dispatch({ type: SET_APPOINTMENT_DETAILS, payload: appointmentData });
};

export const bookAppointment = (mode) => async (dispatch, getState) => {
  try {
    const state = getState();
    const doctorId = state.doctor.selectedDoctor;
    const selectedDate = state.appointment.selectedDate;
    const selectedSlot = state.appointment.selectedSlot;


   

    const { appointmentType, patientName, notes } =
      state.appointment.appointment;
      let formattedDate;
      if(typeof selectedDate === 'object'){
         formattedDate = selectedDate.toLocaleDateString("en-CA");
      } else {
        formattedDate = selectedDate
      }
  
    let appointmentDateTime = `${formattedDate}T${selectedSlot}:00`;

    const appointmentIdToEdit = state.appointment.appointmentIdToEdit;


    appointmentDateTime = moment(appointmentDateTime).utc().toISOString();


    const payload = {
      doctorId,
      date: appointmentDateTime,
      duration: 30,
      appointmentType,
      patientName,
      notes,
    };
    let response;
    
    if (mode === "create") {
      dispatch(showSpinner(`Creating new appointment for you`))
      response = await axios.post(`${API_URL}/api/appointments`, payload);
    } else if (mode === "edit") {
      dispatch(showSpinner('Saving your updated appointment'))
      response = await axios.put(
        `${API_URL}/api/appointments/${appointmentIdToEdit}`,
        payload
      );
    }
    dispatch(hideSpinner())
    let msg = "your appointment is booked successfully";
    if(mode === 'edit') {
      msg = "your appointment is modified successfully";
    }

    dispatch(
      showNotification({
        type: "success",
        message: msg,
        sticky: false,
      })
    );

    console.log("Appointment booked successfully:", response.data);
  } catch (error) {
    dispatch(hideSpinner())
    dispatch(
      showNotification({
        type: "error",
        message: `Error ${mode === 'edit' ? 'editing' : 'booking'} appointment`,
        sticky: true,
      })
    );
    console.error("Error booking appointment:", error);
  }
};

export const fetchAppointments = () => async (dispatch) => {
  try {
    dispatch(showSpinner('Fetching your appointments'))
    const res = await axios.get(`${API_URL}/api/appointments`);
    dispatch(hideSpinner())
    dispatch({ type: APPOINTMENTS_SUCCESS, payload: res.data.appointments });
  } catch (error) {
    dispatch(hideSpinner())
    dispatch({
      type: APPOINTMENTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const cancelAppointment = (id) => async (dispatch) => {
  try {
    dispatch(showSpinner('Cancelling your appointment ...'))
    const res = await axios.delete(`${API_URL}/api/appointments/${id}`);
    dispatch(hideSpinner())
    dispatch({ type: CANCEL_APPOINTMENT, payload: res.data.appointments });
    dispatch(
      showNotification({
        type: "success",
        message: 'Your appointment is cancelled',
        sticky: false,
      })
    );
  } catch (error) {
    console.error("Error deleting appointment:", error);
    dispatch(hideSpinner())
    dispatch(
      showNotification({
        type: "error",
        message: 'Error deleting appointment',
        sticky: true,
      })
    );
  }
};

export const updateEditingAppointmentId = (id) => (dispatch) => {
  dispatch({ type: UPDATE_EDITING_APPOINTMENT, payload: id });
};

export const updateMode = (mode) => (dispatch) => {
  dispatch({ type: UPDATE_MODE, payload: mode });
};

export const clearAppointmentState = () => ({
  type: CLEAR_APPOINTMENT_STATE,
});
