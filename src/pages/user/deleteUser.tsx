import React from "react";
import { FiX } from "react-icons/fi";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-[90%] max-w-sm sm:max-w-lg relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-[#6347F9] rounded-full p-2 hover:bg-[#5238e5] transition"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 text-center mt-10 mb-4">
          Tem certeza que deseja excluir este usuário?
        </h2>

        <p className="text-gray-600 text-sm text-center mb-6">
          Esta ação não poderá ser desfeita.
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            className="text-gray-700 hover:text-gray-900 transition"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-[#6347F9] text-white rounded hover:bg-[#5037d1] transition"
            onClick={onConfirm}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
