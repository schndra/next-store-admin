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

export type CategoryType = {
  id: string;
  title: string;
  desc: string;
  img?: string | null;
  slug: string;
  creatorId: string;
  products?: any[]; // change later
  createdAt: Date;
  updatedAt: Date;
};

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
