import { Route, Routes } from "react-router";
import { WarehousesLayout } from "./layouts/WarehouseLayout";
import { NewWarehouse } from "./NewWarehouse";
import { WarehousePage } from "./WarehousePage";
import { Warehouses } from "./Warehouses";

export default function WarehousesRoutes() {
  return (
    <Routes>
      <Route element={<WarehousesLayout />}>
        <Route element={<Warehouses />} index />
        <Route element={<NewWarehouse />} path="NewWarehouse" />
        <Route element={<WarehousePage />} path=":id" />
      </Route>
    </Routes>
  );
}
