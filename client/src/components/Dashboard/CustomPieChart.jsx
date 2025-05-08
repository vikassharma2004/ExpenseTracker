import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomPieChart = ({
  Data,
  colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF'],
}) => {
  // Sanitize data to ensure amount is a number
  const parsedData = Data?.map((item) => ({
    name: item.name,
    amount: Number(item.amount?.toString().trim()) || 0,
  })) || [];

  // Calculate total for percentage display
  const total = parsedData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Chart Container */}
      <div style={{ width: '100%', height: 'clamp(200px, 40vw, 300px)' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={parsedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius="80%"
              innerRadius="40%"
              fill="#8884d8"
              dataKey="amount"
            >
              {parsedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Responsive Legend */}
      <div className="mt-4 px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {parsedData.map((item, index) => {
            const percentage = total > 0 ? (item.amount / total * 100).toFixed(1) : 0;
            return (
              <div 
                key={`legend-${index}`} 
                className="flex items-center p-2 bg-gray-50 rounded-lg"
              >
                <div 
                  className="w-3 h-3 mr-2 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                    {item.name}
                  </p>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-semibold">
                      {item.amount.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {percentage}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Total Display */}
        {total > 0 && (
          <div className="mt-3 p-2 bg-blue-50 rounded-lg text-center">
            <p className="text-sm font-medium text-gray-700">Grand Total</p>
            <p className="text-lg font-bold text-blue-600">
              {total.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomPieChart;