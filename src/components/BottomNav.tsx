"use client";

import { usePathname, useRouter } from "next/navigation";
import { Package, Calendar, FileText, CheckCircle } from "lucide-react";
import { bookingSteps } from "../utils/bookingFlow";

const stepIcons = [Package, Calendar, FileText, CheckCircle];

const BottomNav = () => {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  const isHome = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");
  const isConfirmation = pathname === "/confirmation";
  const isGallery = pathname.startsWith("/gallery");

  if (isHome || isConfirmation || isAdmin || isGallery) return null;

  const currentIndex = bookingSteps.findIndex((s) =>
    pathname.startsWith(s.path)
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-page-900/90 backdrop-blur-xl border-t border-page-500/50" />
      <div className="relative flex items-center justify-around h-16 max-w-lg mx-auto px-4">
        {bookingSteps.map((step, i) => {
          const Icon = stepIcons[i];
          const isActive = i === currentIndex;
          const isPast = i < currentIndex;

          let bg = "bg-page-600";
          let textColor = "text-text-500";
          let iconColor = "text-text-500";

          if (isActive) {
            bg = "bg-copper-500";
            textColor = "text-copper-400";
            iconColor = "text-text-100";
          } else if (isPast) {
            bg = "bg-copper-500/30";
            textColor = "text-text-400";
            iconColor = "text-copper-400";
          }

          return (
            <button
              key={step.path}
              onClick={() => {
                if (i <= currentIndex + 1) router.push(step.path);
              }}
              className="flex flex-col items-center gap-1 min-w-0 flex-1"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${bg} ${isActive ? 'shadow-lg shadow-copper-400/20' : ''}`}>
                <Icon size={15} className={iconColor} />
              </div>
              <span className={`text-[10px] font-medium leading-none ${textColor} transition-colors`}>
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
