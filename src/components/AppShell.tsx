"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import BottomNav from "./BottomNav";
import CartModal from "./CartModal";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname() ?? "";
  const isHome = pathname === "/";
  const isConfirmation = pathname === "/confirmation";
  const isAdmin = pathname.startsWith("/admin");
  const isGallery = pathname.startsWith("/gallery");
  const showBottomNav =
    !isHome && !isConfirmation && !isAdmin && !isGallery;

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <Header onCartOpen={() => setCartOpen(true)} />
      <main
        className={`flex-1 w-full max-w-lg mx-auto px-4 ${
          isHome ? "pt-0" : "pt-14 sm:pt-16"
        } ${showBottomNav ? "pb-20" : "pb-6"} ${
          isAdmin ? "sm:max-w-3xl lg:max-w-5xl 2xl:max-w-7xl" : ""
        }`}
      >
        {children}
      </main>
      <BottomNav />
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default AppShell;
