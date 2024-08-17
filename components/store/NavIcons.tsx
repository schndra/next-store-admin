"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserBtn from "../auth/UserBtn";
import { useCurrentUser } from "@/hooks/use-current-user";
import CartModal from "./CartModal";
import useCart from "@/hooks/use-cart-store";
// import CartModal from "./CartModal";
// import { useWixClient } from "@/hooks/useWixClient";
// import Cookies from "js-cookie";
// import { useCartStore } from "@/hooks/useCartStore";

const NavIcons = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  const user = useCurrentUser();
  const { items } = useCart();
  const isLoggedIn = user !== undefined;

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  };

  //   const { cart, counter, getCart } = useCartStore();

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      {isLoggedIn ? (
        <UserBtn />
      ) : (
        <Image
          src="/profile.png"
          alt=""
          width={22}
          height={22}
          className="cursor-pointer"
          // onClick={login}
          onClick={handleProfile}
        />
      )}
      <Image
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/cart.png" alt="" width={22} height={22} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          {items.length}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
