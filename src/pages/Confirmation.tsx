import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Home } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Confirmation = () => {
  const navigate = useNavigate();
  const { bookingRef } = useAppContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // If somehow navigated here without a ref, go home
  useEffect(() => {
    if (!bookingRef) {
      navigate("/", { replace: true });
    }
  }, [bookingRef, navigate]);

  if (!bookingRef) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] px-4 text-center">
      {/* Animated checkmark */}
      <div
        className={`transition-all duration-700 ease-out ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <div className="relative mb-8">
          {/* Glow */}
          <div className="absolute inset-0 bg-gold-500/30 blur-3xl rounded-full w-32 h-32 -top-4 -left-4" />
          {/* Circle */}
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-xl shadow-gold-500/30 animate-pulse-glow">
            <Sparkles size={40} className="text-dark-900" />
          </div>
        </div>
      </div>

      {/* Text */}
      <div
        className={`transition-all duration-700 delay-200 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="font-display text-3xl sm:text-4xl text-white mb-2">
          Резервацијата е закажана!
        </h1>
        <p className="text-base text-slate-400 mb-6 max-w-xs mx-auto leading-relaxed">
          Ви испративме потврда на вашиот телефон.
          <br />
          Нашиот тим ќе биде на вашата адреса на закажаниот датум.
        </p>
      </div>

      {/* Ref code */}
      <div
        className={`transition-all duration-700 delay-400 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-dark-800 border border-dark-600/50 mb-8">
          <span className="text-xs text-slate-500">Референца:</span>
          <span className="text-base font-bold text-gold-400 tracking-wider">
            {bookingRef}
          </span>
        </div>
      </div>

      {/* CTA */}
      <div
        className={`transition-all duration-700 delay-600 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-gold-500/20"
        >
          <Home size={16} />
          Почетна страна
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
