import { post } from "@/api/axios";
import TextInput from "@/components/ui/TextInput";
import Toast from "@/components/ui/Toast";
import {
  BudgetTransaction,
  BudgetTransactionSchema,
} from "@/types/user/budgetTransaction";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
}

const DepositFundsModal: React.FC<Props> = ({ open, onClose }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetTransaction>({
    resolver: zodResolver(BudgetTransactionSchema),
  });

  const onSubmit = async (data: BudgetTransaction) => {
    try {
      const response = await post("/api/v1/user/budget/request", data);
      if (response.status !== 201) {
        const error = response.data;
        setToastMessage(error.error ?? "Error en la petición");
        setShowToast(true);
        throw new Error(error.error);
      }
      setToastMessage("Solicitud de depósito enviada exitosamente");
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
          Solicitar Depósito de Fondos
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextInput
            label="amount"
            placeholder="Monto a depositar"
            register={register}
            errors={errors}
            valueAsNumber
          />
          <TextInput
            label="description"
            placeholder="Descripción del depósito"
            register={register}
            errors={errors}
          />
          <TextInput
            label="confirmation_code"
            placeholder="Código de confirmación (boleta o depósito)"
            register={register}
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
              Solicitar
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

export default DepositFundsModal;
