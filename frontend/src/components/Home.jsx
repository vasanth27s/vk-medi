import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getDoctors,
} from "../redux/actions/doctorAction.js";


import Slots from "./slot/Slots.jsx";
import DoctorCard from "./doctor/DoctorCard.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor.doctors);
  const [doctorOptions, setDoctorOptions] = useState([]);

  useEffect(() => {
    dispatch(getDoctors());
  }, []);

  useEffect(() => {
    let labelValOptions = [{label: "Select Doctor", value: ""}];
    labelValOptions = [
      ...labelValOptions,
      ...doctors.map((item, index) => {
        return {
          label: item.name,
          value: item._id,
        };
      }),
    ];
    setDoctorOptions(labelValOptions);
  }, [doctors]);


 

  return (
    <>
    

      <div className="flex mt-4 gap-2 items-stretch min-h-screen">
        <DoctorCard doctorOptions={doctorOptions} doctors={doctors}/>
        <Slots />
      </div>
    </>
  );
};

export default Home;
