import z from "zod";

export const ProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string()
});

export type ProductType = z.infer<typeof ProductSchema>;