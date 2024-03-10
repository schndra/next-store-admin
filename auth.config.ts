import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { loginFormSchema } from "./utils/schemas";
import { getUserByEmail } from "./utils/helpers";

import bcryptjs from "bcryptjs";
import { UserRole } from "@prisma/client";

export default {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials, request) {
        const validateFields = loginFormSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);

          // stops user from sign in
          if (!user || !user.password || user.role !== UserRole.ADMIN)
            return null;

          const passwordMatch = await bcryptjs.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
