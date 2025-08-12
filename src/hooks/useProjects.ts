import { useState, useEffect } from 'react'
import { ProjectService } from '@/services/projectService'
import { type Project } from '@/lib/supabase'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await ProjectService.getAllProjects()
      setProjects(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch projects')
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return { projects, loading, error, refetch: fetchProjects }
}

export function useProject(id: number) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        const data = await ProjectService.getProjectById(id)
        setProject(data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch project')
        console.error('Error fetching project:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProject()
    }
  }, [id])

  return { project, loading, error }
}

export function useFeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setLoading(true)
        const data = await ProjectService.getFeaturedProjects()
        setProjects(data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch featured projects')
        console.error('Error fetching featured projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProjects()
  }, [])

  return { projects, loading, error }
}
