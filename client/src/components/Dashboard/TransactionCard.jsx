import React from "react";
import {
  LuTrendingUp,
  LuTrendingDown,
  LuUtensils,
  LuTrash2,
} from "react-icons/lu";
const TransactionCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
}) => {

  const getAmountColor = (type) => {
    if (type === "expense") {
      return "text-red-500 bg-red-50 ";
    } else {
      return "bg-green-50 text-green-500 ";
    }
  };
  return (
    <div className="group relative  flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 ">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? <span className="w-6 h-6  ">{icon}</span> : <LuUtensils />}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div className="">
          <p className="text-sm text-gray-700 font-medium ">{title}</p>
          <p className="text-sx text-gray-400 mt-1">{date}</p>
        </div>
        <div className="flex items-center gap-2 ">
          {!hideDeleteBtn && (
            <button className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
              <LuTrash2 className="text-red-500" size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountColor(
              type
            )}`}
          >
            <h6 className="text-xs font-medium">
              {type === "expense" ? "+" : "-"} ${amount}
            </h6>
            {type === "expense" ? (
              <LuTrendingDown size={18} />
            ) : (
              <LuTrendingUp size={18} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
