import React, { useState } from "react";

const DoctorInfoRow = ({ heading, data, icon }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`text-xs text-gray-700 flex flex-col gap-1 text-left p-2 rounded-md transition-all duration-300 
      ${isActive ? "bg-blue-100 shadow-md scale-100" : "bg-white hover:bg-gray-100 hover:shadow-sm"}`}
      onClick={() => setIsActive(!isActive)}
    >
      <p className="flex flex-row items-center gap-1 cursor-pointer">
        <span className="text-blue-500 text-base">{icon}</span>
        <span className="font-semibold text-gray-900">{heading}:</span>
      </p>

      <span className="text-gray-600">{data}</span>
    </div>
  );
};

export default DoctorInfoRow;
