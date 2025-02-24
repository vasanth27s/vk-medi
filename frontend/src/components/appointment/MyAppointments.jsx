import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments, cancelAppointment } from "../../redux/actions/appointmentAction";
import AppointmentTable from "./AppointmentTable";

const MyAppointments = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointment);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleCancelAppointment = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      dispatch(cancelAppointment(id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <AppointmentTable appointments={appointments} 
        handleCancelAppointment={handleCancelAppointment} 
        />
      )}
    </div>
  );
};

export default MyAppointments;
