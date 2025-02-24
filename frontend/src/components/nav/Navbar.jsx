import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAppointmentState } from "../../redux/actions/appointmentAction";
import { clearDoctorState } from "../../redux/actions/doctorAction";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewAppointment = () => {
    dispatch(clearAppointmentState());
    dispatch(clearDoctorState());
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-8 shadow-lg rounded-lg mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://blogger.googleusercontent.com/img/a/AVvXsEgv7x4UTS7ORfyfSRNA07GpEGSaITOb-8j_qY2ygzbOVVRuRZzdY-VVODmGQ9diprYttGcK7W8pMtWw1ZmUxkjynqyFMhB2lzCOHB5h8uqa3Whvs1ZZbslPFr5WuglFlVb68NG_38vrIQtL6RXPJaJZdk0yx0F4eArGaBSm-TsraV7ziLwi1deDkbNsPt4"
            alt="Logo"
            className="w-12 h-12 rounded-full object-cover"
          />
          <h1 className="text-2xl font-bold">VK</h1>
        </Link>
        <div className="flex gap-4">
          <button
            onClick={handleNewAppointment}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            New Appointment
          </button>
          <Link to="/my-appointments">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              My Appointments
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;