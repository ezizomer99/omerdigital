import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const ADMIN_COOKIE_NAME = "admin_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Generate a simple session token
 */
function generateSessionToken(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}_${random}`;
}

/**
 * Verify admin password and create session
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error("ADMIN_PASSWORD environment variable is not set");
    return false;
  }

  return password === adminPassword;
}

/**
 * Create admin session cookie
 */
export async function createAdminSession(): Promise<string> {
  const cookieStore = await cookies();
  const token = generateSessionToken();

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_DURATION / 1000, // maxAge is in seconds
    path: "/",
  });

  return token;
}

/**
 * Check if admin session is valid (for server components)
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);

  // Just check if the cookie exists and has a value
  // For a simple personal site, this is sufficient
  return !!session?.value;
}

/**
 * Check if admin session is valid from request (for API routes)
 */
export function isAdminAuthenticatedFromRequest(request: NextRequest): boolean {
  const session = request.cookies.get(ADMIN_COOKIE_NAME);
  return !!session?.value;
}

/**
 * Clear admin session
 */
export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
