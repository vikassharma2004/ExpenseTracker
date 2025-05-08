import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="-z-10 flex items-center gap-6 p-4 bg-white rounded-2xl shadow-md shadow-gray-100 border-gray-200/50">
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-2xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
        <span className="text-[22px] font-semibold text-gray-800 ">
          {" "}
          {value}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
