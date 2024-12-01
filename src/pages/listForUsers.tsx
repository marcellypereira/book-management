import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Title from "../components/title";
import BookCard from "../components/bookCard";
import { useBooks } from "../hooks/useBooks";
import { useSession } from "../hooks/useSession";

const ListForUsers: React.FC = () => {
  const { books } = useBooks();
  const navigate = useNavigate();
  const { logout } = useSession();

  if (books.isLoading) {
    return <div>Carregando...</div>;
  }

  if (books.isError) {
    return <div>Erro ao carregar livros: {books.error?.message}</div>;
  }

  return (
    <div className="p-8">
      <Title text="Gerenciamento de livros" />

      <div className="mt-auto px-6 pb-4" onClick={logout}>
        <button
          className="absolute top-8 right-8 flex items-center p-2 text-[#6347F9] hover:text-[#5238e5]"
          onClick={() => navigate("/signin")}
        >
          <FiLogOut className="mr-2 text-xl" />
          Sair
        </button>
      </div>

      <div className="mt-10">
        <h1 className="text-xl font-bold text-black">Lista de Livros</h1>
        <div className="border-t border-gray-300 mb-2 mt-5"></div>
      </div>

      <div className="mt-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 justify-items-center">
        {books.data?.map((book, index) => (
          <div key={index} className="max-w-xs">
            <BookCard
              title={book.title}
              author={book.author}
              imageUrl={book.coverImage}
              summary={book.summary}
              publicationDate={book.publicationDate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListForUsers;
