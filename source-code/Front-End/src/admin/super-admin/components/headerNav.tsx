// src/components/HeaderNav.tsx

import React from 'react';

interface HeaderNavProps {
  activeTab?: 'Dashboard' | 'Users' | 'Subscriptions' | 'Reports' | 'Settings';
}

const HeaderNav: React.FC<HeaderNavProps> = ({ activeTab = 'Subscriptions' }) => {
  return (
    <div className="navbar bg-base-100 shadow-sm border-b border-gray-200 px-6 py-3">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl font-bold text-gray-800 normal-case">CloudAdmin</a>
        <div className="hidden sm:flex ml-8 space-x-6 text-gray-600 font-medium">
          <a href="#" className={`link link-hover ${activeTab === 'Dashboard' ? 'text-primary' : ''}`}>Dashboard</a>
          <a href="#" className={`link link-hover ${activeTab === 'Users' ? 'text-primary' : ''}`}>Users</a>
          <a href="#" className={`link link-hover ${activeTab === 'Subscriptions' ? 'text-primary font-bold' : ''}`}>Subscriptions</a>
          <a href="#" className={`link link-hover ${activeTab === 'Reports' ? 'text-primary' : ''}`}>Reports</a>
          <a href="#" className={`link link-hover ${activeTab === 'Settings' ? 'text-primary' : ''}`}>Settings</a>
        </div>
      </div>
      <div className="flex-none gap-2">
        {/* User Avatar */}
        <div className="avatar">
          <div className="w-9 h-9 rounded-full bg-base-200 flex items-center justify-center text-sm font-semibold">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="User Avatar" className="w-full h-full rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;