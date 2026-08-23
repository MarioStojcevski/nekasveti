import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { logError } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    logError("GET /api/gallery — Query failed", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch (err) {
    logError("POST /api/gallery — Invalid JSON body", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { image_url, sort_order } = body as Record<string, unknown>;

  if (!image_url || typeof image_url !== "string") {
    return NextResponse.json({ error: "image_url is required" }, { status: 422 });
  }

  const { data, error } = await supabaseAdmin
    .from("gallery_images")
    .insert({ image_url, sort_order: sort_order ?? 0 })
    .select()
    .single();

  if (error) {
    logError("POST /api/gallery — Insert failed", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch (err) {
    logError("PATCH /api/gallery — Invalid JSON body", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { id, sort_order } = body as Record<string, unknown>;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "id is required" }, { status: 422 });
  }

  const updates: Record<string, unknown> = {};
  if (typeof sort_order === "number") updates.sort_order = sort_order;

  const { error } = await supabaseAdmin
    .from("gallery_images")
    .update(updates)
    .eq("id", id);

  if (error) {
    logError("PATCH /api/gallery — Update failed", error, { id });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch (err) {
    logError("DELETE /api/gallery — Invalid JSON body", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { id } = body as Record<string, unknown>;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "id is required" }, { status: 422 });
  }

  const { error } = await supabaseAdmin
    .from("gallery_images")
    .delete()
    .eq("id", id);

  if (error) {
    logError("DELETE /api/gallery — Delete failed", error, { id });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
