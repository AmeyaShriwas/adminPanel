import React, { useState } from 'react';
import Sidebar from './../../Components/Sidebar';
import Header from './../../Components/Header';
import StatBoxes from './../../Components/StatBoxes';
import Charts from './../../Components/Charts';
import PdfList from '../../Components/Pdf';

// Sample data for charts
const pieData = [
  { name: 'JavaScript', value: 8 },
  { name: 'ReactJS', value: 12 },
  { name: 'ExpressJS', value: 10 },
  { name: 'NodeJS', value: 5 },
];

const barData = [
  { name: 'January', users: 400 },
  { name: 'February', users: 300 },
  { name: 'March', users: 500 },
  { name: 'April', users: 600 },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard'); // Default to Dashboard view
  const [totalUsers, setTotalUsers] = useState(1000);
  const [activeUsers, setActiveUsers] = useState(500);
  const [totalPDFs, setTotalPDFs] = useState(20);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setCurrentView={setCurrentView} />

      {/* Main Content */}
      <div className="flex-1 p-6  bg-gray-100 bg-white">
        {/* Conditional Rendering based on currentView */}
        {currentView === 'dashboard' && (
          <>
            {/* Header */}
            <Header />

            {/* Stat Boxes */}
            <StatBoxes totalUsers={totalUsers} activeUsers={activeUsers} totalPDFs={totalPDFs} />

            {/* Charts */}
            <Charts pieData={pieData} barData={barData} />
          </>
        )}
        {currentView === 'pdfs' && <PdfList />} {/* Show PDF List when PDFs is selected */}
        {/* Add more views as needed */}
      </div>
    </div>
  );
}
