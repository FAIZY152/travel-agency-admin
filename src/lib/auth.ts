import { jwtVerify, SignJWT } from "jose";

export const AUTH_COOKIE_NAME = "travel_agency_admin_token";
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24; // 1 day
export const AUTH_JWT_ALGORITHM = "HS256";

export type AdminJwtPayload = {
  role: "admin";
  email: string;
};

export function getJwtSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return process.env.JWT_SECRET;
}

export function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Admin credentials are not configured.");
  }

  return { email, password };
}

function getJwtSecretBytes() {
  return new TextEncoder().encode(getJwtSecret());
}

export async function signAdminToken(payload: AdminJwtPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: AUTH_JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(`${AUTH_COOKIE_MAX_AGE}s`)
    .sign(getJwtSecretBytes());
}

export async function verifyAdminToken(token: string) {
  const { payload } = await jwtVerify(token, getJwtSecretBytes(), {
    algorithms: [AUTH_JWT_ALGORITHM],
  });

  if (payload.role !== "admin" || typeof payload.email !== "string") {
    throw new Error("Invalid admin token payload.");
  }

  return {
    role: "admin" as const,
    email: payload.email,
  };
}
