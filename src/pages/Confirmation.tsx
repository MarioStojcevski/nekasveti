import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Home } from "lucide-react";
import PageBg from "../components/PageBg";
import { useAppContext } from "../context/AppContext";

const Confirmation = () => {
  const navigate = useNavigate();
  const { bookingRef, resetAll } = useAppContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!bookingRef) {
      navigate("/", { replace: true });
    }
  }, [bookingRef, navigate]);

  if (!bookingRef) return null;

  const handleHome = () => {
    resetAll();
    navigate("/");
  };

  return (
    <PageBg image="skopje">
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] px-4 text-center">
      <div
        className={`transition-all duration-700 ease-out ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-copper-400/30 blur-3xl rounded-full w-32 h-32 -top-4 -left-4" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-copper-400 to-copper-600 flex items-center justify-center shadow-xl shadow-copper-400/30 animate-pulse-glow">
            <Sparkles size={40} className="text-text-100" />
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-700 delay-200 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="text-3xl sm:text-4xl text-text-100 mb-2 font-bold">
          Резервацијата е закажана!
        </h1>
        <p className="text-base text-text-400 mb-6 max-w-xs mx-auto leading-relaxed">
          Нашиот тим ќе ве контактира на телефон за потврда.
          <br />
          Нашиот тим ќе биде на вашата адреса на закажаниот датум.
        </p>
      </div>

      <div
        className={`transition-all duration-700 delay-400 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-page-800 border border-page-500/50 mb-8">
          <span className="text-xs text-text-500">Референца:</span>
          <span className="text-base font-bold text-copper-400 tracking-wider">
            {bookingRef}
          </span>
        </div>
      </div>

      <div
        className={`transition-all duration-700 delay-600 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={handleHome}
          className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-copper-500 to-copper-400 text-text-100 font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-copper-400/20"
        >
          <Home size={16} />
          Почетна страна
        </button>
      </div>
    </div>
    </PageBg>
  );
};

export default Confirmation;
