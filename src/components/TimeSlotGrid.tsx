import { Sun, Moon } from "lucide-react";

type TimeSlotGridProps = {
  selectedTime: string | null;
  onSelect: (time: string) => void;
  bookedSlots?: string[];
};

const SLOTS = [
  { value: "09:00 - 13:00", label: "Претпладне", icon: Sun },
  { value: "13:00 - 17:00", label: "Попладне", icon: Moon },
];

const TimeSlotGrid = ({
  selectedTime,
  onSelect,
  bookedSlots = [],
}: TimeSlotGridProps) => {
  return (
    <div className="rounded-2xl bg-page-800 border border-page-500/50 p-4">
      <h3 className="text-sm font-semibold text-text-100 mb-3">
        Избери термин
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {SLOTS.map(({ value, label, icon: Icon }) => {
          const booked = bookedSlots.includes(value);
          const active = selectedTime === value;

          return (
            <button
              key={value}
              onClick={() => !booked && onSelect(value)}
              disabled={booked}
              className={`flex flex-col items-center gap-2 py-4 px-3 rounded-xl text-sm font-medium transition-all active:scale-[0.97] ${
                active
                  ? "bg-copper-500 text-text-100 shadow-lg shadow-copper-400/20"
                  : booked
                  ? "bg-page-700/50 text-text-500 cursor-not-allowed line-through"
                  : "bg-page-700 text-text-300 hover:bg-page-600 hover:text-text-100 border border-transparent hover:border-copper-400/30"
              }`}
            >
              <Icon size={20} />
              <span className="leading-tight text-center">{label}</span>
              <span className="text-[11px] opacity-70">{value}</span>
              {booked && <span className="text-[10px] text-red-400 font-semibold">Резервирано</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotGrid;
