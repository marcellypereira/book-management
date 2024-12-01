import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Book } from "../types/types";

const BASE_URL = process.env.REACT_APP_API_URL ;

export const useBooks = () => {
  const queryClient = useQueryClient();

  const fetchBooks = async (): Promise<Book[]> => {
    const response = await fetch(`${BASE_URL}/books`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar livros: ${response.statusText}`);
    }
    return response.json();
  };

  const addBook = async (book: Book): Promise<void> => {
    const response = await fetch(`${BASE_URL}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw new Error(`Erro ao adicionar livro: ${response.statusText}`);
    }
  };

  const updateBook = async (book: Book): Promise<void> => {
    const response = await fetch(`${BASE_URL}/books/${book.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw new Error(`Erro ao atualizar livro: ${response.statusText}`);
    }
  };

  const deleteBook = async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/books/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erro ao excluir livro: ${response.statusText}`);
    }
  };

  return {
    books: useQuery({
      queryKey: ["books"],
      queryFn: fetchBooks,
    }),
    addBook: useMutation({
      mutationFn: addBook,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["books"] });
      },
    }),
    updateBook: useMutation({
      mutationFn: updateBook,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["books"] });
      },
    }),
    deleteBook: useMutation({
      mutationFn: deleteBook,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["books"] });
      },
    }),
  };
};
