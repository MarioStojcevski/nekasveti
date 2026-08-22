"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { DayPicker } from "react-day-picker";
import dayjs from "dayjs";
import { ArrowRight, XCircle } from "lucide-react";
import PageBg from "@/components/PageBg";
import { useAppContext } from "@/context/AppContext";
import TimeSlotGrid from "@/components/TimeSlotGrid";
import { fetchMonthlySlots, type BookingSlot } from "@/lib/bookings";
import { isDayFullyBooked } from "@/utils/slots";
import { toDateKey } from "@/utils/date";

// Leaflet relies on `window`, so it must never render on the server.
const AddressMap = dynamic(() => import("@/components/AddressMap"), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl bg-page-800 border border-page-500/50 h-48 sm:h-64 animate-pulse" />
  ),
});

const BOOKING_WINDOW_DAYS = 60;

const Schedule = () => {
  const router = useRouter();
  const { calendarValue, setCalendarValue, timeValue, setTimeValue, location, setLocation } =
    useAppContext();
  const [monthlySlots, setMonthlySlots] = useState<BookingSlot[]>([]);
  const [month, setMonth] = useState<Date>(new Date());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    fetchMonthlySlots(month)
      .then((slots) => active && setMonthlySlots(slots))
      .catch((error) => {
        console.error("Failed to fetch monthly bookings:", error);
        if (active) setMonthlySlots([]);
      });
    return () => {
      active = false;
    };
  }, [month]);

  const bookedDates = useMemo(() => {
    const unique = new Set(monthlySlots.map((slot) => slot.date));
    return [...unique].map((date) => dayjs(date).toDate());
  }, [monthlySlots]);

  // Slots already reserved for the currently selected day.
  const bookedSlots = useMemo(() => {
    if (!calendarValue) return [];
    return monthlySlots
      .filter((slot) => slot.date === calendarValue)
      .map((slot) => slot.time);
  }, [monthlySlots, calendarValue]);

  const isFullyBooked = isDayFullyBooked(bookedSlots);

  const selectedDate = calendarValue ? dayjs(calendarValue).toDate() : undefined;
  const maxDate = dayjs().add(BOOKING_WINDOW_DAYS, "day").toDate();

  // Only past and out-of-window days are blocked in the calendar. Days with one
  // free slot stay selectable, and fully booked days stay selectable too so the
  // user sees both time buttons disabled along with an explanatory message.
  const isDateDisabled = (date: Date) => date < new Date() || date > maxDate;

  const handleDateSelect = (date: Date | undefined) => {
    setCalendarValue(date ? toDateKey(date) : null);
  };

  // Drop a previously chosen time if it becomes unavailable for the new day.
  useEffect(() => {
    if (timeValue && bookedSlots.includes(timeValue)) {
      setTimeValue(null);
    }
  }, [bookedSlots, timeValue, setTimeValue]);

  return (
    <PageBg image="balcony">
    <div className="flex flex-col h-full pt-6 sm:pt-8">
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
            disabled={isDateDisabled}
            showOutsideDays={false}
            modifiers={{ hasBooking: bookedDates }}
            modifiersStyles={{
              hasBooking: { textDecoration: "underline", textDecorationColor: "#e8854a", textUnderlineOffset: "4px", textDecorationThickness: "2px" },
            }}
          />
        </div>

        {isFullyBooked && (
          <div className="rounded-2xl bg-red-100 border border-red-300 p-3 flex items-start gap-2">
            <XCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs font-medium text-red-700 leading-relaxed">
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
          onClick={() => router.push("/client-info")}
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
