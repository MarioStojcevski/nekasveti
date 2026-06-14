import { useState, useEffect } from "react";
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

  const selectedDate = calendarValue ? dayjs(calendarValue).toDate() : undefined;

  // Fetch all booked dates for the current month
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

  // Fetch booked time slots for the selected date
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

  // Disable days more than 60 days out
  const maxDate = dayjs().add(60, "day").toDate();

  const allDisabled = (date: Date) => {
    if (date < new Date()) return true;
    if (date > maxDate) return true;
    return false;
  };

  return (
    <div className="flex flex-col gap-3 pt-2 pb-4">
      {/* Header */}
      <div className="text-center mb-1">
        <h1 className="font-display text-2xl sm:text-3xl text-white mb-1">
          Избери Термин
        </h1>
        <p className="text-sm text-slate-400">
          Изберете датум, време и адреса
        </p>
      </div>

      {/* Calendar */}
      <div className="rounded-2xl bg-dark-800 border border-dark-600/50 p-3 flex justify-center">
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
            hasBooking: { textDecoration: "underline", textDecorationColor: "#d4a853", textUnderlineOffset: "4px", textDecorationThickness: "2px" },
          }}
        />
      </div>

      {/* Time Slot Grid */}
      <TimeSlotGrid
        selectedTime={timeValue}
        onSelect={setTimeValue}
        bookedSlots={bookedSlots}
      />

      {/* Address Map */}
      <AddressMap location={location} onLocationChange={setLocation} />

      {/* Next Button */}
      <div className="sticky bottom-20 z-30 pt-2 pb-4">
        <button
          onClick={() => navigate("/client-info")}
          disabled={!calendarValue || !timeValue || !location}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          Продолжи кон податоци
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Schedule;
