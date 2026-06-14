import { useNavigate } from "react-router-dom";
import { Sparkles, Zap, ShieldCheck, Target } from "lucide-react";
import PageBg from "../components/PageBg";

const features = [
  { icon: Zap, text: "Брзо и ефикасно", desc: "Закажи за 2 минути" },
  { icon: ShieldCheck, text: "Професионално", desc: "Сертифицирани експерти" },
  { icon: Target, text: "Гарантирано", desc: "Резултати или враќање на пари" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <PageBg image="funky">
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-4rem)] pt-6 sm:pt-12">
      <div className="flex-1 flex flex-col items-center justify-center px-4 w-full">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-copper-400/20 blur-3xl rounded-full w-24 h-24 -top-6 -left-6 animate-pulse" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-copper-400 to-copper-600 flex items-center justify-center shadow-xl shadow-copper-400/20">
            <Sparkles size={30} className="text-text-100" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl text-text-100 text-center leading-tight mb-3 font-bold">
          нека свети
        </h1>

        <p className="text-base sm:text-lg text-text-400 text-center max-w-xs leading-relaxed mb-8">
          Професионално хемиско чистење.
          <br />
          Закажи за 2 минути.
        </p>

        <button
          onClick={() => navigate("/services")}
          className="w-full max-w-xs py-4 px-8 rounded-2xl bg-gradient-to-r from-copper-500 to-copper-400 text-text-100 font-bold text-base shadow-lg shadow-copper-400/25 hover:shadow-xl hover:shadow-copper-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          Започни сега →
        </button>
      </div>

      <div className="w-full max-w-sm px-4 pb-6 sm:pb-10 mt-8">
        <div className="grid grid-cols-3 gap-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.text}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-page-800 border border-page-500/50"
              >
                <div className="w-9 h-9 rounded-xl bg-page-700 flex items-center justify-center">
                  <Icon size={16} className="text-copper-400" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-text-100">{f.text}</p>
                  <p className="text-[10px] text-text-500 mt-0.5">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </PageBg>
  );
};

export default Home;
