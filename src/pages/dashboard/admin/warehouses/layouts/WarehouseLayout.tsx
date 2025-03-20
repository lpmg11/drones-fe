import NavBar from "@/components/ui/Navbar";
import { LinkType } from "@/types/LinkType";
import { Outlet } from "react-router";

const links: LinkType[] = [
  {
    id: "1",
    label: "Bodegas",
    url: "/dashboard/warehouses",
    relativePath: "warehouses",
  },
  {
    id: "2",
    label: "Nueva Bodega",
    url: "/dashboard/warehouses/NewWarehouse",
    relativePath: "newWarehouse",
  },
];

export const WarehousesLayout: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <NavBar links={links} />
      <Outlet />
    </div>
  );
};
