export type LoginFormData = {
  email: string;
  password: string;
};

export type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}
export interface Book {
  id?: string | number;
  title: string;
  coverImage: string;
  publicationDate: number;
  author: string;
  summary: string;
}
export interface User {
  id?: string | number;
  name: string;
  email: string;
  createDate: string;
  position: string;
  password: string;
  confirmPassword: string;
}
