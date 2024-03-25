"use server";

import { getCurrentUser } from "@/lib/current-user";
import {
  CreateAndEditSizeType,
  SizeType,
  createAndEditSizeSchema,
} from "@/app/_types/types";
import prisma from "@/utils/db";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

async function authenticateAndRedirect() {
  const currUser = await getCurrentUser();

  if (!currUser?.id && currUser?.role !== UserRole.ADMIN) redirect("/");
  return currUser;
}

export async function createSizeAction(
  values: CreateAndEditSizeType
): Promise<SizeType | null> {
  //todo check user role
  //todo get user id and set in category creatorId
  const { id } = await authenticateAndRedirect();

  if (!id) {
    return null;
  }

  try {
    createAndEditSizeSchema.parse(values);

    const size: SizeType = await prisma.size.create({
      data: {
        createdUserId: id,
        ...values,
      },
    });

    return size;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateSizeAction(
  id: string,
  values: CreateAndEditSizeType
): Promise<SizeType | null> {
  // todo check user role
  const { id: currUserId } = await authenticateAndRedirect();

  if (!currUserId) {
    return null;
  }

  try {
    const size: SizeType = await prisma.size.update({
      where: {
        id,
      },
      data: {
        ...values,
        updatedUserId: currUserId,
      },
    });
    return size;
  } catch (error) {
    return null;
  }
}

export async function deleteSizeAction(id: string): Promise<SizeType | null> {
  //todo check user role

  await authenticateAndRedirect();

  try {
    const size: SizeType = await prisma.size.delete({
      where: {
        id,
      },
    });
    return size;
  } catch (error) {
    return null;
  }
}

// todo implement search & paginantion
export async function getAllSizeAction(): Promise<{
  sizes: SizeType[];
} | null> {
  try {
    const sizes: SizeType[] = await prisma.size.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return { sizes };
  } catch (error) {
    return null;
  }
}

export async function getSingleSize(id: string): Promise<SizeType | null> {
  let size: SizeType | null = null;

  //todo check if user has the role admin

  try {
    size = await prisma.size.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    size = null;
  }
  // if (!category) {
  //   redirect("/admin/categories/create");
  // }
  return size;
}
