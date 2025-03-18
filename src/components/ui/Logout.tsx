import { post } from "@/api/axios";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";

interface LogoutProps {
  navBarOpen: boolean;
}

export default function Logout({ navBarOpen }: LogoutProps) {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post("/api/v1/auth/logout").then(() => {
      console.log("Logged out");
      navigate("/");
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className={cn(
            "w-full h-[48px] flex items-center rounded-lg transition-all duration-200",
            navBarOpen
              ? "justify-start px-[14px] py-2"
              : "justify-center px-[14px] -ml-[2.5px]",
          )}
          aria-label="Cerrar sesión"
        >
          <span className="flex items-center justify-center" aria-hidden="true">
            <Icon
              icon="ci:log-out"
              width="24"
              height="24"
              className="text-ct-blue-900 group-disabled:opacity-55"
            />
          </span>
          <span
            className={cn(
              "ml-3 transition-opacity duration-200 ease-in-out text-ct-blue-900 text-sm font-semibold hidden overflow-hidden",
              navBarOpen
                ? "overflow-auto inline"
                : "opacity-0 w-0 overflow-hidden",
            )}
          >
            Cerrar Sesión
          </span>
        </button>
      </form>
    </>
  );
}
