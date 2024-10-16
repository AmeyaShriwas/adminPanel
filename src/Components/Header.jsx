import React, { useState } from 'react';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  return (
    <header className="bg-gray-100 py-3 px-6 border-b border-gray-200 mb-5 rounded-lg ">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        </div>

        <div className="flex items-center space-x-6">
          {/* Search Bar */}
        

          {/* Notification Icon */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="text-2xl focus:outline-none"
            >
              🔔
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2">
                <ul className="text-sm text-gray-700">
                  <li className="px-4 py-2 border-b border-gray-200">
                    You have 3 new messages.
                  </li>
                  <li className="px-4 py-2 border-b border-gray-200">
                    Your order has been shipped.
                  </li>
                  <li className="px-4 py-2">New comment on your product.</li>
                </ul>
              </div>
            )}
          </div>

          {/* User Icon & Dropdown */}
          <div className="relative">
            <button
              onClick={toggleUserDropdown}
              className="text-2xl focus:outline-none"
            >
              👤
            </button>
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                <ul className="text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Settings
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Account
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
