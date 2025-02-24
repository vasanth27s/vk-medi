import { GET_DOCTORS, UPDATE_SELECTED_DOCTOR, CLEAR_DOCTOR_STATE } from "../types";
const initialState = {
  doctors: [],
  selectedDoctor: "",
  selectedDoctorDetails: {},
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCTORS:
      return {
        ...state,
        doctors: [...action.payload],
      };
      case UPDATE_SELECTED_DOCTOR:
      return {
        ...state,
        selectedDoctor: action.payload.doctorId,
        selectedDoctorDetails: action.payload.doctorDetails,
      };
      case CLEAR_DOCTOR_STATE:
        return { doctors: state.doctors,  selectedDoctor: "", selectedDoctorDetails: {}}; 
    default:
      return state;
  }
};

export default doctorReducer;
