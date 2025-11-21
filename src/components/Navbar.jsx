import React, { useState } from "react";
import { getUser, logout } from "../services/auth";

export default function Navbar() {
  const user = getUser();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { name: "Dashboard", href: "#dashboard" },
    { name: "Employees", href: "#employees" },
  ];

  const NavLink = ({ name, href }) => (
    <a
      href={href}
      className="block sm:inline-block px-4 py-2 text-[#E7DEAF] hover:bg-[#73AF6F] rounded-md text-sm font-medium transition-colors duration-200 w-full sm:w-auto text-left"
      onClick={() => setMenuOpen(false)}
    >
      {name}
    </a>
  );

  return (
    <header className="w-full bg-[#007E6E] shadow-md transition-colors relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-3 sm:p-4">
        <div className="flex items-center space-x-2 z-10">
          <div className="bg-[#D7C097] text-[#007E6E] font-bold px-3 py-1 rounded-md shadow-lg hover:shadow-[#E7DEAF] transition-shadow duration-300 text-sm sm:text-base">
            HRMS
          </div>
        </div>

        <div className="sm:hidden z-10">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md bg-[#E7DEAF] text-[#007E6E] hover:bg-[#D7C097] shadow-md transition-all duration-300"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute top-full left-0 w-full bg-[#007E6E] shadow-lg sm:relative sm:flex sm:w-auto sm:shadow-none sm:top-auto z-10`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center w-full space-y-2 sm:space-y-0 p-4 sm:p-0 sm:space-x-4">
            <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-1 sm:space-y-0 mb-2 sm:mb-0 border-b border-white/10 sm:border-b-0 pb-2 sm:pb-0">
              {navItems.map((item) => (
                <NavLink key={item.name} name={item.name} href={item.href} />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full sm:w-auto space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-[#73AF6F] flex items-center justify-center text-[#E7DEAF] font-semibold shadow-md hover:shadow-[#D7C097] transition-shadow duration-300 text-sm">
                  {user ? user.name?.slice(0, 1) || "U" : "U"}
                </div>
                <div className="text-sm font-medium text-[#E7DEAF]">
                  {user ? `${user.name || ""} ${user.last_name || ""}` : ""}
                </div>
              </div>

              <button
                onClick={logout}
                className="w-full sm:w-auto px-4 py-2 bg-[#73AF6F] hover:bg-[#007E6E] hover:shadow-[#D7C097] shadow-md text-[#E7DEAF] rounded-md text-sm font-medium transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
