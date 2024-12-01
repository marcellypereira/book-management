import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../../forms/userForm";
import Sidebar from "../../components/sideBar";
import Header from "../../components/header";
import Title from "../../components/title";
import { useUsers } from "../../hooks/useUser";
import { User } from "../../types/types";
import Toast from "../../components/toast";

const EditUser: React.FC = () => {
  const { updateUser, users } = useUsers();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (users?.data) {
      const userToEdit = users.data.find(
        (user) => String(user.id) === String(id)
      );
      if (userToEdit) {
        setSelectedUser(userToEdit);
      } else {
        setToast({ message: "Usuário não encontrado.", type: "error" });
        navigate("/books");
      }
    }
  }, [users, id, navigate]);

  const handleUpdateUser = (user: User) => {
    if (user.id) {
      updateUser.mutate(user, {
        onSuccess: () => {
          setToast({ message: "Usuário editado com sucesso!", type: "success" });
          setTimeout(() => {
            navigate("/user", {
              state: {
                toast: {
                  message: "Usuário editado com sucesso!",
                  type: "success",
                },
              },
            });
          }, 500);
        },
        onError: () =>
          setToast({ message: "Erro ao editar o usuário.", type: "error" }),
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col">
        <Header />
  
        <div className="flex-1 flex items-start md:items-center justify-center p-4 overflow-y-auto">
          <div className="p-4 sm:p-8 w-full max-w-xl md:max-w-3xl lg:max-w-5xl
            bg-transparent shadow-none
            md:bg-white md:shadow-md rounded-lg">
            <Title text="Editar Usuário" />
            <div className="mt-4 sm:mt-6">
              {selectedUser ? (
                <UserForm
                  initialData={selectedUser}
                  onSubmit={handleUpdateUser}
                />
              ) : (
                <p className="text-gray-500">Carregando dados do usuário...</p>
              )}
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

export default EditUser;
