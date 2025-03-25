import { put } from "@/api/axios";
import Toast from "@/components/ui/Toast";
import React, { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  id: string;
}

const ConfirmTransaction: React.FC<Props> = ({ open, onClose, id }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Fetch warehouses and drone models
  const onSubmit = async () => {
    try {
      const response = await put("/api/v1/admin/transactions", { 'transaction_id':id });
      if (response.status !== 200) {
        const error = response.data;
        setToastMessage(error.error ?? "Error en la petición");
        setShowToast(true);
        throw new Error(error.error);
      }
      setToastMessage("Transacción confirmada exitosamente");
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
        <h2 className="text-xl font-bold mb-4 text-blue-500">
          Confirmar transacción
        </h2>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Confirmar
          </button>
        </div>
      </div>
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default ConfirmTransaction;
