import UserProfileCard from './UserProfileCard'; // We'll create this next
import {Link } from "react-router-dom"
import { ReactElement } from "react";
import { Icons } from '../../../data/icons';
const navItems = [
  { name: "Dashboard", icon:Icons.dashboard, active: false },
  { name: "Users", icon: Icons.users, active: false },
  { name: "Subscriptions", icon: Icons.subscription, active: false },
  { name: "Tenants", icon: Icons.tenants, active: false },
  { name: "Permissions", icon: Icons.permission, active: false },
  { name: "Roles", icon: Icons.roles, active: false },
  { name: "Messages", icon: Icons.messages, active: false },
  { name: "Support", icon: Icons.supports, active: false },
  { name: "Settings", icon: Icons.settings, active: false },
];

const Sidebar = ():ReactElement => {
  return (
    <div className="flex flex-col h-full bg-gray-50 border-r border-gray-200">
      {/* Admin Panel Header */}
      <div className="p-6 text-xl font-bold text-gray-800 border-b border-gray-200">
        Admin Panel 
      </div>

      {/* Navigation Menu */}
      <ul className="menu w-full space-y-2 p-4 flex-grow">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link to={item.name.toLocaleLowerCase()}
              
              className={`flex items-center px-4 py- rounded-lg text-gray-700 hover:bg-sky-400 ${
                item.active ? 'bg-sky-400 text-primary font-semibold' : ''
              }`}
            >
              
              <span className="text-lg mr-3">{item.icon}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* User Profile Card */}
      <div className="p-4 border-t border-gray-200">
        <UserProfileCard />
      </div>
    </div>
  );
};

export default Sidebar;