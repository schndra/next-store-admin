"use client";
// import Link from "next/link";

import UserBtn from "@/components/auth/UserBtn";
import { MobileNav } from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import links, { NavLink } from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/logo.png";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {}

function MainNav({ className, ...props }: MainNavProps) {
  const pathname = usePathname();

  const formatedRoutes: (NavLink & { active: boolean })[] = links.map(
    (item) => {
      return {
        ...item,
        // active: pathname === item.href,
        active: pathname.startsWith(item.href),
      };
    }
  );

  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          {/* Logo */}
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Image src={Logo} alt="log" width={24} height={24} />
              <span className="hidden font-bold sm:inline-block">Store</span>
            </Link>
          </div>
          {/* MAIN NAVIGATION ITEMS */}
          <nav
            className={cn(
              "hidden md:flex items-center space-x-4 lg:space-x-6",
              className
            )}
            {...props}
          >
            {formatedRoutes.map((route, i) => (
              <Link
                key={`${route}-${i}`}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  route.active ? "text-primary" : " text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
          {/* MOBILE NAVIGATION */}
          <MobileNav />
          {/* USER BUTTON WITH THEME TOGGLE */}
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center  gap-x-4 ">
              <ThemeToggle />
              <UserBtn />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MainNav;
