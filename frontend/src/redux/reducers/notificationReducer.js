import { SHOW_NOTIFICATION, CLOSE_NOTIFICATION } from "../types";
const initialState = {
  message: "",
  type: "",
  visible: false,
  sticky: true,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case SHOW_NOTIFICATION:
      return {
        message: action.payload?.message,
        type: action.payload?.type,
        sticky: action.payload?.sticky,
        visible: true,
      };
    case CLOSE_NOTIFICATION:
      return {
        message: action.payload?.message,
        type: action.payload?.type,
        sticky: state.sticky,
        visible: false,
      };
    default:
      return state;
  }
};

export default notificationReducer;
