import React from "react";
import { TbEdit, TbCalendarCancel } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { updateSelectedDoctor } from "../../redux/actions/doctorAction.js";
import { useNavigate } from "react-router-dom";
import {
  updateSelectedDate,
  selectSlotTime,
  setAppointmentDetails,
  updateEditingAppointmentId,
  updateMode
} from "../../redux/actions/appointmentAction.js";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  return `${day}${suffix} ${date.toLocaleString("en-US", {
    month: "short",
  })} ${date.getFullYear()}`;
};

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const AppointmentRow = ({ appointment, handleCancelAppointment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setReduxState = () => {
    dispatch(
      updateSelectedDoctor(appointment.doctorId._id, appointment.doctorId)
    );
    const onlyDateFromDate = appointment.date.split("T")[0];
    dispatch(updateSelectedDate(onlyDateFromDate));
    const onlyTimeFromDate = formatTime(appointment.date);
    dispatch(selectSlotTime(onlyTimeFromDate));
    dispatch(
      setAppointmentDetails({
        appointmentType: appointment.appointmentType,
        patientName: appointment.patientName,
        notes: appointment.notes,
      })
    );
    dispatch(updateEditingAppointmentId(appointment._id));
    dispatch(updateMode("edit"));

    navigate("/");
  };

  const handleEditAppointment = () => {
    setReduxState();
  };
  return (
    <tr className="text-center bg-gradient-to-r from-green-200 via-blue-200 to-purple-200">
      <td className="p-3 border border-gray-300">
        {appointment.doctorId.name}
      </td>
      <td className="p-3 border border-gray-300">{appointment.patientName}</td>
      <td className="p-3 border border-gray-300">
        {formatDate(appointment.date)}
      </td>
      <td className="p-3 border border-gray-300">
        {formatTime(appointment.date)}
      </td>
      <td className="p-3 border border-gray-300">
        <button
          className="text-green-500 hover:text-green-700 mr-3"
          onClick={handleEditAppointment}
        >
          <TbEdit size={22} className="cursor-pointer" />
        </button>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => handleCancelAppointment(appointment._id)}
        >
          <TbCalendarCancel size={22} className="cursor-pointer" />
        </button>
      </td>
    </tr>
  );
};

export default AppointmentRow;
