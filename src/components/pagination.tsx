import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-6">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="p-2 bg-[#6347F9] rounded-full hover:bg-[#5037d1] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
      >
        <FiChevronLeft size={20} className="text-white" />
      </button>

      <span>
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-2 bg-[#6347F9] rounded-full hover:bg-[#5037d1] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
      >
        <FiChevronRight size={20} className="text-white" />
      </button>
    </div>
  );
};

export default Pagination;
