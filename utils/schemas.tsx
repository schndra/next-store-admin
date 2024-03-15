import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  name: z.string().min(2),
});

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;

export const createAndEditCategorySchema = z.object({
  title: z.string(),
  desc: z.string(),
  img: z.string(),
  slug: z.string(),
});

export type CreateAndEditCategoryType = z.infer<
  typeof createAndEditCategorySchema
>;
