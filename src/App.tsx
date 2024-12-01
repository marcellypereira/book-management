import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./pages/login/signUp";
import SignIn from "./pages/login/signIn";
import Books from "./pages/books";
import AddBook from "./pages/book/addBook";
import User from "./pages/user/userList";
import EditBook from "./pages/book/editBook";
import AddUser from "./pages/user/addUser";
import EditUser from "./pages/user/editUser";
import ListForUsers from "./pages/listForUsers";
import ProtectedRoute from "./components/protectedRoutes";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addbook"
            element={
              <ProtectedRoute>
                <AddBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addUser"
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-book/:id"
            element={
              <ProtectedRoute>
                <EditBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-user/:id"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/listforusers"
            element={
              <ProtectedRoute>
                <ListForUsers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
