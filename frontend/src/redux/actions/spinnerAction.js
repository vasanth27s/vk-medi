import { SHOW_SPINNER, HIDE_SPINNER } from "../types";

export const showSpinner = (title) => async (dispatch) => {
  dispatch({ type: SHOW_SPINNER, payload: {title} });
};

export const hideSpinner = () => async (dispatch) => {
  dispatch({ type: HIDE_SPINNER, payload: {} });
};
