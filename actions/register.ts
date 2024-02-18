"use server";
import bcryptjs from "bcryptjs";
import { RegisterFormSchemaType, registerFormSchema } from "@/utils/schemas";
import prisma from "@/utils/db";

export const registerAction = async (values: RegisterFormSchemaType) => {
  const validateFields = registerFormSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Field" };
  }

  const { email, name, password } = validateFields.data;

  const hashedPassword = await bcryptjs.hash(password, 10);

  //check if user exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "email already exists" };
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return { success: "User Created!" };
};
