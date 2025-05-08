import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const incomeData = [
  { name: 'Jan', amount: 1200 },
  { name: 'Feb', amount: 1500 },
  { name: 'Mar', amount: 1800 },
  { name: 'Apr', amount: 2000 },
  { name: 'May', amount: 3200 },
  { name: 'Jun', amount: 2800 },
  { name: 'Jul', amount: 3000 },
  { name: 'Aug', amount: 2500 },
  { name: 'Sep', amount: 2700 },
  { name: 'Oct', amount: 3500 },
  { name: 'Nov', amount: 4000 },
  { name: 'Dec', amount: 3800 },
  { name: 'Bonus', amount: 500 },
  { name: 'Freelance', amount: 800 },
];

const CustomLineChart = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full h-[350px]">
      <h2 className="text-lg font-semibold mb-4">Income Overview</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={incomeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
