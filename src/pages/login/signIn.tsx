import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Toast from "../../components/toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignIn = () => {
  const navigate = useNavigate();
  const { login, errors, success, handleFocus } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password }).then((user) => {
      if (user) {
        setToastType("success");
        setToastMessage("Login bem-sucedido!");
        setShowToast(true);
        setTimeout(() => {
          if (user.position === "admin") {
            navigate("/home");
          } else {
            navigate("/listforusers");
          }
        }, 2000);
      } else {
        setToastType("error");
        setToastMessage("Falha ao fazer login. Verifique suas credenciais.");
        setShowToast(true);
      }
    });
  };

  useEffect(() => {
    if (success) {
      setToastType("success");
      setToastMessage(success);
      setShowToast(true);
    } else if (errors.email || errors.password) {
      setToastType("error");
      setToastMessage("Erro ao tentar fazer login.");
      setShowToast(true);
    }
  }, [success, errors]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E8EAF6]">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] max-w-6xl h-[730px] bg-white rounded-lg shadow-lg p-6 relative">
        <div className="flex flex-col justify-center items-center p-8 z-10">
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            Entre na sua conta
          </h2>
          <p className="text-center text-gray-500 mb-4">
            Experimente gratuitamente por 30 dias
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                onFocus={handleFocus}
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-[#6347F9]"
              />
              {errors.email && (
                <p className="text-[#dc143c] text-xs mt-2 font-bold">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                onFocus={handleFocus}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600 pr-10"
              />
              <div
                className="absolute top-[30px] right-3 flex items-center cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <FiEye size={20} color="#6347F9" />
                ) : (
                  <FiEyeOff size={20} color="#6347F9" />
                )}
              </div>
              {errors.password && (
                <p className="text-[#dc143c] text-xs mt-2 font-bold">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#6347F9] text-white py-2 rounded-md mt-4 hover:bg-[#5238e5] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Entrar
            </button>
          </form>
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-[#6347F9] hover:underline"
              >
                Cadastre-se
              </button>
            </span>
          </div>
        </div>
        <div className="relative hidden md:block group">
          <img
            src="https://images.pexels.com/photos/2067569/pexels-photo-2067569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Ilustração de Login"
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
          ></div>

          <div className="">
            <h2 className="max-w-[280px] absolute bottom-8 left-6 text-white text-4xl opacity-90 font-bold">
              Procure um livro que te inspire.
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

export default SignIn;
