import React from "react";
import { logoutAction } from "@/actions/logout";

const LogoutButton = React.forwardRef<
  HTMLSpanElement,
  { children: React.ReactNode }
>((props, ref) => {
  const { children } = props;

  const handleClick = () => {
    logoutAction();
  };

  return (
    <span onClick={handleClick} className="cursor-pointer" ref={ref}>
      {children}
    </span>
  );
});

LogoutButton.displayName = "LogoutButton"; // Required for display name in debugging

export default LogoutButton;
