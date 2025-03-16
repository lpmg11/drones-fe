import { Outlet } from "react-router";

function App() {
  return (
    <div className="dark:bg-primary-dark bg-blue-50  w-fit">
      <h1 className="text-3xl text-primary-text dark:text-on-secondary-text font-semibold">
        App de drones
      </h1>

      <Outlet />
    </div>
  );
}

export default App;
