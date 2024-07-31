import { Decimal } from "@prisma/client/runtime/library";
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

// ================
// CATEGORY TYPES
// ================

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
  parent?: CategoryType | null;
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

// ================
// SIZES TYPES
// ================

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
  value: z.string().min(1),
  name: z.string(),
});

export type CreateAndEditSizeType = z.infer<typeof createAndEditSizeSchema>;

// ==============
// COLOR TYPES
//==============

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
  value: z.string().min(1),
  name: z.string(),
});

export type CreateAndEditColorType = z.infer<typeof createAndEditColorSchema>;

// ================
// PRODUCT TYPES
// ================

export type Image = {
  id: string;
  url: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductType = {
  id: string;
  title: string;
  desc: string;
  slug: string;
  price: Decimal;
  isFeatured?: boolean;
  createdBy: string;
  categoryId: string;
  images?: Image[];
  colorId: string;
  sizeId: string;
  createdAt: Date;
  updatedAt: Date;
  category?: CategoryType;
  size?: SizeType;
  color?: ColorType;
};

export const createAndEditProductSchema = z.object({
  title: z.string(),
  desc: z.string(),
  slug: z.string(),
  price: z.coerce.number().min(1),
  isFeatured: z.boolean().default(false).optional(),
  createdBy: z.string(),
  categoryId: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
});

export type CreateAndEditProductType = z.infer<
  typeof createAndEditProductSchema
>;

///test
// export type TestType = {
//   id: string;
//   title: string;
//   desc: string;
//   slug: string;
//   createdBy: string;
//   images?: Image[];

//   categoryId: string;

//   // createdUserId: string;
//   // updatedUserId?: string | null;
//   createdAt: Date;
//   updatedAt: Date;
// };

// export const createAndEditTestSchema = z.object({
//   title: z.string(),
//   desc: z.string(),
//   slug: z.string(),
//   createdBy: z.string(),
//   images: z.object({ url: z.string() }).array(),
//   categoryId: z.string(),
// });

// export type CreateAndTestType = z.infer<typeof createAndEditTestSchema>;
