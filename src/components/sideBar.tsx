import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiBook, FiUsers, FiLogOut, FiX, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";

interface NavItem {
  label: string;
  icon: JSX.Element;
  to: string;
}

const navItems: NavItem[] = [
  { label: "Livros", icon: <FiBook />, to: "/books" },
  { label: "Usuários", icon: <FiUsers />, to: "/user" },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useSession();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#6347F9] text-white p-3 rounded-full shadow-lg"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      <div
        className={`fixed top-0 left-0 h-screen bg-[#E8EAF6] text-black flex flex-col z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 w-64 ${
          isOpen ? "md:w-64 w-full" : ""
        }`}
      >
        <div
          className={`p-6 text-left flex items-center space-x-2 ${
            isOpen && "mt-10"
          }`}
        >
          <div className="w-1 h-12 bg-[#6347F9]"></div>
          <h1 className="text-2xl font-bold text-black">
            Gerenciamento <br /> de livros
          </h1>
        </div>

        <nav className="flex flex-col space-y-2 px-6">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md ${
                  isActive
                    ? "bg-[#6347F9] text-white"
                    : "text-gray-800 hover:bg-[#D8DDF6]"
                }`
              }
            >
              <span className="mr-4 text-xl">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-6 pb-4" onClick={logout}>
          <button
            className="flex items-center px-4 py-2 w-full rounded-md text-gray-800 hover:bg-[#D8DDF6]"
            onClick={() => navigate("/signin")}
          >
            <FiLogOut className="mr-4 text-xl" />
            Sair
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
