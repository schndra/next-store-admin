import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { loginFormSchema } from "./utils/schemas";
import { getUserByEmail, getUserById } from "./utils/helpers";

import bcryptjs from "bcryptjs";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "./utils/db";

declare module "next-auth" {
  interface Session {
    user: User & {
      role: UserRole;
    };
  }

  interface User {
    role: UserRole;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: UserRole;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: UserRole;
  }
}

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
          if (!user || !user.password) return null;

          const passwordMatch = await bcryptjs.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("USER___", user);
      // const isAllowedToSignIn = user.role === UserRole.ADMIN;
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return isAllowedToSignIn;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },

    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      // console.log({ token });
      if (!token.email) return token;
      // const userInDb = await getUserByEmail(token.email!);
      const userInDb = await getUserByEmail(token.email);

      if (!userInDb) return token;
      token.role = userInDb.role;

      return token;
    },
    async session({ session, token, user }) {
      // console.log({ sessionToken: token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token) {
        // console.log(typeof token.role);
        session.user.role = token.role as UserRole;
      }

      // console.log({ session });
      return session;
    },
  },

  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
} satisfies NextAuthConfig;
