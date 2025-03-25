import NavBar from "@/components/ui/Navbar";
import { LinkType } from "@/types/LinkType";
import { Outlet } from "react-router";

const links: LinkType[] = [
  {
    id: "1",
    label: "Tienda",
    url: "/dashboard/store",
    relativePath: "store",
  },
  {
    id: "2",
    label: "Ordenes",
    url: "/dashboard/store/order",
    relativePath: "order",
  },
];

export const StoreLayout: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <NavBar links={links} />
      <Outlet />
    </div>
  );
};
