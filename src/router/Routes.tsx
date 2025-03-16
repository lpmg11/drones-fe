import { Outlet, Route } from "react-router";
import App from "../App";

export const PublicRoutes = () => {
  return (
    <Route
        element={<Outlet />}
        path="home"
    >
      <Route
          element={<App />}
          index
      />

      <Route
          element={<App />}
          path="shipment"
      />
    </Route>
  );
};
