import { supabase, type Project } from '@/lib/supabase'

export class ProjectService {
  // Get all projects
  static async getAllProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching projects:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in getAllProjects:', error)
      return []
    }
  }

  // Get featured projects
  static async getFeaturedProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching featured projects:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in getFeaturedProjects:', error)
      return []
    }
  }

  // Get project by ID
  static async getProjectById(id: number): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching project:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in getProjectById:', error)
      return null
    }
  }

  // Get project images
  static async getProjectImages(projectId: number) {
    try {
      const { data, error } = await supabase
        .from('project_images')
        .select('*')
        .eq('project_id', projectId)
        .order('order_index', { ascending: true })

      if (error) {
        console.error('Error fetching project images:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in getProjectImages:', error)
      return []
    }
  }
}
