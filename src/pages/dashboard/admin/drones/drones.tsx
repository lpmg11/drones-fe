import NavBar from "@/components/ui/Navbar";
import { LinkType } from "@/types/LinkType";

const links: LinkType[] = [
  {
    id: "1",
    label: "Drones",
    url: "/dashboard/admin/drones",
    relativePath: "drones",
  },
  {
    id: "2",
    label: "Almacenes",
    url: "/dashboard/admin/warehouses",
    relativePath: "warehouses",
  },
  {
    id: "3",
    label: "Clientes",
    url: "/dashboard/admin/clients",
    relativePath: "clients",
  },
];

export const Drones: React.FC = () => {
  return (
    <div className="w-full flex flex-row">
      <NavBar links={links} />
    </div>
  );
};
