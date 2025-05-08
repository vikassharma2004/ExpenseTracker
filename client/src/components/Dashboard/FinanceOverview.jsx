import React from 'react';
import CustomPieChart from './CustomPieChart';

const colors = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ TotalIncome, TotalExpenses, TotalBalance }) => {
  const balanceData = [
    {
      name: "Total Balance",
    amount: TotalBalance ,
    },
    {
      name: "Total Income",
    amount: TotalIncome ,
    },
    {
      name: "Total Expenses",
    amount: TotalExpenses ,
    },
  ];

  return (
    <div className="bg-white p-6 shadow-md shadow-gray-200 border border-gray-200/50 rounded-2xl mb-4">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Finance Overview</h5>
      </div>

      <CustomPieChart
        Data={balanceData}
        label="Total Balance"
        totalamount={`₹${TotalBalance }`}
        colors={colors}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
