import authConfig from "./auth.config";
import NextAuth from "next-auth";
export const { auth } = NextAuth(authConfig);

import {
  LOGIN_REDIRECT,
  adminAuthPrefix,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/utils/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const user = req.auth?.user;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
  // const isAdminRoutes = adminRoutes.includes(nextUrl.pathname);
  const isAdminRoutes = nextUrl.pathname.startsWith(adminAuthPrefix);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  //navigate from empty admin page
  if (req.nextUrl.pathname === "/admin") {
    return Response.redirect(new URL("/admin/stats", nextUrl));
  }

  if (isAdminRoutes) {
    if (isLoggedIn) {
      if (user?.role === "USER") {
        return Response.redirect(new URL("/", nextUrl));
      }
      return;
    }
    return;
  }

  // console.log("USER", user?.role);
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
