import { Login } from "@/pages/auth/LoginPage";
import { Register } from "@/pages/auth/RegisterPage";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} index />
        <Route element={<Register />} path="register" />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
