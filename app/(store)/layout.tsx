import Footer from "@/components/store/Footer";
import Navbar from "@/components/store/Navbar";
import { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
export default layout;
