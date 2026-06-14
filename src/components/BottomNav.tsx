import { useLocation, useNavigate } from "react-router-dom";
import { Package, Calendar, FileText, CheckCircle } from "lucide-react";

const steps = [
  { path: "/services", label: "Услуги", icon: Package },
  { path: "/schedule", label: "Термин", icon: Calendar },
  { path: "/client-info", label: "Податоци", icon: FileText },
  { path: "/summary", label: "Преглед", icon: CheckCircle },
];

const BottomNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isHome = pathname === "/";
  const isConfirmation = pathname === "/confirmation";

  if (isHome || isConfirmation) return null;

  const currentIndex = steps.findIndex((s) => pathname.startsWith(s.path));

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-dark-900/90 backdrop-blur-xl border-t border-dark-600/50" />
      <div className="relative flex items-center justify-around h-16 max-w-lg mx-auto px-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === currentIndex;
          const isPast = i < currentIndex;

          let dotColor = "bg-dark-600";
          let textColor = "text-slate-500";
          let iconColor = "text-slate-600";

          if (isActive) {
            dotColor = "bg-gold-500";
            textColor = "text-gold-400";
            iconColor = "text-gold-400";
          } else if (isPast) {
            dotColor = "bg-gold-500/50";
            textColor = "text-slate-400";
            iconColor = "text-slate-400";
          }

          return (
            <button
              key={step.path}
              onClick={() => {
                if (i <= currentIndex + 1) navigate(step.path);
              }}
              className="flex flex-col items-center gap-1 min-w-0 flex-1"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${dotColor} ${isActive ? 'shadow-lg shadow-gold-500/20' : ''}`}>
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
