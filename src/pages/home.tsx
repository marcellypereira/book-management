import React from "react";
import { FiPlus } from "react-icons/fi";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Title from "../components/title";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-64 bg-gray-100">
        <Header />

        <div className="flex-1 bg-gray-100 p-4 md:p-14 lg:p-14">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-4 sm:space-y-0">
            <Title text="Lista de Livros" />
            <button
              onClick={() => navigate("/addbook")}
              className="flex items-center bg-[#6347F9] text-white px-4 py-2 rounded-md hover:bg-[#5037d1] transition-all"
            >
              <FiPlus className="mr-1" />
              Novo Livro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
