import z from "zod";

export const noteSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string()
    .min(4, { message: "Description must be at least 4 characters" }),
});
