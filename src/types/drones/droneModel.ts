import z from "zod";

export const DroneModelSchema = z.object({
  name: z.string(),
  charge_km: z.number(),
  speed: z.number(),
});

export type DroneModel = z.infer<typeof DroneModelSchema>;
