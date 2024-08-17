import { Button } from "@/components/ui/button";
import { Camera, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LandingImg from "@/assets/web_shopping.svg";
import Logo from "@/assets/logo.png";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import Slider from "@/components/store/Slider";
import ProductList from "@/components/store/ProductList";
import CategoryList from "@/components/store/CategoryList";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="">
        <Slider />
        <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <h1 className="text-2xl">Featured Products</h1>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_FEATURED_CATEGORY_ID!}
            limit={4}
          />
        </div>
        <div className="mt-24">
          <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
            Categories
          </h1>
          <CategoryList />
        </div>
        <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <h1 className="text-2xl">New Products</h1>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_NEW_CATEGORY_ID!}
            limit={4}
          />
        </div>
      </div>
      <Footer />
    </>
    // <main className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-foreground to-slate-950">
    //   <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6 flex gap-x-4 items-center">
    //     <Image src={Logo} alt="logo" className="w-10 h-10" />
    //     <h1 className="capitalize text-3xl md:text-3xl font-bold">Store</h1>
    //   </header>
    //   <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
    //     <div>
    //       <h1 className="capitalize text-4xl md:text-7xl font-bold">
    //         admin <span className="text-secondary">Dashboard</span>
    //       </h1>
    //       <p className="leading-loose max-w-md mt-4">
    //         Welcome to Our Clothing Shop Admin Dashboard! Effortlessly manage
    //         your store&apos;s operations with intuitive tools. Track sales,
    //         analyze trends, and streamline your online retail experience. Take
    //         control like never before.
    //       </p>
    //       <Button asChild className="mt-4">
    //         <Link href="/admin/overview">Get Started</Link>
    //       </Button>
    //     </div>
    //     <Image src={LandingImg} alt="landing" className="hidden lg:block" />
    //   </section>
    //   {/* <Button asChild>
    //     <Link href="/overview">Go to Stats page</Link>
    //   </Button> */}
    // </main>
  );
}
