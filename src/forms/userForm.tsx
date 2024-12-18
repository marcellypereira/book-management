import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUser";
import Toast from "../components/toast";

interface UserFormProps {
  initialData?: User;
  onSubmit: (data: User) => void;
}

const schema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  email: yup.string().email("Email inválido").required("O email é obrigatório"),
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
  const { users } = useUsers();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: initialData,
    resolver: yupResolver(schema),
  });

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const submitHandler = (data: User) => {
    const existingUser = users.data?.find((user) => user.email === data.email);
    
    if (existingUser) {
      setToast({ message: "O e-mail informado já está cadastrado.", type: "error" });
      return;
    }

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
          <p className="text-[#dc143c] font-bold text-sm mt-1">
            {errors.name.message}
          </p>
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
            <option value="Administrador">Administrador</option>
            <option value="Usuário">Usuário</option>
          </select>
          {errors.position && (
            <p className="text-[#dc143c] font-bold text-sm mt-1">
              {errors.position.message}
            </p>
          )}
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
            <p className="text-[#dc143c] font-bold text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
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
            <p className="text-[#dc143c] font-bold text-sm mt-1">
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
            <p className="text-[#dc143c] font-bold text-sm mt-1">
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
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </form>
    
  );
};

export default UserForm;
