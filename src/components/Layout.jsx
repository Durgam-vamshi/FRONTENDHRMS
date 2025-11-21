import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#E7DEAF] text-[#007E6E] transition-colors">
      <Navbar />

      <div
        className="
        flex flex-1 
        flex-col sm:flex-row 
        w-full
      "
      >
        <div
          className="
          w-full sm:w-64 
          bg-[#D7C097] text-[#007E6E]
          border-b sm:border-b-0 sm:border-r 
          border-[#007E6E]/30
        "
        >
          <Sidebar />
        </div>

        <main className="flex-1 p-4 sm:p-6 md:p-8 bg-[#E7DEAF]">
          <Outlet />
        </main>
      </div>

      <Footer className="bg-[#73AF6F] text-[#E7DEAF] py-4 sm:py-5" />
    </div>
  );
}
