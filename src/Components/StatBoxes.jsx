// StatBoxes.js
import React from 'react';

const StatBoxes = ({ totalUsers, activeUsers, totalPDFs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
        <p className="text-2xl">{totalUsers}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
        <p className="text-2xl">{activeUsers}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900">Total PDFs</h3>
        <p className="text-2xl">{totalPDFs}</p>
      </div>
    </div>
  );
};

export default StatBoxes;
