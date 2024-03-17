import Footer from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import SiteHeader from "@/components/SiteHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PropsWithChildren } from "react";
import MainNav from "./_components/main-nav";
import UserBtn from "@/components/auth/UserBtn";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/MobileNav";

function layout({ children }: PropsWithChildren) {
  return (
    <>
      <MainNav />
      <div className="flex-1 space-y-2 p-8 border-b min-h-[calc(100vh-12rem)] md:min-h-[calc(100vh-9.4rem)]">
        {children}
      </div>
      <Footer />
    </>
  );
}
export default layout;
