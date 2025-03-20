import NavBar from "@/components/ui/Navbar";
import { LinkType } from "@/types/LinkType";

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

export const Drones: React.FC = () => {
  return (
    <div className="w-full flex flex-row">
      <NavBar links={links} />
    </div>
  );
};
