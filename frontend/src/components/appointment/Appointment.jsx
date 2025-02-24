import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAppointmentDetails,
  bookAppointment,
} from "../../redux/actions/appointmentAction";
import Selector from "../form/Selector";
import { Link, useNavigate } from "react-router-dom";

const Appointment = () => {
  const dispatch = useDispatch();
  const appointment = useSelector((state) => state.appointment.appointment);
  const mode = useSelector((state) => state.appointment.mode);
  const navigate = useNavigate();
  const appointmentTypes = [
    { label: "Check-Up", value: "Check-Up" },
    { label: "Consultation", value: "Consultation" },
    { label: "Complete Blood Count (CBC)", value: "Complete Blood Count (CBC)" },
    { label: "Vitamin Check", value: "Vitamin Check" },
    { label: "CT Calcium score", value: "CT Calcium score" },
    { label: "Calcium Levels", value: "Calcium Levels" },
    { label: "Phosphorus Levels", value: "Phosphorus Levels" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setAppointmentDetails({ ...appointment, [name]: value }));
  };

  const onSelectorChange = (name, value, type) => {
    dispatch(setAppointmentDetails({ ...appointment, [name]: value }));
  };

  const bookAppointmentHandler = () => {
    dispatch(bookAppointment(mode));
    navigate("/my-appointments");
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 p-10 rounded-lg shadow-md w-full max-w-lg mx-auto mt-20">
      <h2 className="text-xl font-bold text-white mb-8 text-center">
        Book an Appointment
      </h2>

      <div className="gap-8 flex flex-col w-full items-center text-left">
        <div className="w-full">
          <label className="block text-white font-medium mb-1 ml-2 p-1">
            Appointment Type
          </label>
          <Selector
            options={appointmentTypes}
            name="appointmentType"
            value={appointment.appointmentType}
            updateValue={onSelectorChange}
            className="w-full focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="w-full ml-2">
          <label className="block text-white font-medium mb-1 p-1">
            Patient Name
          </label>
          <input
            type="text"
            name="patientName"
            value={appointment.patientName}
            onChange={handleChange}
            className="w-full border py-[8px] px-2 rounded-md focus:ring focus:ring-blue-300 border-gray-300"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="w-full ml-2">
          <label className="block text-white font-medium mb-1 p-1">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={appointment.notes}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring focus:ring-blue-300 border-gray-300"
            rows="3"
            placeholder="Enter any additional information..."
          ></textarea>
        </div>

        <div className="btn-group flex gap-4 items-center">
          <Link to="/">
            <button className="w-30 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 cursor-pointer transition">
              Go Back
            </button>
          </Link>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition cursor-pointer"
            onClick={bookAppointmentHandler}
          >
            {mode === "create" ? "Create" : "Edit"} Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
