import Sidebar from "@/components/ui/SideBar";
import { Outlet } from "react-router";

export const DashboardLayout: React.FC = () => {
  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full p-4">
        <Outlet />
      </div>
    </div>
  );
};
