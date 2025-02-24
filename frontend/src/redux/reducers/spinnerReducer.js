import { SHOW_SPINNER, HIDE_SPINNER } from "../types";

const initialState = {
  show: false,
  title: 'Loading ...'
};

const spinnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SPINNER:
      return {
        show: true,
        title: action.payload.title ? action.payload.title : state.title
      };
    case HIDE_SPINNER:
      return {
        show: false,
      };
    default:
      return state;
  }
};

export default spinnerReducer;
