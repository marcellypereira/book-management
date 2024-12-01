import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "../../forms/bookForm";
import Sidebar from "../../components/sideBar";
import Header from "../../components/header";
import Title from "../../components/title";
import { useBooks } from "../../hooks/useBooks";
import { Book } from "../../types/types";
import Toast from "../../components/toast";

const AddBook: React.FC = () => {
  const { addBook, updateBook } = useBooks();
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleCreateOrUpdate = (book: Book) => {
    if (book.id) {
      updateBook.mutate(book, {
        onSuccess: () => {
          setToast({
            message: "Livro atualizado com sucesso!",
            type: "success",
          });
          setSelectedBook(undefined);
        },
        onError: () =>
          setToast({ message: "Erro ao atualizar o livro.", type: "error" }),
      });
    } else {
      addBook.mutate(book, {
        onSuccess: () => {
          setToast({
            message: "Livro adicionado com sucesso!",
            type: "success",
          });
          setTimeout(() => {
            navigate("/books", {
              state: {
                toast: {
                  message: "Livro adicionado com sucesso!",
                  type: "success",
                },
              },
            });
          }, 500);
        },
        onError: () =>
          setToast({ message: "Erro ao adicionar o livro.", type: "error" }),
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col">
        <Header />
        <div className="flex-1 flex items-start justify-center p-4 overflow-y-auto pt-12">
          <div className="p-6 sm:p-8 w-full max-w-xl md:max-w-3xl lg:max-w-5xl 
            bg-transparent shadow-none 
            md:bg-white md:shadow-md rounded-lg">
            <Title text="Adicionar Livro" />
            <div className="mt-4 sm:mt-6">
              <BookForm
                initialData={selectedBook}
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

export default AddBook;