import { useNavigate } from "react-router-dom";
import { Sparkles, Zap, ShieldCheck, Target } from "lucide-react";

const features = [
  { icon: Zap, text: "Брзо и ефикасно", desc: "Закажи за 2 минути" },
  { icon: ShieldCheck, text: "Професионално", desc: "Сертифицирани експерти" },
  { icon: Target, text: "Гарантирано", desc: "Резултати или враќање на пари" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-4rem)] pt-6 sm:pt-12">
      {/* Top section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 w-full">
        {/* Sparkle decorative */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gold-500/20 blur-3xl rounded-full w-24 h-24 -top-6 -left-6 animate-pulse" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-xl shadow-gold-500/20">
            <Sparkles size={30} className="text-dark-900" />
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white text-center leading-tight mb-3">
          нека блеска
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 text-center max-w-xs leading-relaxed mb-8">
          Професионално хемиско чистење.
          <br />
          Закажи за 2 минути.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate("/services")}
          className="w-full max-w-xs py-4 px-8 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 font-bold text-base shadow-lg shadow-gold-500/25 hover:shadow-xl hover:shadow-gold-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          Започни сега →
        </button>
      </div>

      {/* Bottom features */}
      <div className="w-full max-w-sm px-4 pb-6 sm:pb-10 mt-8">
        <div className="grid grid-cols-3 gap-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.text}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-dark-800 border border-dark-600/50"
              >
                <div className="w-9 h-9 rounded-xl bg-dark-700 flex items-center justify-center">
                  <Icon size={16} className="text-gold-400" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-white">{f.text}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
