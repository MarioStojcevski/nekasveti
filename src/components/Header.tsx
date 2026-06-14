import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Sparkles } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import headerTitles from "../utils/headerTitles";

const Header = ({ onCartOpen }: { onCartOpen: () => void }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { services } = useAppContext();

  const totalItems = services.reduce(
    (total, service) => total + (service.quantity || 1),
    0
  );

  const isHome = pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-xl border-b border-dark-600/50" />
      <div className="relative flex items-center justify-between h-14 sm:h-16 px-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          {!isHome && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-dark-700 text-slate-300 hover:bg-dark-600 hover:text-gold-400 transition-all active:scale-95"
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div className="flex items-center gap-1.5">
            <Sparkles size={isHome ? 22 : 18} className="text-gold-400" />
            <span className="font-display text-base sm:text-lg text-white font-semibold tracking-wide">
              нека блеска
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isHome && (
            <span className="text-sm text-slate-400 font-medium hidden sm:block">
              {headerTitles[pathname.replace(/\/$/, '')]}
            </span>
          )}
          <button
            onClick={onCartOpen}
            className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-dark-700 text-slate-300 hover:bg-dark-600 hover:text-gold-400 transition-all active:scale-95"
            aria-label="Cart"
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold-500 text-dark-900 text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
