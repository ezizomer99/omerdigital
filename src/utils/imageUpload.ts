import { supabase } from '@/lib/supabase'

// Function to upload image and get URL
export async function uploadProjectImage(file: File, projectId: number, fileName: string) {
  try {
    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(`project-${projectId}/${fileName}`, file)

    if (uploadError) {
      throw uploadError
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(uploadData.path)

    // Insert into database
    const { error: dbError } = await supabase
      .from('project_images')
      .insert({
        project_id: projectId,
        image_url: urlData.publicUrl,
        alt_text: `Project ${projectId} screenshot`,
        order_index: 0
      })

    if (dbError) {
      throw dbError
    }

    return urlData.publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

// Usage example:
// const file = // your file input
// const url = await uploadProjectImage(file, 1, 'homepage-desktop.png')
