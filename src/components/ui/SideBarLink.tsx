import { cn } from "@/lib/utils";
import { JSX, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

interface LinkProps {
  icon: JSX.Element;
  text: string;
  url: string;
  navBarOpen: boolean;
  reference: string[];
}

// Función para normalizar la URL eliminando la barra final
const normalizePath = (path: string) => path.replace(/\/+$/, "");

export default function SidebarLink({
  icon,
  text,
  url,
  navBarOpen,
  reference,
}: LinkProps) {
  const [activeLink, setActiveLink] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const normalizedPath = normalizePath(location.pathname);

    const isActive =
      (normalizedPath === "/dashboard" && url === "/dashboard") ||
      (url !== "/dashboard" &&
        reference.some((ref) => {
          const regex = new RegExp(`^/dashboard/${ref}(?:/|$)`);
          return regex.test(normalizedPath);
        }));

    setActiveLink(isActive);
  }, [location.pathname, reference, url]);

  return (
    <Link
      to={url}
      className={cn(
        "w-full h-[48px] flex items-center gap-3 rounded-lg transition-colors animate-fade-in duration-200 sidebar-tab text-ct-blue-900",
        navBarOpen ? "justify-start px-4 py-2" : "justify-center p-3",
        activeLink && "bg-blue-500 text-white",
        !activeLink && "hover:bg-blue-50",
      )}
      role="link"
      aria-label={`Ir a ${text}`}
    >
      <span
        className={cn(
          "flex items-center justify-center",
          activeLink ? "text-white" : "text-blue-900",
        )}
        aria-hidden="true"
      >
        {icon}
      </span>
      <p
        className={cn(
          "transition-opacity ease-in-out text-left text-blue-900 text-sm font-semibold hidden overflow-hidden",
          navBarOpen ? "overflow-auto inline" : "opacity-0 w-0 overflow-hidden",
          activeLink && "text-white",
        )}
      >
        {text}
      </p>
    </Link>
  );
}
