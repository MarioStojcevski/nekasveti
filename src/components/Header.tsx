import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Sparkles, Phone } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Header = ({ onCartOpen }: { onCartOpen: () => void }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { services } = useAppContext();

  const totalItems = services.reduce(
    (total, service) => total + (service.quantity || 1),
    0
  );

  const isHome = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-page-900/80 backdrop-blur-xl border-b border-page-500/50" />
      <div className="relative flex items-center justify-between h-14 sm:h-16 px-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          {!isHome && !isAdmin && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-page-700 text-text-400 hover:bg-page-600 hover:text-copper-400 transition-all active:scale-95"
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div className="flex items-center gap-1.5">
            <Sparkles size={isHome ? 22 : 18} className="text-copper-400" />
            <span className="text-base sm:text-lg text-text-100 font-semibold tracking-wide">
              нека свети
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isAdmin && (
            <a
              href="tel:+38971292398"
              className="flex items-center gap-1.5 text-sm text-copper-400 font-semibold hover:opacity-80 transition-opacity"
            >
              <Phone size={13} />
              +389 71 292 398
            </a>
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
