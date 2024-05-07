"use server";

import { getCurrentUser } from "@/lib/current-user";
import {
  CreateAndEditColorType,
  ColorType,
  createAndEditColorSchema,
} from "@/app/_types/types";
import prisma from "@/utils/db";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

async function authenticateAndRedirect() {
  const currUser = await getCurrentUser();

  if (!currUser?.id && currUser?.role !== UserRole.ADMIN) redirect("/");
  return currUser;
}

export async function createColorAction(
  values: CreateAndEditColorType
): Promise<ColorType | null> {
  //todo check user role
  //todo get user id and set in category creatorId
  const { id } = await authenticateAndRedirect();

  if (!id) {
    return null;
  }

  try {
    createAndEditColorSchema.parse(values);

    const color: ColorType = await prisma.color.create({
      data: {
        // createdUserId: id,
        ...values,
      },
    });

    return color;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateColorAction(
  id: string,
  values: CreateAndEditColorType
): Promise<ColorType | null> {
  // todo check user role
  const { id: currUserId } = await authenticateAndRedirect();

  if (!currUserId) {
    return null;
  }

  try {
    const color: ColorType = await prisma.color.update({
      where: {
        id,
      },
      data: {
        ...values,
        // updatedUserId: currUserId,
      },
    });
    return color;
  } catch (error) {
    return null;
  }
}

export async function deleteColorAction(id: string): Promise<ColorType | null> {
  //todo check user role

  await authenticateAndRedirect();

  try {
    const color: ColorType = await prisma.color.delete({
      where: {
        id,
      },
    });
    return color;
  } catch (error) {
    return null;
  }
}

// todo implement search & paginantion
export async function getAllColorAction(): Promise<{
  colors: ColorType[];
} | null> {
  try {
    const colors: ColorType[] = await prisma.color.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return { colors };
  } catch (error) {
    return null;
  }
}

export async function getSingleColor(id: string): Promise<ColorType | null> {
  let color: ColorType | null = null;

  //todo check if user has the role admin

  try {
    color = await prisma.color.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    color = null;
  }
  // if (!category) {
  //   redirect("/admin/categories/create");
  // }
  return color;
}
