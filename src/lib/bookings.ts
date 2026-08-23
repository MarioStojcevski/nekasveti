import dayjs from "dayjs";
import { supabase } from "./supabase";
import type { Booking, NewBooking, BookingStatus } from "../types";
import { toDateKey } from "../utils/date";

export type { NewBooking };

const TABLE = "bookings";

/** A single occupied calendar slot (date + time range). */
export type BookingSlot = Pick<Booking, "date" | "time">;

export type SortField = "date" | "created_at";

/**
 * Reduce a stored date to a plain `YYYY-MM-DD` key. The `date` column may be
 * returned as a date (`"2026-06-15"`) or a timestamp
 * (`"2026-06-15T00:00:00+00:00"`); slicing the first 10 chars normalizes both
 * without timezone drift so it can be compared to the selected day.
 */
const toDateOnly = (value: string): string => String(value).slice(0, 10);

/** All booked slots within the month of the given date (read, anon key). */
export const fetchMonthlySlots = async (month: Date): Promise<BookingSlot[]> => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("date, time")
    .gte("date", toDateKey(dayjs(month).startOf("month")))
    .lte("date", toDateKey(dayjs(month).endOf("month")));

  if (error) throw error;
  return (data ?? []).map((slot) => ({
    date: toDateOnly(slot.date),
    time: slot.time,
  }));
};

/**
 * Create a booking through the server API. The route validates the payload,
 * holds the slot atomically, and uses a server-only key — so the write never
 * depends on browser-side credentials.
 */
export const createBooking = async (booking: NewBooking): Promise<string | null> => {
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data?.error || "Booking failed") as Error & { code?: string };
    error.code = data?.code;
    throw error;
  }

  return data?.ref ?? null;
};

/** Every booking, sorted by the given field/direction (admin view, server-side). */
export const fetchAllBookings = async (
  sortField: SortField,
  ascending: boolean
): Promise<Booking[]> => {
  const params = new URLSearchParams({ sort: sortField, asc: ascending ? "1" : "0" });
  const res = await fetch(`/api/admin/bookings?${params}`);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
};

/** Update a booking's status (admin, server-side). */
export const updateBookingStatus = async (
  id: string,
  status: BookingStatus
): Promise<void> => {
  const res = await fetch("/api/admin/bookings", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  if (!res.ok) throw new Error("Failed to update status");
};
