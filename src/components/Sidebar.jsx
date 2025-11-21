

import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const activeBg = "bg-[#D7C097]";
  const activeText = "text-[#007E6E] font-semibold";
  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded transition-colors ${
      isActive
        ? `${activeBg} ${activeText}`
        : "text-gray-700 dark:text-gray-300 hover:bg-[#D7C097] hover:text-[#007E6E]"
    }`;

  return (
    <aside className="w-full sm:w-64 p-4 border-b sm:border-b-0 sm:border-r dark:border-gray-800 h-auto sm:h-screen sticky top-0 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:space-y-2 space-y-1">
        <NavLink to="/" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/employees" className={linkClass}>
          Employees
        </NavLink>
        <NavLink to="/teams" className={linkClass}>
          Teams
        </NavLink>
        <NavLink to="/logs" className={linkClass}>
          Activity Logs
        </NavLink>
      </nav>
    </aside>
  );
}

