import { createHmac, createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

const AUTH_COOKIE = "anna_site_auth";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;
const PRIVATE_CACHE_CONTROL = "no-store, max-age=0";

function getPassword() {
  return process.env.ANNA_SITE_PASSWORD ?? "";
}

function getSecret() {
  return process.env.ANNA_AUTH_SECRET ?? "";
}

function hasUsableSecret(secret: string) {
  return secret.length >= 32;
}

function secureCompare(left: string, right: string) {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

function signSession(expiresAt: string) {
  return createHmac("sha256", getSecret()).update(expiresAt).digest("hex");
}

function redirectWithNoStore(url: URL) {
  const response = NextResponse.redirect(url, 303);
  response.headers.set("Cache-Control", PRIVATE_CACHE_CONTROL);
  return response;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const submittedPassword = String(formData.get("password") ?? "");
  const password = getPassword();
  const secret = getSecret();

  if (
    !password ||
    !hasUsableSecret(secret) ||
    !secureCompare(submittedPassword, password)
  ) {
    return redirectWithNoStore(new URL("/unlock?error=1", request.url));
  }

  const expiresAt = String(Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS);
  const token = `${expiresAt}.${signSession(expiresAt)}`;
  const response = redirectWithNoStore(new URL("/", request.url));

  response.cookies.set({
    name: AUTH_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });

  return response;
}
