// Header.js
import React from 'react';

const Header = () => {
  return (
    <div className="lg:flex lg:items-center lg:justify-between mb-8">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Dashboard
        </h2>
      </div>
    </div>
  );
};

export default Header;
