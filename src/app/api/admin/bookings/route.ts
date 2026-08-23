import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { logError } from "@/lib/logger";
import type { Booking, BookingStatus } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SortField = "date" | "created_at";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sortField = (searchParams.get("sort") as SortField) || "created_at";
  const ascending = searchParams.get("asc") === "1";

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .order(sortField, { ascending });

  if (error) {
    logError("GET /api/admin/bookings — Query failed", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function PATCH(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch (err) {
    logError("PATCH /api/admin/bookings — Invalid JSON body", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { id, status } = body as { id?: string; status?: BookingStatus };

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "id is required" }, { status: 422 });
  }
  if (!status || !["confirmed", "completed", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "valid status is required" }, { status: 422 });
  }

  const { error } = await supabaseAdmin
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (error) {
    logError("PATCH /api/admin/bookings — Update failed", error, { id, status });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
