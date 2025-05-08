import React, { useState } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-white p-3 border rounded shadow text-sm">
        <p className="font-medium text-gray-800">{item.category}</p>
        <p className="text-blue-600">Budget: ₹{item.budget}</p>
        <p className="text-red-500">Expense: ₹{item.expense}</p>
      </div>
    );
  }
  return null;
};

const BudgetVsExpenseChart = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState("January");

  const monthData =
    data.find((entry) => entry.month === selectedMonth)?.data || [];
  // Calculate total budget and expense for the selected month
  const totalBudget = monthData.reduce((sum, item) => sum + item.budget, 0);
  const totalExpense = monthData.reduce((sum, item) => sum + item.expense, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Budget vs Expense Overview
        </h3>
        <select
          className="border border-gray-300 rounded px-3 py-1"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {data.map((entry) => (
            <option key={entry.month} value={entry.month}>
              {entry.month}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={monthData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="budget" fill="#60A5FA" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="budget" position="top" />
          </Bar>
          <Bar dataKey="expense" fill="#F87171" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="expense" position="top" />
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
      <div className="mt-4 px-2 sm:px-4">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-700">Total Budget</p>
            <p className="text-xl font-semibold text-blue-600">
              ₹{totalBudget.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-700">Total Expense</p>
            <p className="text-xl font-semibold text-red-600">
              ₹{totalExpense.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetVsExpenseChart;
