import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  Cell,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { category: 'Shopping', amount: 124 },
  { category: 'Transport', amount: 78 },
  { category: 'Food', amount: 42 },
  { category: 'Health', amount: 50 },
  { category: 'Entertainment', amount: 156 },
];

// Function to alternate bar colors
const getBarColor = (index) => {
    return index % 2 === 0 ? '#0088FE' : '#00C49F';
  };
  
  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow border border-gray-200">
          <p className="text-gray-800 font-semibold">{label}</p>
          <p className="text-gray-600">Amount: ₹{payload[0].value}</p>
        </div>
      );
    }
  
    return null;
  };
const CustomBarChart= () => {
  return (
    <div className='bg-white mt-6 '>

    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 10,
        }}
        barSize={30}
      >
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="amount">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart ;
