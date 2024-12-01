import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookForm from "../../forms/bookForm";
import Sidebar from "../../components/sideBar";
import Header from "../../components/header";
import Title from "../../components/title";
import { useBooks } from "../../hooks/useBooks";
import { Book } from "../../types/types";
import Toast from "../../components/toast";

const EditBook: React.FC = () => {
  const { updateBook, books } = useBooks();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (books?.data) {
      const bookToEdit = books.data.find(
        (book) => String(book.id) === String(id)
      );
      if (bookToEdit) {
        setSelectedBook(bookToEdit);
      } else {
        setToast({ message: "Livro não encontrado.", type: "error" });
        navigate("/books");
      }
    }
  }, [books, id, navigate]);

  const handleUpdateBook = (book: Book) => {
    if (book.id) {
      updateBook.mutate(book, {
        onSuccess: () => {
          setToast({ message: "Livro editado com sucesso!", type: "success" });
          setTimeout(() => {
            navigate("/books", {
              state: {
                toast: {
                  message: "Livro editado com sucesso!",
                  type: "success",
                },
              },
            });
          }, 500);
        },
        onError: () =>
          setToast({ message: "Erro ao editar o livro.", type: "error" }),
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
            <Title text="Editar Livro" />
            <div className="mt-4 sm:mt-6">
              {selectedBook ? (
                <BookForm
                  initialData={selectedBook}
                  onSubmit={handleUpdateBook}
                />
              ) : (
                <p className="text-gray-500">Carregando dados do livro...</p>
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

export default EditBook;
