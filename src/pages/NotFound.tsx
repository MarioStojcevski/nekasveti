import { useNavigate } from "react-router-dom";
import { Sparkles, Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-4 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-copper-400/20 blur-3xl rounded-full w-20 h-20 -top-4 -left-4 animate-pulse" />
        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-copper-400 to-copper-600 flex items-center justify-center shadow-xl shadow-copper-400/20">
          <Sparkles size={26} className="text-text-100" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-text-100 mb-2">
        Оваа страница не постои
      </h1>
      <p className="text-sm text-text-400 max-w-xs leading-relaxed mb-8">
        Изгледа дека сте се загубиле. Вратете се на почетната страница и обидете се повторно.
      </p>

      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-copper-500 to-copper-400 text-text-100 font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-copper-400/20"
      >
        <Home size={16} />
        Почетна страна
      </button>
    </div>
  );
};

export default NotFound;
