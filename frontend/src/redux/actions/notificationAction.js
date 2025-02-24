import { SHOW_NOTIFICATION, CLOSE_NOTIFICATION } from "../types";

export const showNotification = (data) => async (dispatch) => {
  dispatch({ type: SHOW_NOTIFICATION, payload: data });
};

export const closeNotification = (data) => async (dispatch) => {
  dispatch({ type: CLOSE_NOTIFICATION, payload: null });
};
