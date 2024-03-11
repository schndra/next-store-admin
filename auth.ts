import NextAuth from "next-auth";
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth, // get current log in user session in server
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
});
