import { cn } from "@/lib/utils";
import { LinkType } from "@/types/LinkType";
import { Link, useLocation, useParams } from "react-router";

interface ClientsNavBarProps {
  links: LinkType[];
}

export default function NavBar({ links }: ClientsNavBarProps) {
  const { pathname } = useLocation();
  const params = useParams();

  return (
    <nav className="flex gap-8 items-center p-1" data-testid="clients-navbar">
      {links.map((link) => (
        <Link
          key={link.id}
          to={`${link.url}/${params.id}`}
          className={cn(
            "btn-underline",
            pathname.includes(link.relativePath) &&
              "border-b-2 border-blue-500",
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
