import z from "zod";

export const WarehouseSchema = z.object({
  name: z.string().nonempty().min(3).max(50),
  latidude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});
