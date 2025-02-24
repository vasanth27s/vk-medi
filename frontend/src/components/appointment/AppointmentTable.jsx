import React from "react";
import { FaUserMd, FaUser, FaCalendarAlt, FaClock, FaTools } from "react-icons/fa";
import AppointmentRow from "./AppointmentRow";

const AppointmentTable = ({ appointments, handleCancelAppointment }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg">
            <th className="p-4 border-gray-300 text-center">
              <div className="flex items-center justify-center gap-2">
                <FaUserMd className="text-white" /> <span>Doctor</span>
              </div>
            </th>
            <th className="p-4 border-gray-300 text-center">
              <div className="flex items-center justify-center gap-2">
                <FaUser className="text-white" /> <span>Patient</span>
              </div>
            </th>
            <th className="p-4 border-gray-300 text-center">
              <div className="flex items-center justify-center gap-2">
                <FaCalendarAlt className="text-white" /> <span>Date</span>
              </div>
            </th>
            <th className="p-4 border-gray-300 text-center">
              <div className="flex items-center justify-center gap-2">
                <FaClock className="text-white" /> <span>Time</span>
              </div>
            </th>
            <th className="p-4 border-gray-300 text-center">
              <div className="flex items-center justify-center gap-2">
                <FaTools className="text-white" /> <span>Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <AppointmentRow
              key={appointment._id}
              appointment={appointment}
              handleCancelAppointment={handleCancelAppointment}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
