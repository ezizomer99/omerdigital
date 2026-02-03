import { put, del } from "@vercel/blob";
import { ProjectService } from "@/services/projectService";

/**
 * Upload an image to Vercel Blob storage and save reference to MongoDB
 *
 * @param file - The file to upload
 * @param projectId - The project ID to associate the image with
 * @param fileName - The desired filename
 * @param altText - Optional alt text for the image
 * @returns The public URL of the uploaded image
 */
export async function uploadProjectImage(
  file: File,
  projectId: number,
  fileName: string,
  altText?: string,
): Promise<string> {
  try {
    // Generate a unique path for the image
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
    await ProjectService.addProjectImage({
      id: nextId,
      project_id: projectId,
      image_url: blob.url,
      alt_text: altText || `Project ${projectId} screenshot`,
      order_index: nextOrderIndex,
    });

    return blob.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

/**
 * Delete an image from Vercel Blob storage
 *
 * @param url - The URL of the blob to delete
 */
export async function deleteProjectImage(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}

/**
 * Upload multiple images for a project
 *
 * @param files - Array of files to upload
 * @param projectId - The project ID to associate the images with
 * @returns Array of public URLs for the uploaded images
 */
export async function uploadMultipleImages(
  files: File[],
  projectId: number,
): Promise<string[]> {
  const urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const url = await uploadProjectImage(
      file,
      projectId,
      file.name,
      `Project ${projectId} image ${i + 1}`,
    );
    urls.push(url);
  }

  return urls;
}

// Usage example:
// const file = document.getElementById('fileInput').files[0];
// const url = await uploadProjectImage(file, 1, 'homepage-desktop.png', 'Homepage desktop view');
