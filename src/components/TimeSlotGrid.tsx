import { useMemo } from "react";
import { Clock } from "lucide-react";

type TimeSlotGridProps = {
  selectedTime: string | null;
  onSelect: (time: string) => void;
  bookedSlots?: string[];
};

const generateSlots = () => {
  const slots: string[] = [];
  for (let h = 8; h <= 19; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 20) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
};

const TimeSlotGrid = ({
  selectedTime,
  onSelect,
  bookedSlots = [],
}: TimeSlotGridProps) => {
  const slots = useMemo(() => generateSlots(), []);

  const isBooked = (slot: string) => bookedSlots.includes(slot);

  return (
    <div className="rounded-2xl bg-dark-800 border border-dark-600/50 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={16} className="text-gold-400" />
        <h3 className="text-sm font-semibold text-white">Избери Време</h3>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {slots.map((slot) => {
          const booked = isBooked(slot);
          const active = selectedTime === slot;

          return (
            <button
              key={slot}
              onClick={() => !booked && onSelect(slot)}
              disabled={booked}
              className={`py-2.5 px-2 rounded-xl text-xs font-medium transition-all active:scale-95 ${
                active
                  ? "bg-gold-500 text-dark-900 font-semibold shadow-lg shadow-gold-500/20"
                  : booked
                  ? "bg-dark-600/50 text-slate-600 cursor-not-allowed line-through"
                  : "bg-dark-700 text-slate-300 hover:bg-dark-600 hover:text-white"
              }`}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotGrid;
