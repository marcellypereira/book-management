import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Book } from "../types/types";

const currentYear = new Date().getFullYear();

const schema = yup.object().shape({
  title: yup.string().required("O título é obrigatório"),
  coverImage: yup
    .string()
    .url("URL inválida")
    .required("A URL da capa é obrigatória"),
  publicationDate: yup
    .number()
    .typeError("O ano de publicação deve ser numérico")
    .required("O ano de publicação é obrigatório")
    .min(1500, "O ano deve ser maior que 1500")
    .max(currentYear, `O ano deve ser no máximo ${currentYear}`),
  author: yup.string().required("O autor é obrigatório"),
  summary: yup.string().required("O resumo é obrigatório"),
});

interface BookFormProps {
  initialData?: Book;
  onSubmit: (data: Book) => void;
}

const BookForm: React.FC<BookFormProps> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Book>({
    defaultValues: initialData,
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const submitHandler = (data: Book) => {
    console.log("Dados do formulário enviados:", data);
    onSubmit(data);
    reset();
    console.log("Formulário redefinido após o envio");
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome do Livro
        </label>
        <input
          {...register("title")}
          placeholder="Digite o nome do livro"
          className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6347F9]"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Autor
          </label>
          <input
            {...register("author")}
            placeholder="Digite o nome do autor"
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6347F9]"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">
              {errors.author.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ano de Publicação
          </label>
          <input
            {...register("publicationDate")}
            type="number"
            placeholder="Ex.: 2023"
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6347F9]"
          />
          {errors.publicationDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.publicationDate.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL da Capa
        </label>
        <input
          {...register("coverImage")}
          placeholder="Insira o link da imagem de capa"
          className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6347F9]"
        />
        {errors.coverImage && (
          <p className="text-red-500 text-sm mt-1">
            {errors.coverImage.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Resumo
        </label>
        <textarea
          {...register("summary")}
          placeholder="Digite um breve resumo"
          className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6347F9]"
          rows={4}
        />
        {errors.summary && (
          <p className="text-red-500 text-sm mt-1">{errors.summary.message}</p>
        )}
      </div>

      <div className="flex justify-between pt-10">
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="hover:text-gray-700"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-[#6347F9] text-white px-6 py-2 rounded-md hover:bg-[#5037d1] transition-all"
          onClick={() => navigate("/home")}
        >
          Publicar
        </button>
      </div>
    </form>
  );
};

export default BookForm;
