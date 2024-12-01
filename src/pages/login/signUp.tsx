import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignUpFormData } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Toast from "../../components/toast";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .required("Senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .required("Confirmar senha é obrigatório"),
  terms: yup
    .boolean()
    .oneOf([true], "Você deve aceitar os termos e condições.")
    .required("Aceitar os termos é obrigatório"),
});

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      if (type === "success") {
        navigate("/signin");
      }
    }, 2000);
  };

  const onSubmit = async (data: SignUpFormData) => {
    const newUser = {
      id: Math.random().toString(36).substr(2, 4),
      name: data.name,
      email: data.email,
      password: data.password,
      position: "user",
      createDate: new Date().toISOString().split("T")[0],
    };

    try {
      const usersResponse = await fetch("http://localhost:3001/users");
      const users = await usersResponse.json();

      const userExists = users.some(
        (user: { email: string }) => user.email === data.email
      );

      if (userExists) {
        const user = users.find(
          (user: { email: string }) => user.email === data.email
        );
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          showToastMessage("Login bem-sucedido!", "success");
        }
      } else {
        const response = await fetch("http://localhost:3001/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(newUser));
          showToastMessage("Cadastro realizado com sucesso!", "success");
        } else {
          throw new Error("Erro ao criar usuário.");
        }
      }
    } catch (error) {
      console.error("Erro:", error);
      showToastMessage("Erro ao tentar cadastrar/login usuário.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E8EAF6]">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] max-w-6xl h-[730px] bg-white rounded-lg shadow-lg p-6 relative">
        <div className="flex flex-col justify-center items-center p-8 z-10">
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            Crie sua conta
          </h2>
          <p className="text-center text-gray-500 mb-4">
            Experimente gratuitamente por 30 dias
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 w-full max-w-sm"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                placeholder="Nome"
                className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-[#6347F9]"
                {...control.register("name")}
              />
              {errors.name && (
                <p className="text-[#dc143c] text-xs mt-2 font-bold">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-[#6347F9]"
                {...control.register("email")}
              />
              {errors.email && (
                <p className="text-[#dc143c] text-xs mt-2 font-bold">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Senha"
                  className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-[#6347F9]"
                  {...control.register("password")}
                />
                <div
                  className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <FiEye size={20} color="#6347F9" />
                  ) : (
                    <FiEyeOff size={20} color="#6347F9" />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-[#dc143c] text-xs mt-2 font-bold">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Confirmar Senha
              </label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirmar Senha"
                  className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-[#6347F9]"
                  {...control.register("confirmPassword")}
                />
                <div
                  className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  {confirmPasswordVisible ? (
                    <FiEye size={20} color="#6347F9" />
                  ) : (
                    <FiEyeOff size={20} color="#6347F9" />
                  )}
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-[#dc143c] text-xs mt-2 font-bold">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="mb-4 flex w-full items-start gap-1.5">
              <input
                type="checkbox"
                id="terms-checkbox"
                className="h-4 w-4 accent-[#6347F9]"
                {...control.register("terms")}
              />
              <label className="text-xs">
                Ao criar, eu concordo com os termos e condições, política de
                privacidade e política de cookies.
              </label>
            </div>
            {errors.terms && (
              <p className="text-[#dc143c] text-xs mt-2 font-bold">
                {errors.terms.message}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-[#6347F9] text-white py-2 rounded-md mt-4 hover:bg-[#5238e5] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Criar Conta
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <button
                className="text-[#6347F9]"
                onClick={() => navigate("/signin")}
              >
                Entrar
              </button>
            </span>
          </div>
        </div>

        <div className="relative hidden md:block group">
          <img
            src="https://images.pexels.com/photos/2067569/pexels-photo-2067569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Ilustração de Cadastro"
            className="object-cover w-[350px] h-[653px] rounded-lg transition-all duration-300 group-hover:brightness-75"
            style={{
              borderTopRightRadius: "50px",
              borderBottomLeftRadius: "25px",
              borderBottomRightRadius: "50px",
              borderTopLeftRadius: "25px",
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-950/100 to-transparent rounded-lg"
            style={{
              borderTopRightRadius: "50px",
              borderBottomLeftRadius: "25px",
              borderBottomRightRadius: "50px",
              borderTopLeftRadius: "25px",
            }}
          />
          <div className="">
            <h2 className="max-w-[280px] absolute bottom-8 left-6 text-white text-4xl opacity-90 font-bold">
              Sua jornada começa aqui.
            </h2>
          </div>

          <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="rotate-45 text-6xl text-[#E8EAF6] opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default SignUp;
