import React from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import UserList from "../../components/useList";
import Sidebar from "../../components/sideBar";
import Header from "../../components/header";
import Title from "../../components/title";

const User: React.FC = () => {
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate("/addUser");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col">
        <Header />

        <div className="lg:p-14 md:p-14 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <Title text="Usuário" />
            <button
              onClick={handleAddUser}
              className="flex items-center bg-[#6347F9] text-white px-4 py-2 rounded-md hover:bg-[#5037d1] transition-all"
            >
              <FiPlus className="mr-1" />
              Novo Usuário
            </button>
          </div>
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default User;
