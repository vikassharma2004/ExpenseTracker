import React from "react";
import CustomPieChart from "./CustomPieChart";

const RecentIncomeWithChart = ({ data }) => {
  return (
    <div className="bg-white p-6 shadow-md shadow-gray-200 border border-gray-200/50 rounded-2xl mb-4 col-span-1">
      <div className="flex justify-between items-center">
        <h5 className="text-lg m-4">Latest 30 days Income</h5>
      </div>

      <CustomPieChart Data={data} />
    </div>
  );
};

export default RecentIncomeWithChart;
