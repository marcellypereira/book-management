import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

interface BookCardProps {
  title: string;
  author: string;
  imageUrl: string;
  summary: string;
  publicationDate: number;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  imageUrl,
  summary,
  publicationDate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <div className="w-80 bg-white rounded-lg shadow-2xl overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <p className="text-sm text-gray-500">{author}</p>
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-[#6347F9] text-white text-sm rounded-md hover:bg-[#5238e5]"
            onClick={handleOpenModal}
          >
            Ver mais
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-4xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white bg-[#6347F9] rounded-full p-2 hover:bg-[#5238e5] transition"
            >
              <FiX size={24} />
            </button>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 flex justify-center">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full max-w-md h-full object-cover rounded-md shadow-lg"
                />
              </div>

              <div className="flex-1 flex flex-col mt-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {title}
                </h2>
                <p className="text-lg text-gray-700 mb-2">
                  <strong>Autor:</strong> {author}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                  <strong>Ano de Publicação:</strong> {publicationDate}
                </p>
                <p className="text-gray-700 text-justify text-md mb-4">
                  <strong>Resumo:</strong> {summary}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;