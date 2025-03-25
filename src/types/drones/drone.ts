import z from "zod";

export const DroneSchema = z.object({
  name: z.string(),
  warehouse_id: z.string(),
  model_id: z.string(),
});

export type Drone = z.infer<typeof DroneSchema>;
