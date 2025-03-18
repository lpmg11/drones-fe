import { get } from "@/api/axios";
import Sidebar from "@/components/ui/SideBar";
import { useEffect, useState } from "react";

export const Dashboard: React.FC = () => {
  const [ping, setPing] = useState();

  const pingfetch = async () => {
    const response = await get("/api/v1/protected/ping");
    setPing(response.data.message);
  };

  useEffect(() => {
    pingfetch();
  }, []);

  return (
    <div className="w-full">
      <Sidebar />
      <p>{ping}</p>
    </div>
  );
};
