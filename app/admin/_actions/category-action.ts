"use server";

import {
  CategoryType,
  CreateAndEditCategoryType,
  createAndEditCategorySchema,
} from "@/types/types";
import prisma from "@/utils/db";
import { redirect } from "next/navigation";

export async function createCategoryAction(
  values: CreateAndEditCategoryType
): Promise<CategoryType | null> {
  //todo check user role
  //todo get user id and set in category creatorId

  try {
    createAndEditCategorySchema.parse(values);

    const category: CategoryType = await prisma.category.create({
      data: {
        ...values,
      },
    });

    console.log("im gere");
    return category;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// todo implement search & paginantion
export async function getAllCategoryAction(): Promise<{
  categories: CategoryType[];
} | null> {
  try {
    const categories: CategoryType[] = await prisma.category.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return { categories };
  } catch (error) {
    return null;
  }
}

export async function getSingleCategory(
  id: string
): Promise<CategoryType | null> {
  let category: CategoryType | null = null;

  //todo check if user has the role admin

  try {
    category = await prisma.category.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    category = null;
  }
  // if (!category) {
  //   redirect("/admin/categories/create");
  // }
  return category;
}
