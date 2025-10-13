import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar bg-gray-50 shadow-sm px-6 py-4 flex justify-between items-center">
      {/* Logo or Title */}
      <h1 className="text-xl font-semibold text-gray-700"></h1>

      {/* Right Section */}
      <div className="flex items-center gap-6 relative">
        {/* Notification Icon */}
        <button className="relative hover:text-blue-600 transition">
          <FontAwesomeIcon icon={faBell} className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-[5px]">
            3
          </span>
        </button>

        {/* Avatar */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className="avatar cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="w-10 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-2">
              <img
                src="https://i.pravatar.cc/100"
                alt="User Avatar"
              />
            </div>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 absolute right-0 top-12 border"
            >
              <li>
                <button className="flex items-center gap-2 text-gray-700 hover:bg-gray-100">
                  <FontAwesomeIcon icon={faUser} />
                  Profile
                </button>
              </li>
              <li>
                <button className="flex items-center gap-2 text-red-500 hover:bg-gray-100">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
