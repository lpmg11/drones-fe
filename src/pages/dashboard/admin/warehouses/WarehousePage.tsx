import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import MapComponent from "@/components/ui/Map";
import { useStore } from "@/store/store";

export const WarehousePage = () => {
  const { warehouse } = useStore();

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row pt-2 items-end">
        <h1 className="text-xl mt-4 font-normal text-blue-600 mb-4">
          Bodega {warehouse.name}
        </h1>
      </div>
      <div className="flex flex-col  gap-4">
        <div className="">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">
            Información
          </h2>
          <p>Nombre: {warehouse.name}</p>
          <p>Latitud: {warehouse.latitude}</p>
          <p>Longitud: {warehouse.longitude}</p>
        </div>
        <div>
          <MapComponent
            className="w-72 h-72"
            position={{ lat: warehouse.latitude, lng: warehouse.longitude }}
            setPosition={(pos) => console.log(pos)}
          />
        </div>
        <div className="w-full flex flex-col mt-4">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Drones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {warehouse.drones.map((drone) => (
              <Card key={drone.id}>
                <CardHeader>
                  <CardTitle>{drone.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Modelo: {drone.model.name}</p>
                  <p>Velocidad: {drone.model.speed} km/h</p>
                  <p>Carga: {drone.model.charge_km} km</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
