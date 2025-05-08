import React, { useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";



const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded p-2 text-sm">
        <p className="text-gray-700">{`${payload[0].name}: $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const IncomePieChartWithFilter = (
    {data}
) => {
  const [selectedMonth, setSelectedMonth] = useState("January");

  const monthData = data.find((item) => item.month === selectedMonth);
  const totalIncome = monthData?.incomes.reduce((acc, cur) => acc + cur.amount, 0) || 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full md:w-[500px]">
      <div className="mb-4">
        <label htmlFor="month-select" className="text-sm text-gray-700 font-medium mr-2">
          Select Month:
        </label>
        <select
          id="month-select"
          className="border border-gray-300 rounded px-3 py-1"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {data.map((item) => (
            <option key={item.month} value={item.month}>
              {item.month}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={monthData?.incomes || []}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {(monthData?.incomes || []).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      
          <div className="mt-3 p-2 bg-blue-50 rounded-lg text-center">
            <p className="text-sm font-medium text-gray-700">Grand Total</p>
            <p className="text-lg font-bold text-blue-600">
            Total Income: ${totalIncome.toFixed(2)}
            </p>
          </div>
        
     
    </div>
  );
};

export default IncomePieChartWithFilter;
