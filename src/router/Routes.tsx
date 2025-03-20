import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { AuthRoutes } from "./AuthRoutes";
import { DashboardRoutes } from "./DashboardRoutes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Outlet />}>
          <Route path="/*" element={<AuthRoutes />} />
        </Route>
        <Route element={<Outlet />}>
          <Route path="dashboard/*" element={<DashboardRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
