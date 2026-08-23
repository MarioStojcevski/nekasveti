import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { logError } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    logError("GET /api/products — Supabase query failed", error, {
      table: "products",
      operation: "select",
    });
    return NextResponse.json({ error: error.message, details: error.details, hint: error.hint }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch (err) {
    logError("POST /api/products — Invalid JSON body", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, price, sort_order, image_url } = body as Record<string, unknown>;

  if (!name || typeof name !== "string") {
    logError("POST /api/products — Validation failed", "'name' is required and must be a string", { body });
    return NextResponse.json({ error: "name is required" }, { status: 422 });
  }
  if (typeof price !== "number" || price <= 0) {
    logError("POST /api/products — Validation failed", "'price' must be a positive number", { name, price, body });
    return NextResponse.json({ error: "price must be positive" }, { status: 422 });
  }

  const { data, error } = await supabaseAdmin
    .from("products")
    .insert({ name, price, sort_order: sort_order ?? 0, image_url: image_url ?? null })
    .select()
    .single();

  if (error) {
    logError("POST /api/products — Insert failed", error, {
      table: "products",
      operation: "insert",
      payload: { name, price, sort_order },
    });
    return NextResponse.json({ error: error.message, details: error.details, hint: error.hint }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch (err) {
    logError("PATCH /api/products — Invalid JSON body", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { id, ...updates } = body as Record<string, unknown>;

  if (!id || typeof id !== "string") {
    logError("PATCH /api/products — Validation failed", "'id' is required", { body });
    return NextResponse.json({ error: "id is required" }, { status: 422 });
  }

  const { error } = await supabaseAdmin
    .from("products")
    .update(updates)
    .eq("id", id);

  if (error) {
    logError("PATCH /api/products — Update failed", error, {
      table: "products",
      operation: "update",
      id,
      updates,
    });
    return NextResponse.json({ error: error.message, details: error.details, hint: error.hint }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch (err) {
    logError("DELETE /api/products — Invalid JSON body", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { id } = body as Record<string, unknown>;

  if (!id || typeof id !== "string") {
    logError("DELETE /api/products — Validation failed", "'id' is required", { body });
    return NextResponse.json({ error: "id is required" }, { status: 422 });
  }

  const { error } = await supabaseAdmin.from("products").delete().eq("id", id);

  if (error) {
    logError("DELETE /api/products — Delete failed", error, {
      table: "products",
      operation: "delete",
      id,
    });
    return NextResponse.json({ error: error.message, details: error.details, hint: error.hint }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
