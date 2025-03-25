import { post } from "@/api/axios";
import Toast from "@/components/ui/Toast";
import WarehousesMap from "@/components/ui/WarehousesMap";
import React, { useEffect, useState } from "react";

export const NewWarehouse: React.FC = () => {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const [name, setName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (position.lat === 0 && position.lng === 0 && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          console.error("Error obteniendo la ubicación del usuario", err);
          setToastMessage("No se pudo obtener la ubicación del usuario");
          setShowToast(true);
        },
      );
    }
  }, [position]);

  const saveWarehouse = async () => {
    try {
      const response = await post(
        "/api/v1/warehouse",
        {
          name,
          latitude: position.lat,
          longitude: position.lng,
        },
        { withCredentials: true },
      );

      if (response.status !== 200) {
        throw new Error(response.data.error ?? "Error al guardar la bodega");
      }

      setToastMessage("Bodega guardada exitosamente");
      setShowToast(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      setToastMessage(errorMessage);
      setShowToast(true);
      console.error(error);
    }
  };

  return (
    <div className="w-full flex gap-3 flex-col">
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
        <WarehousesMap location={position} setLocation={setPosition} />
      </div>

      <button
        onClick={saveWarehouse}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Guardar
      </button>

      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};
