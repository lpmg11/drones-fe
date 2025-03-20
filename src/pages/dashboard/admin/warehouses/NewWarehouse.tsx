import { post } from "@/api/axios";
import MapComponent from "@/components/ui/Map";
import React, { useEffect, useState } from "react";

export const NewWarehouse: React.FC = () => {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const [name, setName] = useState("");

  useEffect(() => {
    if (position.lat === 0 && position.lng === 0 && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, [position]);

  const saveWarehouse = async () => {
    const response = await post(
      "/api/v1/warehouse",
      {
        name,
        latitude: position.lat,
        longitude: position.lng,
      },
      { withCredentials: true },
    );
    console.log(response);
  };

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl mt-4 font-normal text-blue-600 mb-4">
        Nueva Bodega
      </h1>
      <input
        className="input"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Nombre de la bodega"
      />
      <div>
        <MapComponent
          position={position}
          className="h-96 w-full"
          setPosition={setPosition}
        />
      </div>
      <pre>{JSON.stringify({ position }, null)}</pre>

      <button
        onClick={saveWarehouse}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Guardar
      </button>
    </div>
  );
};
