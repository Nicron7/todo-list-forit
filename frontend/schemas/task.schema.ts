import * as z from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, { message: "El título debe tener al menos 3 caracteres" }),
  description: z
    .string()
    .min(4, { message: "La descripción debe tener al menos 4 caracteres" }),
});

export type Task = z.infer<typeof taskSchema>;
