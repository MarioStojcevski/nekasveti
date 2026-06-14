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
    <div className="rounded-2xl bg-page-800 border border-page-500/50 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={16} className="text-copper-400" />
        <h3 className="text-sm font-semibold text-text-100">Избери Време</h3>
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
                  ? "bg-copper-500 text-text-100 font-semibold shadow-lg shadow-copper-400/20"
                  : booked
                  ? "bg-page-700/50 text-text-500 cursor-not-allowed line-through"
                  : "bg-page-700 text-text-300 hover:bg-page-600 hover:text-text-100"
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
