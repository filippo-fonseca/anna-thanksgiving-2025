import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "anna_site_auth";
const PRIVATE_CACHE_CONTROL = "no-store, max-age=0";

function bytesToHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqual(left: string, right: string) {
  if (left.length !== right.length) {
    return false;
  }

  let result = 0;
  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return result === 0;
}

async function sign(expiresAt: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(expiresAt)
  );

  return bytesToHex(signature);
}

async function isAuthenticated(request: NextRequest) {
  const secret = process.env.ANNA_AUTH_SECRET;
  const token = request.cookies.get(AUTH_COOKIE)?.value;

  if (!secret || !token) {
    return false;
  }

  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature || Number(expiresAt) <= Date.now() / 1000) {
    return false;
  }

  return constantTimeEqual(signature, await sign(expiresAt, secret));
}

export async function proxy(request: NextRequest) {
  if (await isAuthenticated(request)) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", PRIVATE_CACHE_CONTROL);
    return response;
  }

  const response = NextResponse.redirect(new URL("/unlock", request.url));
  response.headers.set("Cache-Control", PRIVATE_CACHE_CONTROL);
  return response;
}

export const config = {
  matcher: ["/((?!unlock/?$|api/auth$|favicon.ico$).*)"],
};
