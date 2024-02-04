import { Sidebar } from "@/components/Sidebar";
import SiteHeader from "@/components/SiteHeader";
import { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return (
    <main className="grid lg:grid-cols-5">
      <div className="grid col-span-5">
        <SiteHeader />
      </div>
      {/*  hide on small screen */}
      <div className="hidden lg:block lg:col-span-1 lg:min-h-screen">
        <Sidebar />
      </div>
      <div className="lg:col-span-4">
        <div className="py-16 px-4 sm:px-8 lg:px-16">{children}</div>
      </div>
      <div className="grid col-span-5">
        <h1>footer</h1>
      </div>
    </main>
  );
}
export default layout;
