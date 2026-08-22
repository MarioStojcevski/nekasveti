"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Zap, ShieldCheck, Target, ArrowRight, Images } from "lucide-react";
import PageBg from "@/components/PageBg";

const features = [
  { icon: Zap, num: "01", text: "Брзо и ефикасно", desc: "Закажи за 2 минути" },
  {
    icon: ShieldCheck,
    num: "02",
    text: "Професионално",
    desc: "Сертифицирани експерти",
  },
  {
    icon: Target,
    num: "03",
    text: "Гарантирано",
    desc: "Резултати или враќање на пари",
  },
];

const Home = () => {
  const router = useRouter();

  return (
    <PageBg image="funky">
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-4rem)] pt-20 sm:pt-24 pb-2">
      <div className="flex-1 flex flex-col items-center justify-center px-4 w-full">
        <div className="relative mb-4 animate-rise">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-copper-400/25 blur-3xl rounded-full animate-pulse" />
          </div>
          <Image
            src="/assets/logo.png"
            alt="mebelmajstor"
            width={88}
            height={88}
            priority
            className="relative"
          />
        </div>

        <h1
          className="animate-rise text-2xl sm:text-3xl text-text-100 text-center font-semibold tracking-wide mb-2"
          style={{ animationDelay: "0.06s" }}
        >
          mebelmajstor
        </h1>

        <p
          className="animate-rise text-sm text-text-400 text-center mb-9"
          style={{ animationDelay: "0.12s" }}
        >
          Професионално хемиско чистење
        </p>

        <button
          onClick={() => router.push("/services")}
          className="animate-rise group flex items-center justify-center gap-2 w-full max-w-xs py-4 px-8 rounded-2xl bg-gradient-to-r from-copper-500 to-copper-400 text-text-100 font-bold text-base shadow-lg shadow-copper-400/30 hover:shadow-xl hover:shadow-copper-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          style={{ animationDelay: "0.18s" }}
        >
          Закажи термин
          <ArrowRight
            size={18}
            strokeWidth={2.5}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>

        <p
          className="animate-rise text-xs text-text-500 mt-3"
          style={{ animationDelay: "0.24s" }}
        >
          за помалку од 2 минути
        </p>

        <button
          onClick={() => router.push("/gallery")}
          className="animate-rise inline-flex items-center gap-1.5 mt-6 py-2 px-4 rounded-xl text-sm font-semibold text-text-400 hover:text-copper-500 bg-page-800/60 hover:bg-page-700/60 border border-page-500/40 hover:border-copper-400/30 transition-all active:scale-[0.98]"
          style={{ animationDelay: "0.3s" }}
        >
          <Images size={15} />
          Видете ја нашата галерија
        </button>
      </div>

      <div className="w-full max-w-md px-4 pb-6 sm:pb-10 mt-8">
        <div
          className="animate-rise relative rounded-[1.75rem] bg-white/80 backdrop-blur-md border border-page-500/60 shadow-[0_24px_50px_-24px_rgba(26,26,26,0.18)] overflow-hidden"
          style={{ animationDelay: "0.28s" }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper-400/60 to-transparent" />
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.num}
                className="animate-rise group relative flex items-center gap-3.5 px-4 sm:px-5 py-3.5 transition-colors duration-200 hover:bg-page-700/40 active:bg-page-700/60"
                style={{ animationDelay: `${0.36 + i * 0.08}s` }}
              >
                {i > 0 && (
                  <div className="absolute inset-x-4 top-0 h-px bg-page-500/40" />
                )}

                <div className="relative flex-shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-copper-400/15 to-copper-200/5 ring-1 ring-copper-400/30 flex items-center justify-center overflow-hidden">
                  <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-copper-300/25 blur-md transition-transform duration-300 group-hover:scale-150" />
                  <Icon
                    size={19}
                    strokeWidth={2.2}
                    className="relative text-copper-500"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-100 leading-tight">
                    {f.text}
                  </p>
                  <p className="text-xs text-text-400 mt-0.5 leading-snug">
                    {f.desc}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="flex-shrink-0 text-3xl font-bold leading-none select-none transition-colors duration-200 group-hover:text-copper-400/50"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1px var(--color-page-500)",
                  }}
                >
                  {f.num}
                </span>
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
