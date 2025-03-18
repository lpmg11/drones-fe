import { DashboardLayout } from "@/layouts/dashboard";
import { Login } from "@/pages/auth/LoginPage";
import { Register } from "@/pages/auth/RegisterPage";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Dashboard } from "./pages/dashboard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} index />
        <Route element={<Register />} path="register" />
        <Route element={<DashboardLayout />} path="dashboard">
          <Route element={<Dashboard />} index />
          <Route element={<div>clients</div>} path="clients" />
        </Route>
        <Route element={<div>404</div>} path="*" />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
