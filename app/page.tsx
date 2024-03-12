import { Button } from "@/components/ui/button";
import { Camera, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LandingImg from "@/assets/web_shopping.svg";
import Logo from "@/assets/logo.png";

export default function Home() {
  return (
    <main className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-foreground to-slate-950">
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6 flex gap-x-4 items-center">
        <Image src={Logo} alt="logo" className="w-10 h-10" />
        <h1 className="capitalize text-3xl md:text-3xl font-bold">Store</h1>
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            admin <span className="text-secondary">Dashboard</span>
          </h1>
          <p className="leading-loose max-w-md mt-4">
            Welcome to Our Clothing Shop Admin Dashboard! Effortlessly manage
            your store&apos;s operations with intuitive tools. Track sales,
            analyze trends, and streamline your online retail experience. Take
            control like never before.
          </p>
          <Button asChild className="mt-4">
            <Link href="/admin/stats">Get Started</Link>
          </Button>
        </div>
        <Image src={LandingImg} alt="landing" className="hidden lg:block" />
      </section>
      {/* <Button asChild>
        <Link href="/stats">Go to Stats page</Link>
      </Button> */}
    </main>
  );
}
