import { z } from "zod";

// todoIdParamsSchema
export const todoIdParamsSchema = z.object({
  id: z.coerce.number().int().positive("id must be a positive integer").max(2147483647, "id is too large"),
});

// createTodoSchema
export const createTodoSchema = z.object({
  title: z.string().trim().min(1, "title is required"),
  body: z.string().trim().optional().default(""),
});

// updateTodoSchema
export const updateTodoSchema = z
  .object({
    title: z.string().trim().min(1, "title cannot be empty"),
    body: z.string().trim(),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "at least one of title, body must be provided",
  });
