import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./pages/login/signUp";
import SignIn from "./pages/login/signIn";
import Home from "./pages/home";
import AddBook from "./pages/book/addBook";
import User from "./pages/user/userList";
import EditBook from "./pages/book/editBook";
import AddUser from "./pages/user/addUser"
import EditUser from "./pages/user/editUser";
import ListForUsers from "./pages/listForUsers";

const queryClient = new QueryClient(); 
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/user" element={<User />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="listforusers" element={<ListForUsers />} />
          </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
