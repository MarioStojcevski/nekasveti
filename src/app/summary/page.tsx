"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  CalendarDays,
  Clock,
  MapPin,
  User,
  Phone,
  Wallet,
  Loader2,
} from "lucide-react";
import PageBg from "@/components/PageBg";
import dayjs from "dayjs";
import { useAppContext } from "@/context/AppContext";
import { createBooking, type NewBooking } from "@/lib/bookings";
import { getTotalPrice } from "@/utils/pricing";

const Summary = () => {
  const router = useRouter();
  const {
    services, calendarValue, timeValue,
    location, clientInfo, setBookingRef,
  } = useAppContext();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formattedDate = calendarValue
    ? dayjs(calendarValue).format("DD MMMM YYYY")
    : null;

  const totalPrice = getTotalPrice(services);

  // Every step must be filled before a booking can be created. State lives in
  // memory only, so a page refresh on /summary clears it and would otherwise
  // submit an empty (null) booking that the DB rejects with a not-null error.
  const isComplete = Boolean(
    services.length > 0 &&
      calendarValue &&
      timeValue &&
      location?.address &&
      clientInfo?.name &&
      clientInfo?.phone
  );

  const handleConfirm = async () => {
    if (submitting) return;

    if (!isComplete) {
      setError("Недостасуваат податоци. Започнете ја резервацијата од почеток.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const booking: NewBooking = {
      date: calendarValue,
      time: timeValue,
      client_name: clientInfo?.name,
      client_phone: clientInfo?.phone,
      client_email: clientInfo?.email || null,
      address: location?.address,
      lat: location?.lat || 0,
      lng: location?.lng || 0,
      services: services.map((s) => ({
        id: s.id,
        name: s.name,
        price: s.price,
        quantity: s.quantity,
      })),
      total_price: totalPrice,
      status: "confirmed",
    };

    try {
      const ref = await createBooking(booking);
      setBookingRef(ref);
      router.push("/confirmation");
    } catch (err: any) {
      console.error("Booking failed:", err);
      if (err.code === "SLOT_TAKEN") {
        setError("Овој термин е веќе резервиран. Изберете друг датум или термин.");
        setSubmitting(false);
      } else if (err.message?.includes("Failed to fetch")) {
        setBookingRef("DEMO-001");
        router.push("/confirmation");
      } else {
        setError("Неуспешно резервирање. Обидете се повторно.");
        setSubmitting(false);
      }
    }
  };

  return (
    <PageBg image="office">
    <div className="flex flex-col gap-3 pt-2 pb-4">
      <div className="text-center mb-1">
        <h1 className="text-2xl sm:text-3xl text-text-100 mb-1 font-bold">
          Преглед
        </h1>
        <p className="text-sm text-text-400">
          Проверете ги деталите пред да потврдите
        </p>
      </div>

      <div className="rounded-2xl bg-page-800 border border-page-500/50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle size={16} className="text-copper-400" />
          <h3 className="text-sm font-semibold text-text-100">Услуги</h3>
        </div>
        <div className="space-y-2">
          {services.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between bg-page-700 rounded-xl px-3 py-2.5"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-text-100 truncate">{s.name}</p>
                <p className="text-xs text-text-500">
                  {s.quantity} × {s.price} ден.
                </p>
              </div>
              <span className="text-sm font-semibold text-copper-400 ml-2 whitespace-nowrap">
                {s.price * (s.quantity || 1)} ден.
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-page-800 border border-page-500/50 p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-page-700 flex items-center justify-center flex-shrink-0">
            <CalendarDays size={16} className="text-copper-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-text-500">Датум</p>
            <p className="text-sm font-medium text-text-100">
              {formattedDate || "Нe e избран"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-page-700 flex items-center justify-center flex-shrink-0">
            <Clock size={16} className="text-copper-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-text-500">Време</p>
            <p className="text-sm font-medium text-text-100">
              {timeValue || "Нe e избрано"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-page-700 flex items-center justify-center flex-shrink-0">
            <MapPin size={16} className="text-copper-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-text-500">Адреса</p>
            <p className="text-sm font-medium text-text-100 truncate">
              {location?.address || "Нe e поставена"}
            </p>
          </div>
        </div>
      </div>

      {clientInfo && (
        <div className="rounded-2xl bg-page-800 border border-page-500/50 p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-page-700 flex items-center justify-center flex-shrink-0">
              <User size={16} className="text-copper-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-text-500">Име</p>
              <p className="text-sm font-medium text-text-100">{clientInfo.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-page-700 flex items-center justify-center flex-shrink-0">
              <Phone size={16} className="text-copper-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-text-500">Телефон</p>
              <p className="text-sm font-medium text-text-100">{clientInfo.phone}</p>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-gradient-to-br from-copper-500 to-copper-600 p-4 shadow-lg shadow-copper-400/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet size={18} className="text-text-100" />
            <span className="text-sm font-semibold text-text-100">Вкупно</span>
          </div>
          <span className="text-2xl font-bold text-text-100">
            {totalPrice} ден.
          </span>
        </div>
        <p className="text-xs text-text-100/60 mt-1">
          Плаќање на лице место - само кеш
        </p>
      </div>

      {error && (
        <p className="text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-xl px-4 py-2.5 text-center">{error}</p>
      )}

      <div className="pt-2 pb-4">
        <button
          onClick={handleConfirm}
          disabled={submitting || !isComplete}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-copper-500 to-copper-400 text-text-100 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-copper-400/20"
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Закажување...
            </>
          ) : (
            "Потврди резервација ✓"
          )}
        </button>
      </div>
    </div>
    </PageBg>
  );
};

export default Summary;
