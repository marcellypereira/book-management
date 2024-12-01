import React, { useState } from "react";
import { useUsers } from "../hooks/useUser";
import { FiEdit2, FiTrash } from "react-icons/fi";
import DeleteModal from "../pages/user/deleteUser";
import PaginatedList from "../components/paginatedList";
import { useNavigate } from "react-router-dom";

const UserList: React.FC = () => {
  const { users, deleteUser } = useUsers();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const openModal = (userId: string) => {
    setSelectedUserId(userId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedUserId !== null) {
      deleteUser.mutate(selectedUserId, {
        onSuccess: () => {
          console.log(`Usuário com ID ${selectedUserId} foi excluído.`);
          closeModal();
        },
        onError: () => {
          console.error("Erro ao excluir o usuário.");
        },
      });
    }
  };

  if (users.isLoading) return <p>Carregando...</p>;
  if (users.isError) return <p>Erro ao carregar os usuários.</p>;

  return (
    <div className="grid gap-4">
      <div className="border-t border-gray-300 mb-2 mt-5"></div>

      <div className="grid lg:grid-cols-[6rem_3fr_2fr_2fr_auto] md:grid-cols-[6rem_3fr_2fr_2fr_auto] grid-cols-[4rem_4fr_4fr_4fr_auto]   items-center text-gray-400 text-sm lg:px-4 md:px-4 px-2mb-2 gap-4">
        <span className="font-medium text-center">Nome</span>
        <span className="font-medium text-center">Email</span>
        <span className="font-medium text-center">Posição</span>
        <span className="font-medium text-center">Data de Cadastro</span>
        <span className="font-medium text-center">Ações</span>
      </div>

      <PaginatedList
        items={users.data || []}
        itemsPerPage={10}
        renderItem={(user) => (
          <div
            key={user.id}
            className="grid lg:grid-cols-[6rem_3fr_2fr_2fr_auto] md:grid-cols-[6rem_3fr_2fr_2fr_auto] grid-cols-[4rem_4fr_4fr_4fr_auto] items-center bg-white shadow-md rounded-md p-4 gap-4"
          >
            <h2 className="text-sm text-gray-600 text-center truncate">
              {user.name}
            </h2>

            <p className="text-sm text-gray-600 text-center truncate">
              {user.email}
            </p>

            <p className="text-sm text-gray-600 text-center truncate">
              {user.position}
            </p>

            <p className="text-sm text-gray-600 text-center truncate">
              {user.createDate}
            </p>

            <div className="flex justify-center items-center space-x-4">
              <button
                className="text-[#6347F9] hover:text-[#5037d1] transition-all"
                onClick={() => navigate(`/edit-user/${user.id}`)}
              >
                <FiEdit2 size={18} />
              </button>
              <button
                className="text-[#6347F9] hover:text-[#5037d1] transition-all"
                onClick={() => user.id && openModal(String(user.id))}
              >
                <FiTrash size={18} />
              </button>
            </div>
          </div>
        )}
      />

      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default UserList;
