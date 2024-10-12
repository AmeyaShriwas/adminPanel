// Charts.js
import React from 'react';
import { PieChart, BarChart, Pie, Tooltip, Legend, XAxis, YAxis, CartesianGrid, Bar } from 'recharts';

const Charts = ({ pieData, barData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">PDF Distribution</h3>
        <PieChart width={400} height={400}>
          <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" />
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
        <BarChart width={400} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default Charts;
