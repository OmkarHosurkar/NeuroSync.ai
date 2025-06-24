import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Promt from "./Promt";
import { Menu } from "lucide-react";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#1e1e1e] text-white overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#232327] transition-transform z-40
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:relative md:flex-shrink-0`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full md:ml-64 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <div className="text-xl font-bold">PrimeSeek</div>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-300" />
          </button>
        </div>

        {/* Promt Area that can scroll when content grows */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-6">
          <Promt />
        </div>
      </div>

      {/* Overlay when Sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Home;
