import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { updateSelectedDate } from "../../redux/actions/appointmentAction";
import SlotsGrid from "./SlotsGrid";

const Slots = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.appointment.selectedDate);
  const [availableDates, setAvailableDates] = useState([]);
  const selectedDoctor = useSelector((state) => state.doctor.selectedDoctor);
  const slots = useSelector((state) => state.appointment.slots);
  const selectedSlot = useSelector((state) => state.appointment.selectedSlot);

  useEffect(() => {
    if (selectedDoctor) {
      const today = new Date();
      const next7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i);
        return date;
      });

      setAvailableDates(next7Days);
    }
  }, [selectedDoctor]);

  const handleDateChange = (date) => {
    dispatch(updateSelectedDate(date));
  };

  return (
    <div className="slots-card bg-white p-3 rounded-xl border border-gray-200 w-[80%] h-full flex flex-col">
  <div className="bg-black p-6 rounded-2xl shadow border border-gold min-w-sm mx-auto">
      <h1 className="text-lg font-serif font-semibold text-white text-center">Select Slot</h1>
    </div>          {selectedDoctor ? (
        <div className="flex items-center gap-4">
          <div className="mt-2 flex flex-col items-start gap-1 px-4">
            <label className="block text-gray-700 font-medium text-center">
              Select Appointment Date:
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              includeDates={availableDates}
              placeholderText="Select a date"
              dateFormat="MMMM d, yyyy"
              className="border p-2 rounded-md w-full mt-2"
            />
          </div>

          <div className="mt-2 flex flex-col items-start gap-1 px-4">
            <label className="block text-gray-700 font-medium text-center">
              Slot Duration
            </label>
            <p className="p-2 rounded-lg bg-blue-100 text-blue-600 mt-2">
              30 min
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3">
          <p className="text-center text-gray-500">
            Please select a doctor first.
          </p>
        </div>
      )}

      <div className="flex-grow mt-4">
        {selectedDate && <SlotsGrid slots={slots} />}
      </div>

      {selectedDoctor && selectedDate && selectedSlot && (
        <Link to="/appointment">
          <button className="w-full mx-1 my-2 bg-gradient-to-r from-[#feda75] via-[#fa7e1e] to-[#d62976] text-white p-2 rounded-lg hover:opacity-90 cursor-pointer transition">
            Book 
          </button>
        </Link>
      )}
    </div>
  );
};

export default Slots;
