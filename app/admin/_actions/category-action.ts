import prisma from "@/utils/db";
import { redirect } from "next/navigation";

export async function getSingleCategory(id: string): Promise<any | null> {
  let category: any | null = null;

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
  if (!category) {
    redirect("/admin/category");
  }
  return category;
}
