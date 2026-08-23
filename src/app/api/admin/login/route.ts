import { NextResponse } from "next/server";
import { logError } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (!adminUser || !adminPass) {
    logError("POST /api/admin/login", "ADMIN_USERNAME and ADMIN_PASSWORD env vars are not set");
    return NextResponse.json({ ok: false, error: "Server misconfiguration" }, { status: 500 });
  }

  if (body.username === adminUser && body.password === adminPass) {
    return NextResponse.json({ ok: true, username: body.username });
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}
