import { NextResponse } from "next/server";
import { ProjectService } from "@/services/projectService";

// POST - Save an uploaded image reference to MongoDB
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { projectId, imageUrl, altText } = body;

    if (!projectId || !imageUrl) {
      return NextResponse.json(
        { error: "Missing projectId or imageUrl" },
        { status: 400 },
      );
    }

    // Get existing images to determine order and next ID
    const existingImages = await ProjectService.getProjectImages(projectId);
    const nextOrderIndex = existingImages.length;
    const nextId =
      existingImages.length > 0
        ? Math.max(...existingImages.map((img) => img.id)) + 1
        : 1;

    // Save to MongoDB
    const image = await ProjectService.addProjectImage({
      id: nextId,
      project_id: projectId,
      image_url: imageUrl,
      alt_text: altText || `Project ${projectId} screenshot`,
      order_index: nextOrderIndex,
    });

    if (!image) {
      return NextResponse.json(
        { error: "Failed to save image to database" },
        { status: 500 },
      );
    }

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error("Error saving image:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to save image",
      },
      { status: 500 },
    );
  }
}
