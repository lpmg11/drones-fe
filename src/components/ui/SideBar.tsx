import { cn } from "@/lib/utils";
import { useStore } from "@/store/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Logout from "./Logout";
import SidebarLink from "./SideBarLink";

const NAV_LINKS_USER = [
  {
    icon: <Icon icon="tabler:home" width="24" height="24" />,
    text: "Home",
    url: "/dashboard",
    pathname: "/dashboard",
    urlReference: ["dashboard"],
  },
  {
    icon: <Icon icon="bi:shop" width="24" height="24" />,
    text: "Tienda",
    url: "/dashboard/store",
    pathname: "/dashboard/store",
    urlReference: ["store"],
  },
  {
    icon: <Icon icon="carbon:delivery" width="24" height="24" />,
    text: "Envíos",
    url: "/dashboard/shipment",
    pathname: "/dashboard/shipment",
    urlReference: ["shipment"],
  },
  {
    icon: <Icon icon="uil:wallet" width="24" height="24" />,
    text: "Billetera",
    url: "/dashboard/wallet",
    pathname: "/dashboard/wallet",
    urlReference: ["wallet"],
  },
];

const NAV_LINKS_ADMIN = [
  {
    icon: <Icon icon="tabler:home" width="24" height="24" />,
    text: "Home",
    url: "/dashboard",
    pathname: "/dashboard",
    urlReference: ["dashboard"],
  },
  {
    icon: <Icon icon="iconoir:drone" width="24" height="24" />,
    text: "drones",
    url: "/dashboard/drones",
    pathname: "/dashboard/drones",
    urlReference: ["drones"],
  },
  {
    icon: <Icon icon="bx:bxs-store" width="24" height="24" />,
    text: "Almacenes",
    url: "/dashboard/warehouses",
    pathname: "/dashboard/warehouses",
    urlReference: ["warehouses"],
  },
  {
    icon: <Icon icon="gg:profile" width="24" height="24" />,
    text: "Almacenes",
    url: "/dashboard/clients",
    pathname: "/dashboard/clients",
    urlReference: ["clients"],
  },
];

const NAV_LINKS_PROVIDER = [
  {
    icon: <Icon icon="tabler:home" width="24" height="24" />,
    text: "Home",
    url: "/dashboard",
    pathname: "/dashboard",
    urlReference: ["dashboard"],
  },
  {
    icon: <Icon icon="gg:profile" width="24" height="24" />,
    text: "Clientes",
    url: "/dashboard/profile",
    pathname: "/dashboard/profile",
    urlReference: ["profile"],
  },
  {
    icon: <Icon icon="bx:bxs-store" width="24" height="24" />,
    text: "Productos",
    url: "/dashboard/products",
    pathname: "/dashboard/products",
    urlReference: ["products"],
  },
];

const FOOTER_LINKS_USER = [
  {
    icon: <Icon icon="majesticons:settings-cog-line" width="24" height="24" />,
    text: "Ajustes",
    url: "/dashboard/settings",
    pathname: "/dashboard/settings",
    urlReference: ["settings"],
  },
];

const FOOTER_LINKS_PROVIDER = [
  {
    icon: <Icon icon="majesticons:settings-cog-line" width="24" height="24" />,
    text: "Ajustes",
    url: "/dashboard/settings",
    pathname: "/dashboard/provider/settings",
    urlReference: ["settings"],
  },
];

const FOOTER_LINKS_ADMIN = [
  {
    icon: <Icon icon="majesticons:settings-cog-line" width="24" height="24" />,
    text: "Ajustes",
    url: "/dashboard/settings",
    pathname: "/dashboard/admin/settings",
    urlReference: ["settings"],
  },
];

const LINKS = {
  user: NAV_LINKS_USER,
  admin: NAV_LINKS_ADMIN,
  provider: NAV_LINKS_PROVIDER,
};

const FOOTER_LINKS_TYPES = {
  user: FOOTER_LINKS_USER,
  admin: FOOTER_LINKS_ADMIN,
  provider: FOOTER_LINKS_PROVIDER,
};

export default function Sidebar() {
  const navigate = useNavigate();
  const [navBarOpen, setNavBarOpen] = useState(false);
  const { role } = useStore() as { role: keyof typeof LINKS };

  useEffect(() => {
    if (!role) {
      navigate("/");
      return;
    }
  }, [role, navigate]);

  const NAV_LINKS = LINKS[role];

  const FOOTER_LINKS = FOOTER_LINKS_TYPES[role];

  return (
    <aside
      className={cn(
        "px-3 py-6 border-r border-r-[#E8EAF6] h-screen duration-200 overflow-hidden",
        navBarOpen ? "w-64" : "w-20",
      )}
      id="dashboard-sidebar"
    >
      <div className="flex flex-col items-center h-full">
        <header
          className={cn(
            "mt-3",
            navBarOpen ? "w-full self-start mb-10" : "mb-5",
          )}
        >
          {!navBarOpen ? (
            <button
              type="button"
              onClick={() => setNavBarOpen(true)}
              aria-label="abrir menu"
            >
              <Icon icon="rivet-icons:menu" width="24" height="24" />
            </button>
          ) : (
            <div className="flex items-center justify-between  w-full">
              <img
                src="/logo.svg"
                alt="logotipo"
                role="img"
                className="size-9 flex-grow"
              />
              <button
                type="button"
                onClick={() => setNavBarOpen(false)}
                className="w-1/2 flex justify-end"
                aria-label="cerra menu"
              >
                <Icon icon="iconamoon:close" width="24" height="24" />
              </button>
            </div>
          )}
        </header>
        <nav className="w-full flex flex-col items-center gap-y-3 flex-grow">
          {NAV_LINKS.map((link) => (
            <SidebarLink
              key={link.text}
              icon={link.icon}
              text={link.text}
              url={link.url}
              navBarOpen={navBarOpen}
              reference={link.urlReference}
            />
          ))}
        </nav>
        <footer className="w-full space-y-2 border-t pt-2 flex flex-col justify-center">
          {FOOTER_LINKS.map((link) => (
            <SidebarLink
              key={link.text}
              icon={link.icon}
              text={link.text}
              url={link.url}
              navBarOpen={navBarOpen}
              reference={link.urlReference}
            />
          ))}
          <Logout navBarOpen={navBarOpen} />
        </footer>
      </div>
    </aside>
  );
}
