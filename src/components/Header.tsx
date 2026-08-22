"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Phone, Images } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { getTotalItems } from "../utils/pricing";
import { getBackTarget } from "../utils/bookingFlow";

const Header = ({ onCartOpen }: { onCartOpen: () => void }) => {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const { services } = useAppContext();

  const totalItems = getTotalItems(services);

  const isHome = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");
  const isConfirmation = pathname === "/confirmation";
  const isGallery = pathname.startsWith("/gallery");

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-page-900/80 backdrop-blur-xl border-b border-page-500/50" />
      <div className="relative flex items-center justify-between h-14 sm:h-16 px-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          {!isHome && !isAdmin && !isConfirmation && (
            <button
              onClick={() => router.push(getBackTarget(pathname))}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-page-700 text-text-400 hover:bg-page-600 hover:text-copper-400 transition-all active:scale-95"
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <Link
            href="/"
            aria-label="mebelmajstor - почетна страница"
            className="flex items-center gap-1.5 hover:opacity-80 active:scale-[0.98] transition-all"
          >
            <Image
              src="/assets/logo.png"
              alt=""
              width={isHome ? 26 : 22}
              height={isHome ? 26 : 22}
              className="w-auto"
              priority
            />
            <span className="text-base sm:text-lg text-text-100 font-semibold tracking-wide">
              mebelmajstor
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {!isAdmin && (
            <a
              href="tel:+38971292398"
              className="flex items-center gap-1.5 text-sm text-copper-400 font-semibold hover:opacity-80 transition-opacity"
            >
              <Phone size={13} />
              <span className="hidden sm:inline">+389 71 292 398</span>
            </a>
          )}
          {!isAdmin && (
            <button
              onClick={() => router.push("/gallery")}
              className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all active:scale-95 ${
                isGallery
                  ? "bg-copper-500/30 text-copper-400"
                  : "bg-page-700 text-text-400 hover:bg-page-600 hover:text-copper-400"
              }`}
              aria-label="Галерија"
            >
              <Images size={18} />
            </button>
          )}
          {!isAdmin && (
            <button
              onClick={onCartOpen}
              className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-page-700 text-text-400 hover:bg-page-600 hover:text-copper-400 transition-all active:scale-95"
              aria-label="Cart"
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-copper-500 text-text-100 text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
