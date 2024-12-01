export const checkAuthentication = () => {
  const userString = localStorage.getItem("user");

  if (!userString) {
    window.location.href = "/signin";
    return;
  }

  const user = JSON.parse(userString);

  const { position } = user;
  const currentPath = window.location.pathname;

  const adminRoutes = ["/books", "/addbook", "/edit-book"];
  const userRoutes = ["/listforusers"];

  if (position === "admin" && !adminRoutes.includes(currentPath)) {
    window.location.href = "/books";
  } else if (position === "user" && !userRoutes.includes(currentPath)) {
    window.location.href = "/listforusers";
  }
};