import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const adminUser = process.env.ADMIN_USERNAME || "admin";
  const adminPass = process.env.ADMIN_PASSWORD || "admin";

  if (body.username === adminUser && body.password === adminPass) {
    return NextResponse.json({ ok: true, username: body.username });
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}
