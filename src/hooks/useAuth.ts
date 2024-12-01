import { useState } from "react";
import * as Yup from "yup";
import { LoginFormData, User } from "../types/types";

const BASE_URL = process.env.REACT_APP_API_URL;

const useAuth = () => {
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);

  const predefinedEmail = "admin@gmail.com";
  const predefinedPassword = "Admin123#";

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("E-mail inválido").required("O e-mail é obrigatório"),
    password: Yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").required("A senha é obrigatória"),
  });

  const handleFocus = () => {
    setErrors({});
  };

  const login = async (credentials: LoginFormData) => {
    setErrors({});
    setSuccess(null);

    try {
      await loginSchema.validate(credentials, { abortEarly: false });

      if (credentials.email === predefinedEmail && credentials.password === predefinedPassword) {
        setIsAuthenticated(true);
        setSuccess("Login bem-sucedido!");
        return { position: "admin" };
      }

      const users = await fetch(`${BASE_URL}/users`)
        .then((res) => res.json())
        .catch((err) => {
          console.error("Erro ao buscar usuários:", err);
          setErrors({ email: "Falha ao fazer login", password: "Falha ao fazer login" });
          return [];
        });

      const user = users.find((u: User) => u.email === credentials.email && u.password === credentials.password);

      if (user) {
        setIsAuthenticated(true);
        setSuccess("Login bem-sucedido!");
        return user;
      } else {
        setErrors({ email: "Falha ao fazer login", password: "Falha ao fazer login" });
      }

    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error: any) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        setErrors({ email: "Falha ao fazer login", password: "Falha ao fazer login" });
      }
    }
  };

  return { isAuthenticated, login, errors, success, handleFocus };
};

export default useAuth;
