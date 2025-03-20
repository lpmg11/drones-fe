import { Route, Routes } from "react-router";
import { Drones } from "./drones";

export default function DronesRoutes() {
  return (
    <Routes>
      <Route element={<Drones />} index />
      <Route element={<Drones />} path="models" />
    </Routes>
  );
}
