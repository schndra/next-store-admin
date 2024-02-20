import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import { MobileNav } from "./MobileNav";
import ThemeToggle from "./ThemeToggle";
import UserBtn from "./auth/UserBtn";

async function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src={Logo} alt="log" width={24} height={24} />
            <span className="hidden font-bold sm:inline-block">Store</span>
          </Link>
        </div>
        <MobileNav />
        <div className="flex items-center  gap-x-4 ">
          <ThemeToggle />
          <UserBtn />
        </div>
      </div>
    </header>
  );
}
export default SiteHeader;
