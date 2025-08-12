import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (will be extended as we add more tables)
export interface Project {
  id: number
  title: string
  description: string
  long_description?: string
  category: string
  tech: string[]
  image_url?: string
  project_url?: string
  github_url?: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface ProjectImage {
  id: number
  project_id: number
  image_url: string
  alt_text?: string
  order_index: number
  created_at: string
}
