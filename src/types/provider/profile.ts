import z from "zod";

export const ProfileSchema = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

export type Profile = z.infer<typeof ProfileSchema>;
