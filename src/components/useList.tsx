import React, { useState } from "react";
import { useUsers } from "../hooks/useUser";
import { FiEdit2, FiTrash, FiSlash } from "react-icons/fi";
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

  const loggedInUserId = JSON.parse(localStorage.getItem("user") || "{}").id;

  if (users.isLoading) return <p>Carregando...</p>;
  if (users.isError) return <p>Erro ao carregar os usuários.</p>;

  const sortedUsers = users.data ? [...users.data].reverse() : [];

  return (
    <div className="grid gap-4">
      <div className="border-t border-gray-300 mb-2 mt-5"></div>

      <div className="grid lg:grid-cols-[0.5fr_0.5fr_0.5fr_0.5fr] md:grid-cols-[0.5fr_0.5fr_0.5fr_0.5fr] grid-cols-[0.5fr_0.5fr_0.5fr_0.5fr] items-center text-gray-400 text-sm mb-2 gap-4 px-4">
        <span className="font-medium text-start">Nome</span>
        <span className="font-medium text-start">Email</span>
        <span className="font-medium text-center">Posição</span>
        <span className="font-medium text-end">Ações</span>
      </div>

      <PaginatedList
        items={sortedUsers}
        itemsPerPage={10}
        renderItem={(user) => (
          <div
            key={user.id}
            className="grid lg:grid-cols-[0.5fr_0.5fr_0.5fr_0.5fr] md:grid-cols-[0.5fr_0.5fr_0.5fr_0.5fr] grid-cols-[0.5fr_0.5fr_0.5fr_0.5fr] items-center bg-white shadow-md rounded-md p-4 gap-4"
          >
            <h2 className="text-sm text-gray-600 text-start truncate">
              {user.name}
            </h2>

            <p className="text-sm text-gray-600 text-start truncate">
              {user.email}
            </p>

            <p className="text-sm text-gray-600 text-center truncate">
              {user.position}
            </p>

            <div className="flex justify-end items-end space-x-4">
              <button
                className="text-[#6347F9] hover:text-[#5037d1] transition-all"
                onClick={() => navigate(`/edit-user/${user.id}`)}
              >
                <FiEdit2 size={18} />
              </button>
              <button
                className="text-[#6347F9] hover:text-[#5037d1] transition-all"
                onClick={() => user.id && openModal(String(user.id))}
                disabled={user.id === loggedInUserId}
              >
                {user.id === loggedInUserId ? (
                  <FiSlash
                    size={18}
                    className="color-[#6347F9] hover:color-[#5037d1]"
                  />
                ) : (
                  <FiTrash size={18} />
                )}
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
