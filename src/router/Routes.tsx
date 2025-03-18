import { BrowserRouter, Outlet, Route } from "react-router";
import App from "../App";

export const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Route element={<App />}>
        <Route element={<Outlet />} />
      </Route>
    </BrowserRouter>
  );
};
