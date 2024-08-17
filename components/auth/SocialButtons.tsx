"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { LOGIN_REDIRECT } from "@/utils/routes";
import { useSession, signIn, signOut } from "next-auth/react";

function SocialButtons() {
  const handleClick = (provider: "github" | "google") => {
    signIn(provider, {
      callbackUrl: LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex flex-col items-center w-full gap-y-2">
      <Button
        size="lg"
        className="flex w-full gap-x-4 "
        variant="outline"
        onClick={() => {
          handleClick("google");
        }}
      >
        <FcGoogle className="h-5 w-5" />
        <span>Sign in with Google</span>
      </Button>
      {/* <Button
        size="lg"
        className="flex w-full gap-x-4"
        variant="outline"
        onClick={() => {
          handleClick("github");
        }}
      >
        <FaGithub className="h-5 w-5" />
        <span>Sign in with Github</span>
      </Button> */}
    </div>
  );
}
export default SocialButtons;
