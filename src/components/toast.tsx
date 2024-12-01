import React, { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error";
  duration?: number;
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 2000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 px-6 py-4 rounded shadow-lg w-80 max-w-full 
      ${type === "success" ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"} 
      border-l-4 text-black transition-all duration-300 animate-fade-in`}
    >
      <div className="text-sm font-bold">{message}</div>
      <div
        className={`h-1 mt-2 rounded-full ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
        style={{ animation: `progress-bar ${duration}ms linear` }}
      ></div>
    </div>
  );
};

export default Toast;
