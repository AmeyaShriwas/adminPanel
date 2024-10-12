import React from 'react';
import { HomeIcon, DocumentTextIcon, NewspaperIcon, CogIcon, UserIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom'; // Assuming you are using React Router

const Sidebar = ({ sidebarOpen, setSidebarOpen, setCurrentView }) => {
  const handleNavigation = (view) => {
    setCurrentView(view); // Update the current view when a sidebar option is clicked
    setSidebarOpen(false); // Optionally close the sidebar
  };

  return (
    <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-800  p-4`}>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-white w-full flex items-center justify-between">
        <span>{sidebarOpen ? '<>' : '</>'}</span>
      </button>

      <ul className="mt-8">
        <li className="text-gray-300 py-2 flex items-center cursor-pointer" onClick={() => handleNavigation('dashboard')}>
          <HomeIcon className="h-6 w-6" />
          {sidebarOpen && <span className="ml-2">Dashboard</span>}
        </li>
        <li className="text-gray-300 py-2 flex items-center cursor-pointer" onClick={() => handleNavigation('pdfs')}>
          <DocumentTextIcon className="h-6 w-6" />
          {sidebarOpen && <span className="ml-2">PDFs</span>}
        </li>
        {/* Add more sidebar options as needed */}
        <li className="text-gray-300 py-2 flex items-center cursor-pointer">
          <UserIcon className="h-6 w-6" />
          {sidebarOpen && <span className="ml-2">Logout</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
