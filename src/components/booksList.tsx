import React, { useState } from "react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { useBooks } from "../hooks/useBooks";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../pages/book/deleteBook";
import PaginatedList from "../components/paginatedList";

const BookList: React.FC = () => {
  const { books, deleteBook } = useBooks();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const openModal = (bookId: string) => {
    setSelectedBookId(bookId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBookId(null);
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedBookId !== null) {
      deleteBook.mutate(selectedBookId, {
        onSuccess: () => {
          console.log(`Livro com ID ${selectedBookId} foi excluído.`);
          closeModal();
        },
        onError: () => {
          console.error("Erro ao excluir o livro.");
        },
      });
    }
  };

  if (books.isLoading) {
    return <p>Carregando...</p>;
  }

  if (books.isError) {
    return <p>Erro ao carregar os livros.</p>;
  }

  const sortedUsers = books.data ? [...books.data].reverse() : [];

  return (
    <div className="grid gap-4">
      <div className="border-t border-gray-300 mb-2 mt-5"></div>
  
      <div className="hidden sm:grid grid-cols-[6rem,2.5fr,1fr,1fr,6rem] gap-x-8 gap-y-4 text-gray-400 text-sm px-4">
        <span className="font-medium text-left">Capa</span>
        <span className="font-medium text-left">Nome</span>
        <span className="font-medium text-center">Autor</span>
        <span className="font-medium text-left">Data</span>
        <span className="font-medium text-end">Ações</span>
      </div>
  
      <PaginatedList
        items={sortedUsers}
        itemsPerPage={5}
        renderItem={(book) => (
          <div
            key={book.id}
            className="grid sm:grid-cols-[6rem,2.5fr,1fr,1fr,6rem] gap-x-8 gap-y-4 items-center px-4 py-2 bg-white rounded-md shadow-md sm:text-left text-center"
          >
            <div className="w-full h-24 sm:h-28 mx-auto sm:mx-0">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
  
            <h2 className="text-md font-semibold text-gray-900 truncate">
              {book.title}
            </h2>
  
            <p className="text-sm text-gray-500 truncate text-center">{book.author}</p>
  
            <p className="text-sm text-gray-500 truncate">{book.publicationDate}</p>
            <div className="flex lg:justify-end md:justify-end justify-end space-x-4">
              <button
                className="text-[#6347F9] hover:text-[#5037d1] transition-all"
                onClick={() => navigate(`/edit-book/${book.id}`)}
              >
                <FiEdit2 size={20} />
              </button>
              <button
                className="text-[#6347F9] hover:text-[#5037d1] transition-all"
                onClick={() => book.id && openModal(String(book.id))}
              >
                <FiTrash size={20} />
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

export default BookList;