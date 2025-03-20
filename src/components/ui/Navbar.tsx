import { cn } from "@/lib/utils";
import { LinkType } from "@/types/LinkType";
import { NavLink } from "react-router";

interface ClientsNavBarProps {
  links: LinkType[];
}

export default function NavBar({ links }: ClientsNavBarProps) {
  return (
    <nav className="flex gap-8 items-center p-1" data-testid="clients-navbar">
      {links.map((link) => (
        <NavLink
          key={link.id}
          to={link.url}
          end
          className={({ isActive }) =>
            cn("btn-underline", isActive && "border-b-2 border-blue-500")
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
