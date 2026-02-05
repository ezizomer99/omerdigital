import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticatedFromRequest } from "@/lib/adminAuth";

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Check admin authentication
  if (!isAdminAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
          ],
          maximumSizeInBytes: 10 * 1024 * 1024, // 10MB max
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // This callback only works in production (Vercel)
        // For local development, the client calls /api/images/save directly
        console.log("Upload completed:", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 },
    );
  }
}
