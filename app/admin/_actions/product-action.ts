"use server";

import { getCurrentUser } from "@/lib/current-user";
import {
  CategoryType,
  CreateAndEditCategoryType,
  CreateAndEditProductType,
  ProductType,
  createAndEditCategorySchema,
  createAndEditProductSchema,
} from "@/app/_types/types";
import prisma from "@/utils/db";
import { Prisma, UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

async function authenticateAndRedirect() {
  const currUser = await getCurrentUser();

  if (!currUser?.id && currUser?.role !== UserRole.ADMIN) redirect("/");
  return currUser;
}

export async function createProductAction(
  values: CreateAndEditProductType
): Promise<ProductType | null> {
  //todo check user role
  //todo get user id and set in category creatorId
  const { id } = await authenticateAndRedirect();

  if (!id) {
    return null;
  }

  try {
    createAndEditProductSchema.parse(values);

    const {
      categoryId,
      createdBy,
      desc,
      images,
      price,
      slug,
      title,
      isFeatured,
      colorId,
      sizeId,
    } = values;

    const product: ProductType = await prisma.product.create({
      data: {
        // createdUserId: id,
        title,
        isFeatured,
        slug,
        price,
        desc,
        createdBy: id,
        categoryId,
        colorId,
        sizeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
      include: {
        images: true,
      },
    });

    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateProductAction(
  id: string,
  values: CreateAndEditProductType
): Promise<ProductType | null> {
  // todo check user role
  const { id: currUserId } = await authenticateAndRedirect();

  if (!currUserId) {
    return null;
  }
  const {
    categoryId,
    createdBy,
    desc,
    images,
    price,
    slug,
    title,
    isFeatured,
    colorId,
    sizeId,
  } = values;

  try {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        title,
        isFeatured,
        slug,
        price,
        desc,
        createdBy: currUserId,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
      },
    });

    const product: ProductType = await prisma.product.update({
      where: {
        id,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return product;
  } catch (error) {
    return null;
  }
}

export async function deleteProductAction(
  id: string
): Promise<ProductType | null> {
  //todo check user role
  await authenticateAndRedirect();

  try {
    const product: ProductType = await prisma.product.delete({
      where: {
        id,
      },
    });
    return product;
  } catch (error) {
    console.log(error)
    return null;
  }
}

export async function getAllProductAction(): Promise<{
  products: ProductType[];
} | null> {
  try {
    const products: ProductType[] = await prisma.product.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        category: {
          include: {
            parent: true,
          },
        },
        size: true,
        color: true,
      },
    });

    return { products };
  } catch (error) {
    return null;
  }
}

export async function getSingleProduct(
  id: string
): Promise<ProductType | null> {
  let product: ProductType | null = null;

  //todo check if user has the role admin

  try {
    product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        size: true,
        color: true,
        images: true,
      },
    });
  } catch (error) {
    product = null;
  }
  // if (!product) {
  //   redirect("/admin/categories/create");
  // }
  return product;
}
