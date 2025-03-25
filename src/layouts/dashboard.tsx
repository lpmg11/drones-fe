import Sidebar from "@/components/ui/SideBar";
import { Outlet } from "react-router";

export const DashboardLayout: React.FC = () => {
  return (
    <div className="w-full flex flex-row">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full p-4 scroll-auto">
        <Outlet />
      </div>
    </div>
  );
};
