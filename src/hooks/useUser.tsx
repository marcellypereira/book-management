import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../types/types";

const BASE_URL = process.env.REACT_APP_API_URL;

export const useUsers = () => {
  const queryClient = useQueryClient();

  const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar usuários: ${response.statusText}`);
    }
    return response.json();
  };

  const addUser = async (user: User): Promise<void> => {
    const existingUsers = await fetchUsers();
    const emailExists = existingUsers.some((u) => u.email === user.email);
    if (emailExists) {
      throw new Error("O e-mail informado já está cadastrado.");
    }
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error(`Erro ao adicionar usuário: ${response.statusText}`);
    }
  };

  const updateUser = async (user: User): Promise<void> => {
    const response = await fetch(`${BASE_URL}/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error(`Erro ao atualizar usuário: ${response.statusText}`);
    }
  };

  const deleteUser = async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erro ao excluir usuário: ${response.statusText}`);
    }
  };

  return {
    users: useQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
    }),
    addUser: useMutation({
      mutationFn: addUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    }),
    updateUser: useMutation({
      mutationFn: updateUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    }),
    deleteUser: useMutation({
      mutationFn: deleteUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    }),
  };
};
