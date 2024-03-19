"use server";

import { signIn } from "@/auth";
import { LOGIN_REDIRECT } from "@/utils/routes";
import { LoginFormSchemaType, loginFormSchema } from "@/app/_types/types";
import { AuthError } from "next-auth";

export const loginAction = async (values: LoginFormSchemaType) => {
  const validateFields = loginFormSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validateFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credintials" };
        default:
          return { error: "something went wrong!" };
      }
    }

    throw error;
  }

  //   return { success: "Successfully Logged In" };
};
