import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import doctorReducer from "./reducers/doctorReducer";
import appointmentReducer from "./reducers/appointmentReducer";
import spinnerReducer from "./reducers/spinnerReducer";
import notificationReducer from "./reducers/notificationReducer";
const rootReducer = combineReducers({
  doctor: doctorReducer,
  appointment: appointmentReducer,
  spinner: spinnerReducer,
  notification: notificationReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
