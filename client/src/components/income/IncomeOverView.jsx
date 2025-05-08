import React, { useEffect, useState } from "react";

import CustomBarChart from "../Dashboard/CustomBarChart";
import RecentTransactions from "../Dashboard/RecentTransactions";
import TransactionCard from "../Dashboard/TransactionCard";

const IncomeOverView = ({ transactions, onopenModel }) => {
  const [barChartData, setBarChartData] = useState([]);
  console.log(transactions);
  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const prepareIncomeBarChartData = (transactions) => {
        return transactions
          .filter((item) => item.type === "income")
          .map((item) => ({
            category: item.category,
            amount: item.amount,
          }));
      };

      setBarChartData(prepareIncomeBarChartData(transactions));
    }
  }, [transactions]);

  return (
    <div className="bg-white p-9 shadow-md shadow-gray-200 border border-gray-200/50 rounded-2xl mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h5 className="text-lg mb-1">Income Overview</h5>
          <p className="text-xs text-gray-400">
            Track your earnings over time and analyze your income
          </p>
        </div>
        <button
          onClick={onopenModel}
          className="flex items-center gap-3 text-[12px] font-medium text-gray-700 bg-gray-50 hover:text-purple-500 hover:bg-purple-50 px-4 py-1.5 rounded-lg border border-gray-200/50 cursor-pointer"
        >
          View All
        </button>
      </div>

       {/* Scrollable container for transaction cards */}
  <div className="mt-4 max-h-[400px] overflow-y-auto pr-2">
    {transactions?.map((item) => (
      <TransactionCard
        key={item._id}
        title={item.type === "expense" ? item.category : item.source}
        icon={item.icon}
        date={item.date}
        amount={item.amount}
        type={item.type}
        hideDeleteBtn={item.hideDeleteBtn}
      />
    ))}
  </div>
    </div>
  );
};

export default IncomeOverView;
