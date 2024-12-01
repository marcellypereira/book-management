import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "../types/types";
import { useNavigate } from "react-router-dom";

interface UserFormProps {
  initialData?: User;
  onSubmit: (data: User) => void;
}

const schema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  email: yup.string().email("Email inválido").required("O email é obrigatório"),
  createDate: yup.string().required("A data de criação é obrigatória"),
  position: yup.string().required("A posição é obrigatória"),
  password: yup
    .string()
    .required("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem coincidir")
    .required("Confirmação de senha é obrigatória"),
});

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: initialData,
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: User) => {
    console.log("Dados do formulário enviados:", data);
    onSubmit(data);
    reset();
    console.log("Formulário redefinido após o envio");
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome do Usuário
        </label>
        <input
          {...register("name")}
          placeholder="Digite o nome do usuário"
          className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6347F9]"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Posição
          </label>
          <select
            {...register("position")}
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6347F9]"
          >
            <option value="admin">Administrador</option>
            <option value="user">Usuário</option>
          </select>
          {errors.position && (
            <p className="text-red-500 text-sm mt-1">
              {errors.position.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data de criação
          </label>
          <input
            {...register("createDate")}
            type="number"
            placeholder="Ex.: 2023"
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6347F9]"
          />
          {errors.createDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.createDate.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          E-mail
        </label>
        <input
          {...register("email")}
          placeholder="Digite o e-mail"
          className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6347F9]"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="Digite a senha"
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6347F9]"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar Senha
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirme a senha"
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6347F9]"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-10">
        <button
          type="button"
          onClick={() => navigate("/user")}
          className="hover:text-gray-700"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-[#6347F9] text-white px-6 py-2 rounded-md hover:bg-[#5037d1] transition-all"
        >
          Criar
        </button>
      </div>
    </form>
  );
};

export default UserForm;
