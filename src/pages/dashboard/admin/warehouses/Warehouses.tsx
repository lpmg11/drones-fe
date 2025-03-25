import { get } from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useStore } from "@/store/store";
import { Warehouse } from "@/types/warehouses/warehouse";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const Warehouses: React.FC = () => {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const { setWarehouse } = useStore();

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await get("/api/v1/warehouse");
        setWarehouses(response.data.warehouses);
      } catch (error) {
        console.error("Error obteniendo las bodegas:", error);
      }
    };
    fetchWarehouses();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl mt-4 font-normal text-blue-600 mb-4">Bodegas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {warehouses.map((warehouse) => (
          <Card
            onClick={() => {
              setWarehouse(warehouse);
              navigate(`/dashboard/warehouses/${warehouse.id}`);
            }}
            className="border-border"
            key={warehouse.id}
          >
            <CardHeader>
              <CardTitle>{warehouse.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Latitud: {warehouse.latitude}</p>
              <p>Longitud: {warehouse.longitude}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
