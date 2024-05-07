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

export type CategoryType = {
  id: string;
  title: string;
  desc: string;
  img?: string | null;
  slug: string;
  // creatorId: string;
  parentId?: string | null;
  isMainCategory: boolean;
  // createdUserId: string;
  // updatedUserId?: string | null;
  products?: any[]; // change later
  subCategories?: CategoryType[];
  createdAt: Date;
  updatedAt: Date;
};

export const createAndEditCategorySchema = z.object({
  title: z.string(),
  desc: z.string(),
  img: z.string(),
  slug: z.string(),

  //main category
  parentId: z.string().nullish().optional(),
  isMainCategory: z.boolean().default(false),
});

export type CreateAndEditCategoryType = z.infer<
  typeof createAndEditCategorySchema
>;

// SIZES TYPES
export type SizeType = {
  id: string;
  value: string;
  name: string;
  // createdUserId: string;
  // updatedUserId?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const createAndEditSizeSchema = z.object({
  value: z.string(),
  name: z.string(),
});

export type CreateAndEditSizeType = z.infer<typeof createAndEditSizeSchema>;

// COLOR TYPES
export type ColorType = {
  id: string;
  value: string;
  name: string;
  // createdUserId: string;
  // updatedUserId?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const createAndEditColorSchema = z.object({
  value: z.string(),
  name: z.string(),
});

export type CreateAndEditColorType = z.infer<typeof createAndEditColorSchema>;
