import { Login } from "@/pages/auth/LoginPage";
import { Register } from "@/pages/auth/RegisterPage";
import { Route, Routes } from "react-router";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<Login />} index />
      <Route element={<Register />} path="register" />
    </Routes>
  );
};
