import NextAuth, { User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";

import prisma from "./utils/db";
import { getUserByEmail } from "./utils/helpers";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: User & {
      role: UserRole;
    };
  }
}
declare module "@auth/core/jwt" {
  interface JWT {
    role?: UserRole;
  }
}

export const {
  handlers: { GET, POST },
  auth, // get current log in user session in server
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      // console.log({ token });
      const userInDb = await getUserByEmail(token.email!);

      token.role = userInDb?.role;

      return token;
    },
    async session({ session, token, user }) {
      // console.log({ sessionToken: token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token) {
        session.user.role = token.role!;
      }

      // console.log({ session });
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
