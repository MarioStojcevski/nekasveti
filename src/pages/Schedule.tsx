import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { supabase } from "../lib/supabase";
import AddressMap from "../components/AddressMap";
import TimeSlotGrid from "../components/TimeSlotGrid";

const Schedule = () => {
  const navigate = useNavigate();
  const { calendarValue, setCalendarValue, timeValue, setTimeValue, location, setLocation } =
    useAppContext();
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [month, setMonth] = useState<Date>(new Date());
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedDate = calendarValue ? dayjs(calendarValue).toDate() : undefined;

  useEffect(() => {
    const firstDay = dayjs(month).startOf("month").format("YYYY-MM-DD");
    const lastDay = dayjs(month).endOf("month").format("YYYY-MM-DD");

    supabase
      .from("bookings")
      .select("date")
      .gte("date", firstDay)
      .lte("date", lastDay)
      .then(({ data }) => {
        if (data) {
          const dates = data.map((b) => dayjs(b.date).toDate());
          setBookedDates(dates);
        }
      });
  }, [month]);

  useEffect(() => {
    if (calendarValue) {
      supabase
        .from("bookings")
        .select("time")
        .eq("date", calendarValue)
        .then(({ data }) => {
          if (data) setBookedSlots(data.map((b) => b.time.slice(0, 5)));
          else setBookedSlots([]);
        });
    }
  }, [calendarValue]);

  const handleDateSelect = (date: Date | undefined) => {
    setCalendarValue(date ? dayjs(date).format("YYYY-MM-DD") : null);
  };

  const maxDate = dayjs().add(60, "day").toDate();

  const allDisabled = (date: Date) => {
    if (date < new Date()) return true;
    if (date > maxDate) return true;
    return false;
  };

  return (
    <div className="flex flex-col h-full pt-2">
      <div ref={scrollRef} className="flex-1 overflow-y-auto pb-28 space-y-3 px-0">
        <div className="text-center mb-1">
          <h1 className="text-2xl sm:text-3xl text-text-100 mb-1 font-bold">
            Избери Термин
          </h1>
          <p className="text-sm text-text-400">
            Изберете датум, време и адреса
          </p>
        </div>

        <div className="rounded-2xl bg-page-800 border border-page-500/50 p-3 flex justify-center">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            month={month}
            onMonthChange={setMonth}
            disabled={allDisabled}
            showOutsideDays={false}
            modifiers={{ hasBooking: bookedDates }}
            modifiersStyles={{
              hasBooking: { textDecoration: "underline", textDecorationColor: "#e8854a", textUnderlineOffset: "4px", textDecorationThickness: "2px" },
            }}
          />
        </div>

        <TimeSlotGrid
          selectedTime={timeValue}
          onSelect={setTimeValue}
          bookedSlots={bookedSlots}
        />

        <AddressMap location={location} onLocationChange={setLocation} />
      </div>

      <div className="fixed bottom-16 left-0 right-0 z-40 px-4 pb-3 max-w-lg mx-auto">
        <button
          onClick={() => navigate("/client-info")}
          disabled={!calendarValue || !timeValue || !location}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-copper-500 to-copper-400 text-text-100 font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          Продолжи кон податоци
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Schedule;
