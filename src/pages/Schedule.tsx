import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import dayjs from "dayjs";
import { ArrowRight, XCircle } from "lucide-react";
import PageBg from "../components/PageBg";
import { useAppContext } from "../context/AppContext";
import { supabase } from "../lib/supabase";
import AddressMap from "../components/AddressMap";
import TimeSlotGrid from "../components/TimeSlotGrid";

const ALL_SLOTS = ["09:00 - 13:00", "13:00 - 17:00"];

const Schedule = () => {
  const navigate = useNavigate();
  const { calendarValue, setCalendarValue, timeValue, setTimeValue, location, setLocation } =
    useAppContext();
  const [monthlyData, setMonthlyData] = useState<{ date: string; time: string }[]>([]);
  const [month, setMonth] = useState<Date>(new Date());
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedDate = calendarValue ? dayjs(calendarValue).toDate() : undefined;

  useEffect(() => {
    const firstDay = dayjs(month).startOf("month").format("YYYY-MM-DD");
    const lastDay = dayjs(month).endOf("month").format("YYYY-MM-DD");

    supabase
      .from("bookings")
      .select("date, time")
      .gte("date", firstDay)
      .lte("date", lastDay)
      .then(({ data, error }) => {
        if (error) {
          console.error("Failed to fetch monthly bookings:", error);
          setMonthlyData([]);
        } else {
          setMonthlyData(data ?? []);
        }
      });
  }, [month]);

  const bookedDates = useMemo(() => {
    const unique = new Set(monthlyData.map((b) => b.date));
    return [...unique].map((d) => dayjs(d).toDate());
  }, [monthlyData]);

  const fullyBookedDates = useMemo(() => {
    const counts: Record<string, number> = {};
    monthlyData.forEach((b) => {
      counts[b.date] = (counts[b.date] || 0) + 1;
    });
    return Object.entries(counts)
      .filter(([, count]) => count >= ALL_SLOTS.length)
      .map(([dateStr]) => dayjs(dateStr).toDate());
  }, [monthlyData]);

  const bookedSlots = useMemo(() => {
    if (!calendarValue) return [];
    return monthlyData
      .filter((b) => b.date === calendarValue)
      .map((b) => b.time);
  }, [monthlyData, calendarValue]);

  const isFullyBooked = calendarValue
    ? fullyBookedDates.some((d) => dayjs(d).format("YYYY-MM-DD") === calendarValue)
    : false;

  const handleDateSelect = (date: Date | undefined) => {
    setCalendarValue(date ? dayjs(date).format("YYYY-MM-DD") : null);
  };

  useEffect(() => {
    if (timeValue && (bookedSlots.includes(timeValue) || isFullyBooked)) {
      setTimeValue(null);
    }
  }, [bookedSlots, isFullyBooked, timeValue, setTimeValue]);

  const maxDate = dayjs().add(60, "day").toDate();

  const allDisabled = (date: Date) => {
    if (date < new Date()) return true;
    if (date > maxDate) return true;
    const dateStr = dayjs(date).format("YYYY-MM-DD");
    if (fullyBookedDates.some((d) => dayjs(d).format("YYYY-MM-DD") === dateStr)) return true;
    return false;
  };

  return (
    <PageBg image="balcony">
    <div className="flex flex-col h-full pt-2">
      <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden pb-28 space-y-3 px-0">
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

        {isFullyBooked && (
          <div className="rounded-2xl bg-red-500/10 border border-red-400/30 p-3 flex items-start gap-2">
            <XCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-300 leading-relaxed">
              Сите термини за овој ден се резервирани. Изберете друг датум.
            </p>
          </div>
        )}

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
          disabled={!calendarValue || !timeValue || !location || isFullyBooked}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-copper-500 to-copper-400 text-text-100 font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          Продолжи кон податоци
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
    </PageBg>
  );
};

export default Schedule;
