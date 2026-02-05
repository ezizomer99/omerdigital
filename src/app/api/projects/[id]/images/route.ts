import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@/services/projectService";
import { isAdminAuthenticatedFromRequest } from "@/lib/adminAuth";
import { put, del } from "@vercel/blob";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

    const images = await ProjectService.getProjectImages(id);
    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching project images:", error);
    return NextResponse.json(
      { error: "Failed to fetch project images" },
      { status: 500 },
    );
  }
}

// POST - Upload a new image to Vercel Blob and save reference to MongoDB
export async function POST(request: NextRequest, { params }: Params) {
  // Check admin authentication
  if (!isAdminAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const resolvedParams = await params;
    const projectId = parseInt(resolvedParams.id);

    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const altText = formData.get("alt_text") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Generate a unique path for the image
    const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const path = `projects/${projectId}/${Date.now()}-${fileName}`;

    // Upload to Vercel Blob storage
    const blob = await put(path, file, {
      access: "public",
      addRandomSuffix: false,
    });

    // Get the next order index for the project images
    const existingImages = await ProjectService.getProjectImages(projectId);
    const nextOrderIndex = existingImages.length;

    // Get the next available image ID
    const nextId =
      existingImages.length > 0
        ? Math.max(...existingImages.map((img) => img.id)) + 1
        : 1;

    // Save to MongoDB
    const image = await ProjectService.addProjectImage({
      id: nextId,
      project_id: projectId,
      image_url: blob.url,
      alt_text: altText || `Project ${projectId} screenshot`,
      order_index: nextOrderIndex,
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error("Error uploading project image:", error);
    return NextResponse.json(
      { error: "Failed to upload project image" },
      { status: 500 },
    );
  }
}

// DELETE - Remove an image from a project
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
    const projectId = parseInt(resolvedParams.id);

    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

    const { searchParams } = new URL(request.url);
    const imageId = parseInt(searchParams.get("imageId") || "");
    const imageUrl = searchParams.get("imageUrl");

    if (isNaN(imageId)) {
      return NextResponse.json(
        { error: "Invalid image ID" },
        { status: 400 },
      );
    }

    // Delete from Vercel Blob if URL is provided
    if (imageUrl && imageUrl.includes("blob.vercel-storage.com")) {
      try {
        await del(imageUrl);
      } catch (blobError) {
        console.error("Error deleting from Vercel Blob:", blobError);
        // Continue with database deletion even if blob deletion fails
      }
    }

    // Delete from MongoDB
    const deleted = await ProjectService.deleteProjectImage(projectId, imageId);

    if (!deleted) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project image:", error);
    return NextResponse.json(
      { error: "Failed to delete project image" },
      { status: 500 },
    );
  }
}
