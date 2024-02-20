"use client";

import { logoutAction } from "@/actions/logout";

function LogoutButton({ children }: { children: React.ReactNode }) {
  const handleClick = () => {
    logoutAction();
  };

  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
}
export default LogoutButton;
