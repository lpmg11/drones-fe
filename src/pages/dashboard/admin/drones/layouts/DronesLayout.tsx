import NavBar from "@/components/ui/Navbar";
import { LinkType } from "@/types/LinkType";
import { Outlet } from "react-router";

const links: LinkType[] = [
  {
    id: "1",
    label: "Drones",
    url: "/dashboard/drones",
    relativePath: "drones",
  },
  {
    id: "2",
    label: "Modelo de Drones",
    url: "/dashboard/drones/models",
    relativePath: "models",
  },
];


export const DronesLayout: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <NavBar links={links} />
      <Outlet />
    </div>
  );
};