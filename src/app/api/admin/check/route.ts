import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function GET(): Promise<NextResponse> {
  try {
    const authenticated = await isAdminAuthenticated();
    return NextResponse.json({ authenticated });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ authenticated: false });
  }
}
