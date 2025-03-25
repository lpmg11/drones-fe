import { get } from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import DroneModal from "@/pages/dashboard/admin/drones/components/DroneModal";
import { useEffect, useState } from "react";

interface Drone {
  id: string;
  name: string;
  warehouse: {
    id: string;
    name: string;
  };
  model: {
    id: string;
    name: string;
  };
}

export const Drones: React.FC = () => {
  const [busqueda, setBusqueda] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drones, setDrones] = useState<Drone[]>([]);
  const [filteredDrones, setFilteredDrones] = useState<Drone[]>([]);

  // Fetch de los drones desde la API
  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await get("/api/v1/drone");
        setDrones(response.data.drones); // Ajustado para coincidir con la clave de la API
        setFilteredDrones(response.data.drones); // Inicialmente, todos los drones están visibles
      } catch (error) {
        console.error("Error obteniendo los drones:", error);
      }
    };

    fetchDrones();
  }, [isModalOpen]);

  // Filtrar los drones basados en la búsqueda
  useEffect(() => {
    const filtered = drones.filter((drone) =>
      drone.name.toLowerCase().includes(busqueda.toLowerCase()),
    );
    setFilteredDrones(filtered);
  }, [busqueda, drones]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row pt-2 items-end">
        <div className="w-full flex flex-row items-center">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar drone"
            className="w-1/3 border border-gray-300 focus:border-gray-400 hover:border-gray-400 rounded-md px-2 py-1"
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-auto bg-primary text-nowrap text-white px-1 py-2 rounded-md"
        >
          Agregar drone
        </button>
      </div>
      <div className="w-full flex flex-col mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDrones.map((drone) => (
            <Card key={drone.id}>
              <CardHeader>
                <CardTitle>{drone.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Almacén: {drone.warehouse.name}</p>
                <p>Modelo: {drone.model.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* Modal para agregar un nuevo drone */}
      <DroneModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
