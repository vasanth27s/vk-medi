import React from "react";
import Selector from "../form/Selector";
import { useDispatch, useSelector } from "react-redux";
import {
  FaUserMd,
  FaStar,
  FaMoneyBillWave,
  FaClock,
  FaGraduationCap,
} from "react-icons/fa";
import DoctorInfoRow from "./DoctorInfoRow";
import { updateSelectedDoctor } from "../../redux/actions/doctorAction";

const DoctorCard = ({ doctorOptions, doctors }) => {
  const dispatch = useDispatch();
  const selectedDoctor = useSelector((state) => state.doctor.selectedDoctor);
  const selectedDoctorDetails = useSelector(
    (state) => state.doctor.selectedDoctorDetails
  );

  const onDoctorChange = (name, value) => {
    const doctor = doctors.find((doc) => doc._id === value);
    dispatch(updateSelectedDoctor(value, doctor));
  };

  return (
    <div className="doctor-card bg-white text-black p-6 rounded-xl border border-gray-300 w-[20%] h-full flex flex-col shadow-md relative overflow-hidden">
      <h2 className="text-xl font-bold text-center mb-4 font-roboto italic bg-gradient-to-r from-gold to-black text-transparent bg-clip-text border border-gold p-2 rounded-md">Select Doctor</h2>
      <div className="flex-grow">
        <Selector
          options={doctorOptions}
          name="doctor"
          value={selectedDoctor}
          updateValue={onDoctorChange}
          className="p-2 border border-gray-400 bg-gray-100 text-black rounded-md shadow-lg focus:ring-2 focus:ring-gold focus:ring-opacity-50 transition-transform transform hover:scale-105"
        />
      </div>
      {selectedDoctorDetails?._id && (
        <div className="border-gray-300 pt-4 mt-4 bg-gray-100 p-4 rounded-lg flex flex-col gap-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaUserMd className="text-gold animate-pulse" />
            <p className="truncate">{selectedDoctorDetails.name}</p>
          </h3>
          <DoctorInfoRow
            data={selectedDoctorDetails.qualifications}
            heading="Qualifications"
            icon={<FaGraduationCap className="text-purple-500 animate-spin-slow" />}
          />
          <DoctorInfoRow
            data={selectedDoctorDetails.specialization}
            heading="Specialization"
            icon={<FaUserMd className="text-green-500 animate-bounce" />}
          />
          <DoctorInfoRow
            data={`${selectedDoctorDetails.workingHours.start} - ${selectedDoctorDetails.workingHours.end}`}
            heading="Working Hours"
            icon={<FaClock className="text-yellow-500 animate-pulse" />}
          />
          <DoctorInfoRow
            data={selectedDoctorDetails.rating}
            heading="Rating"
            icon={<FaStar className="text-orange-400 animate-wiggle" />}
          />
          <DoctorInfoRow
            data={`₹${selectedDoctorDetails.consultationFee}`}
            heading="Consultation Fee"
            icon={<FaMoneyBillWave className="text-green-600 animate-float" />}
          />
        </div>
      )}
    </div>
  );
};

export default DoctorCard;