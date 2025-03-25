import { get, post } from "@/api/axios";
import SelectInput from "@/components/ui/SelectInput";
import TextInput from "@/components/ui/TextInput";
import Toast from "@/components/ui/Toast";
import { Drone, DroneSchema } from "@/types/drones/drone";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
}

const DroneModal: React.FC<Props> = ({ open, onClose }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [warehouses, setWarehouses] = useState<
    { value: string; label: string }[]
  >([]);
  const [droneModels, setDroneModels] = useState<
    { value: string; label: string }[]
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Drone>({
    resolver: zodResolver(DroneSchema),
  });

  // Fetch warehouses and drone models
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await get("/api/v1/warehouse");
        const options = response.data.warehouses.map((warehouse: any) => ({
          value: warehouse.id,
          label: warehouse.name,
        }));
        setWarehouses(options);
      } catch (error) {
        console.error("Error obteniendo los almacenes:", error);
      }
    };

    const fetchDroneModels = async () => {
      try {
        const response = await get("/api/v1/drone/model");
        const options = response.data.drone_models.map((model: any) => ({
          value: model.id,
          label: model.name,
        }));
        setDroneModels(options);
      } catch (error) {
        console.error("Error obteniendo los modelos de drones:", error);
      }
    };

    if (open) {
      fetchWarehouses();
      fetchDroneModels();
    }
  }, [open]);

  const onSubmit = async (data: Drone) => {
    try {
      const response = await post("/api/v1/drone", data);
      if (response.status !== 200) {
        const error = response.data;
        setToastMessage(error.error ?? "Error en la petición");
        setShowToast(true);
        throw new Error(error.error);
      }
      setToastMessage("Drone creado exitosamente");
      setShowToast(true);
      onClose(); // Cierra el modal después de un éxito
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      setToastMessage(errorMessage);
      setShowToast(true);
      console.error(error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4 text-blue-500">Crear Drone</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextInput
            label="name"
            placeholder="Nombre del drone"
            register={register}
            errors={errors}
          />
          <SelectInput
            label="warehouse_id"
            register={register}
            options={warehouses}
            errors={errors}
          />
          <SelectInput
            label="model_id"
            register={register}
            options={droneModels}
            errors={errors}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default DroneModal;
