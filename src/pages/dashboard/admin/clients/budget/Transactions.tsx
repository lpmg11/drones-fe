import { get } from "@/api/axios";
import ConfirmTransaction from "@/pages/dashboard/admin/clients/budget/ConfirmTransactionModal";
import { useEffect, useState } from "react";

interface PendingTransactions {
  id: string;
  amount: number;
  created_at: string;
  status: string;
  description: string;
  budget_id: string;
}

export const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<PendingTransactions[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);

  const fetchTransactions = async () => {
    try {
      const response = await get("/api/v1/admin/transactions");
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error obteniendo las transacciones:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const openModal = (id: string) => {
    setSelectedTransactionId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTransactionId(null);
    setIsModalOpen(false);
    fetchTransactions(); // Refrescar la lista de transacciones después de confirmar
  };

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl mt-4 font-normal text-blue-600 mb-4">
        Transacciones
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-500">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Monto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Fecha de creación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white-900">
                  {transaction.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.created_at}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.status === "Pendiente" && (
                    <button
                      onClick={() => openModal(transaction.id)}
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                    >
                      Confirmar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para confirmar transacción */}
      {selectedTransactionId && (
        <ConfirmTransaction
          open={isModalOpen}
          onClose={closeModal}
          id={selectedTransactionId}
        />
      )}
    </div>
  );
};
