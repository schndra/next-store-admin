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
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = user.role === UserRole.ADMIN;
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
        // console.log(typeof token.role);
        session.user.role = token.role! as UserRole;
      }

      // console.log({ session });
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
