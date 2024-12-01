export const useSession = () => {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/signin"; 
  };

  return { logout };
};