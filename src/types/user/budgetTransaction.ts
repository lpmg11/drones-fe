import z from "zod";

export const BudgetTransactionSchema = z.object({
  amount: z.number(),
  description: z.string(),
  confirmation_code: z.string(),
})

export type BudgetTransaction = z.infer<typeof BudgetTransactionSchema>;
