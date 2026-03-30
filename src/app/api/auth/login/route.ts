import { NextResponse } from "next/server";
import { z } from "zod";
import {
  AUTH_COOKIE_MAX_AGE,
  AUTH_COOKIE_NAME,
  getAdminCredentials,
  signAdminToken,
} from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Please enter a valid email and password." },
      { status: 400 },
    );
  }

  let adminEmail = "";
  let adminPassword = "";

  try {
    const credentials = getAdminCredentials();
    adminEmail = credentials.email;
    adminPassword = credentials.password;
  } catch {
    return NextResponse.json(
      { message: "Server auth credentials are not configured." },
      { status: 500 },
    );
  }

  const { email, password } = parsed.data;

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
  }

  const token = await signAdminToken({ role: "admin", email });
  const response = NextResponse.json({ message: "Logged in successfully." });

  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: AUTH_COOKIE_MAX_AGE,
    path: "/",
  });

  return response;
}
