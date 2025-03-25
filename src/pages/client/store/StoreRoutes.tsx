import { Route, Routes } from "react-router";
import { StoreLayout } from "./layouts/StoreLayout";
import { OrderPage } from "./OrdersPage";
import { Store } from "./Store";

export default function StoreRoutes() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route element={<Store />} index />
        <Route element={<OrderPage />} path="order" />
      </Route>
    </Routes>
  );
}
