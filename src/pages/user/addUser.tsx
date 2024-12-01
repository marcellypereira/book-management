import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sideBar";
import Header from "../../components/header";
import Title from "../../components/title";
import { User } from "../../types/types";
import Toast from "../../components/toast";
import { useUsers } from "../../hooks/useUser";
import UserForm from "../../forms/userForm";

const AddUser: React.FC = () => {
  const { addUser, updateUser } = useUsers();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleCreateOrUpdate = (user: User) => {
    if (user.id) {
      updateUser.mutate(user, {
        onSuccess: () => {
          setToast({
            message: "Usuário atualizado com sucesso!",
            type: "success",
          });
          setSelectedUser(undefined);
        },
        onError: () =>
          setToast({ message: "Erro ao atualizar o usuário.", type: "error" }),
      });
    } else {
      addUser.mutate(user, {
        onSuccess: () => {
          setToast({
            message: "Usuário adicionado com sucesso!",
            type: "success",
          });
          setTimeout(() => {
            navigate("/user", {
              state: {
                toast: {
                  message: "Usuário adicionado com sucesso!",
                  type: "success",
                },
              },
            });
          }, 500);
        },
        onError: () =>
          setToast({ message: "Erro ao adicionar o usuário.", type: "error" }),
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col">
        <Header />
        <div className="flex-1 flex items-start md:items-center justify-center p-4 overflow-y-auto">
          <div className="p-6 sm:p-8 w-full max-w-xl md:max-w-3xl lg:max-w-5xl 
            bg-transparent shadow-none 
            md:bg-white md:shadow-md rounded-lg">
            <Title text="Adicionar Usuário" />
            <div className="mt-4 sm:mt-6">
              <UserForm
                initialData={selectedUser}
                onSubmit={handleCreateOrUpdate}
              />
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AddUser;