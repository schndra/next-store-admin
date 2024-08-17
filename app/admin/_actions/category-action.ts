"use server";

import { getCurrentUser } from "@/lib/current-user";
import {
  CategoryType,
  CreateAndEditCategoryType,
  createAndEditCategorySchema,
} from "@/app/_types/types";
import prisma from "@/utils/db";
import { Prisma, UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

async function authenticateAndRedirect() {
  const currUser = await getCurrentUser();

  if (!currUser?.id && currUser?.role !== UserRole.ADMIN) redirect("/");
  return currUser;
}

export async function createCategoryAction(
  values: CreateAndEditCategoryType
): Promise<CategoryType | null> {
  //todo check user role
  //todo get user id and set in category creatorId
  const { id } = await authenticateAndRedirect();

  if (!id) {
    return null;
  }

  try {
    createAndEditCategorySchema.parse(values);

    const category: CategoryType = await prisma.category.create({
      data: {
        // createdUserId: id,
        ...values,
      },
    });

    return category;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateCategoryAction(
  id: string,
  values: CreateAndEditCategoryType
): Promise<CategoryType | null> {
  // todo check user role
  const { id: currUserId } = await authenticateAndRedirect();

  if (!currUserId) {
    return null;
  }

  try {
    const category: CategoryType = await prisma.category.update({
      where: {
        id,
      },
      data: {
        ...values,
        // updatedUserId: currUserId,
      },
    });
    return category;
  } catch (error) {
    return null;
  }
}

export async function deleteCategoryAction(
  id: string
): Promise<CategoryType | null> {
  //todo check user role

  await authenticateAndRedirect();

  try {
    const category: CategoryType = await prisma.category.delete({
      where: {
        id,
      },
    });
    return category;
  } catch (error) {
    return null;
  }
}

type GetAllCategoryActionTypes = {
  type?: "main" | "sub"; //if not provided get all the categories
};

// todo implement search & paginantion
export async function getAllCategoryAction({
  type,
}: GetAllCategoryActionTypes): Promise<{
  categories: CategoryType[];
} | null> {
  try {
    let whereClause: Prisma.CategoryWhereInput = {};

    if (type === "main") {
      whereClause = {
        isMainCategory: true,
      };
    }

    if (type === "sub") {
      whereClause = {
        parentId: { not: null },
      };
    }

    const categories: CategoryType[] = await prisma.category.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "asc",
      },
      include: {
        subCategories: type === "main" ? true : false,
        parent: true,
      },
    });

    return { categories };
  } catch (error) {
    return {
      categories: [],
    };
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
      include: {
        // subCategories: true,
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
