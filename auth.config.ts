import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { loginFormSchema } from "./utils/schemas";
import { getUserByEmail } from "./utils/helpers";

import bcryptjs from "bcryptjs";

export default {
  providers: [
    CredentialsProvider({
      async authorize(credentials, request) {
        const validateFields = loginFormSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordMatch = await bcryptjs.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
    GitHub,
    Google,
  ],
} satisfies NextAuthConfig;
