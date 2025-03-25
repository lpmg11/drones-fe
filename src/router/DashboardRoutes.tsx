import { DashboardLayout } from "@/layouts/dashboard";
import { Budget } from "@/pages/client/budget/Budget";
import StoreRoutes from "@/pages/client/store/StoreRoutes";
import { Dashboard } from "@/pages/dashboard";
import { Transactions } from "@/pages/dashboard/admin/clients/budget/Transactions";
import DronesRoutes from "@/pages/dashboard/admin/drones/DronesRoutes";
import WarehousesRoutes from "@/pages/dashboard/admin/warehouses/WarehouseRoutes";
import { Products } from "@/pages/dashboard/provider/products/Products";
import Profile from "@/pages/dashboard/provider/profile/Profile";
import { Route, Routes } from "react-router";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route element={<Dashboard />} index />
        <Route element={<DronesRoutes />} path="drones/*" />
        <Route element={<WarehousesRoutes />} path="warehouses/*" />
        <Route element={<Profile />} path="profile" />
        <Route element={<Products />} path="products" />
        <Route element={<Transactions/>} path="clients" />
        <Route element={<StoreRoutes />} path="store/*" />
        <Route element={<div>Envios</div>} path="shipment" />
        <Route element={<Budget />} path="wallet" />
        <Route element={<div>Configuración</div>} path="settings" />
        <Route
          element={<div>Configuración de administrador</div>}
          path="admin/settings"
        />
        <Route
          element={<div>Configuración de proveedor</div>}
          path="provider/wallet"
        />
      </Route>
    </Routes>
  );
};
