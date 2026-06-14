import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const CartModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { services, setServices } = useAppContext();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const updateQuantity = (id: string, delta: number) => {
    setServices(
      services
        .map((s) =>
          s.id === id ? { ...s, quantity: (s.quantity || 1) + delta } : s
        )
        .filter((s) => (s.quantity || 0) > 0)
    );
  };

  const removeService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const totalPrice = services.reduce(
    (sum, s) => sum + s.price * (s.quantity || 1),
    0
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[70] max-w-lg mx-auto bg-dark-800 rounded-t-3xl border border-dark-600/50 max-h-[85vh] flex flex-col"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-dark-500" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3 border-b border-dark-600/50">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-gold-400" />
                <h2 className="text-lg font-semibold text-white">Кошничка</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-dark-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {services.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-slate-500 text-sm">Нема избрани услуги</p>
                </div>
              ) : (
                services.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center gap-3 bg-dark-700 rounded-xl p-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {service.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {service.price} ден × {service.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(service.id, -1)}
                        className="w-7 h-7 rounded-lg bg-dark-600 text-slate-400 hover:text-gold-400 flex items-center justify-center transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-sm font-semibold text-white w-6 text-center">
                        {service.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(service.id, 1)}
                        className="w-7 h-7 rounded-lg bg-dark-600 text-slate-400 hover:text-gold-400 flex items-center justify-center transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeService(service.id)}
                      className="w-7 h-7 rounded-lg bg-dark-600 text-red-400/70 hover:text-red-400 flex items-center justify-center transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {services.length > 0 && (
              <div className="px-5 py-4 border-t border-dark-600/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-400">Вкупно:</span>
                  <span className="text-xl font-bold text-gold-400">
                    {totalPrice} ден.
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-gold-500 text-dark-900 font-semibold text-sm hover:bg-gold-400 transition-colors active:scale-[0.98]"
                >
                  Затвори
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
