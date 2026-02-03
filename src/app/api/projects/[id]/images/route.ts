import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@/services/projectService";

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
