import React from "react";
import { FiSearch, FiBell } from "react-icons/fi";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-gray-400 text-lg"></div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Pesquisa..."
            className="border border-gray-300 rounded-md p-2 pl-8 focus:outline-none focus:ring-2 focus:ring-[#6347F9] w-full max-w-xs"
          />
          <FiSearch className="absolute top-3 left-2 text-gray-400" />
        </div>
        <FiBell className="text-gray-400 text-lg cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
