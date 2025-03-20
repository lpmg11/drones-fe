import { DashboardLayout } from "@/layouts/dashboard";
import { Dashboard } from "@/pages/dashboard";
import DronesRoutes from "@/pages/dashboard/admin/drones/DronesRoutes";
import WarehousesRoutes from "@/pages/dashboard/admin/warehouses/WarehouseRoutes";
import { Route, Routes } from "react-router";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route element={<Dashboard />} index />
        <Route element={<DronesRoutes />} path="drones/*" />
        <Route element={<WarehousesRoutes />} path="warehouses/*" />
        <Route element={<div>Clientes</div>} path="clients" />
      </Route>
    </Routes>
  );
};
