import { post } from "@/api/axios";
import TextInput from "@/components/ui/TextInput";
import Toast from "@/components/ui/Toast";
import { ProductSchema, ProductType } from "@/types/provider/product";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
}

const NewProductModal: React.FC<Props> = ({ open, onClose }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
  });

  // Fetch warehouses and drone models
  const onSubmit = async (data: ProductType) => {
    try {
      const response = await post("/api/v1/provider/products", data);
      if (response.status !== 200) {
        const error = response.data;
        setToastMessage(error.error ?? "Error en la petición");
        setShowToast(true);
        throw new Error(error.error);
      }
      setToastMessage("Producto creado exitosamente");
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
        <h2 className="text-xl font-bold mb-4 text-blue-500">Crear producto</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextInput
            label="name"
            placeholder="Nombre del producto"
            register={register}
            errors={errors}
          />
          <TextInput
            label="description"
            placeholder="Descripción"
            register={register}
            errors={errors}
          />
          <TextInput
            label="price"
            placeholder="Precio"
            register={register}
            errors={errors}
            valueAsNumber
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

export default NewProductModal;
