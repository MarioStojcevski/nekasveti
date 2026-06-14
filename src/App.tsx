import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import CartModal from "./components/CartModal";

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isConfirmation = pathname === "/confirmation";
  const isAdmin = pathname.startsWith("/admin");
  const showBottomNav = !isHome && !isConfirmation && !isAdmin;

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <Header onCartOpen={() => setCartOpen(true)} />
      <main
        className={`flex-1 w-full max-w-lg mx-auto px-4 ${
          isHome ? "pt-0" : "pt-14 sm:pt-16"
        } ${showBottomNav ? "pb-20" : "pb-6"} ${isAdmin ? "max-w-4xl" : ""}`}
      >
        <Outlet />
      </main>
      <BottomNav />
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default App;
