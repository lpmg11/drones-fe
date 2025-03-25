import { get } from "@/api/axios";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import DepositFundsModal from "@/pages/client/components/DepositFundsModal";
import { useEffect, useState } from "react";

interface BudgetI {
  id: string;
  balance: number;
}

interface BudgetTransaction {
  id: string;
  amount: number;
  created_at: string;
  status: string;
  description: string;
}

export const Budget: React.FC = () => {
  const [budget, setBudget] = useState<BudgetI>({
    id: "",
    balance: 0,
  });

  const [transactions, setTransactions] = useState<BudgetTransaction[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBudget = async () => {
    try {
      const response = await get("/api/v1/user/budget");
      setBudget(response.data.budget);
      setTransactions(response.data.budget.transactions);
    } catch (error) {
      console.error("Error obteniendo el presupuesto:", error);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, [isModalOpen]);
  console.log(transactions);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="text-xl mt-4 font-normal text-blue-600 mb-4">
          Billetera
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-nowrap text-white px-1 py-2 rounded-md"
        >
          Recargar fondos
        </button>
      </div>
      <div className="mb-4 flex flex-col justify-center items-center w-full">
        <Card className="border-border w-[300px]">
          <CardHeader>
            <h2 className="text-sm font-semibold text-blue-600 mb-2">Saldo</h2>
          </CardHeader>
          <CardContent>
            <p>Saldo actual: Q{budget.balance.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <h2 className="text-sm font-semibold text-blue-600 mb-2">
            Transacciones
          </h2>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {/* Aquí se debe de iterar sobre las transacciones */}
          {transactions.map((transaction) => (
            <div key={transaction.id} className="grid grid-cols-3">
              <p>{transaction.description}</p>
              <p>{transaction.status}</p>
              <p
                className={
                  transaction.amount > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {transaction.amount > 0
                  ? `+Q${transaction.amount.toFixed(2)}`
                  : `-Q${Math.abs(transaction.amount).toFixed(2)}`}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <DepositFundsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
