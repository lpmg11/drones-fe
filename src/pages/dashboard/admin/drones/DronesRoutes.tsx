import { Route, Routes } from "react-router";
import { DroneModels } from "./DroneModels";
import { Drones } from "./Drones";
import { DronesLayout } from "./layouts/DronesLayout";

export default function DronesRoutes() {
  return (
    <Routes>
      <Route element={<DronesLayout />}>
        <Route element={<Drones />} index />
        <Route element={<DroneModels />} path="models" />
      </Route>
    </Routes>
  );
}
