import { get } from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import DroneModelModal from "@/pages/dashboard/admin/drones/components/DroneModelModal";
import { useEffect, useState } from "react";

interface DroneModel {
  id: string;
  name: string;
  charge_km: number;
  speed: number;
}

export const DroneModels: React.FC = () => {
  const [busqueda, setBusqueda] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [models, setModels] = useState<DroneModel[]>([]);
  const [filteredModels, setFilteredModels] = useState<DroneModel[]>([]);

  // Fetch de los modelos desde la API
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await get("/api/v1/drone/model");
        setModels(response.data.drone_models); // Ajustado para coincidir con la clave de la API
        setFilteredModels(response.data.drone_models); // Inicialmente, todos los modelos están visibles
      } catch (error) {
        console.error("Error obteniendo los modelos de drones:", error);
      }
    };

    fetchModels();
  }, []);

  // Filtrar los modelos basados en la búsqueda
  useEffect(() => {
    const filtered = models.filter((model) =>
      model.name.toLowerCase().includes(busqueda.toLowerCase()),
    );
    setFilteredModels(filtered);
  }, [busqueda, models]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row pt-2 items-end">
        <div className="w-full flex flex-row items-center">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar modelo"
            className="w-1/3 border border-gray-300 focus:border-gray-400 hover:border-gray-400 rounded-md px-2 py-1"
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-auto bg-primary text-nowrap text-white px-1 py-2 rounded-md"
        >
          Agregar modelo
        </button>
      </div>
      <div className="w-full flex flex-col mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModels.map((model) => (
            <Card key={model.id}>
              <CardHeader>
                <CardTitle>{model.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Carga (km): {model.charge_km}</p>
                <p>Velocidad: {model.speed}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* Modal para agregar un nuevo modelo de drone */}
      <DroneModelModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
