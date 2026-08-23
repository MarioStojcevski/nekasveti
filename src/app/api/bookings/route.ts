import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendBookingConfirmation } from "@/lib/notifications";
import { logError } from "@/lib/logger";
import type { NewBooking } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isValidPayload = (b: unknown): b is NewBooking => {
  if (!b || typeof b !== "object") return false;
  const v = b as Record<string, unknown>;
  return (
    typeof v.date === "string" &&
    typeof v.time === "string" &&
    typeof v.client_name === "string" &&
    typeof v.client_phone === "string" &&
    typeof v.address === "string" &&
    Array.isArray(v.services) &&
    v.services.length > 0
  );
};

const slotTakenResponse = () =>
  NextResponse.json(
    { error: "Овој термин е веќе резервиран.", code: "SLOT_TAKEN" },
    { status: 409 }
  );

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch (err) {
    logError("POST /api/bookings — Invalid JSON body", err);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidPayload(payload)) {
    logError("POST /api/bookings — Validation failed", "Missing required fields", { payload });
    return NextResponse.json(
      { error: "Недостасуваат податоци за резервација." },
      { status: 422 }
    );
  }

  const booking: NewBooking = { ...payload, status: "confirmed" };

  const { data: existing } = await supabaseAdmin
    .from("bookings")
    .select("id")
    .eq("date", booking.date)
    .eq("time", booking.time)
    .maybeSingle();

  if (existing) return slotTakenResponse();

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .insert([booking])
    .select("ref")
    .single();

  if (error) {
    if (error.code === "23505") return slotTakenResponse();
    logError("POST /api/bookings — Insert failed", error, {
      table: "bookings",
      operation: "insert",
      payload: { date: booking.date, time: booking.time, client_name: booking.client_name },
    });
    return NextResponse.json({ error: "Неуспешно резервирање." }, { status: 500 });
  }

  const ref = data?.ref ?? null;
  await sendBookingConfirmation({ ...booking, ref: ref ?? "" });

  return NextResponse.json({ ref }, { status: 201 });
}
