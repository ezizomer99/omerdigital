"use client";

import { useState, useEffect } from "react";

// Types moved here to avoid importing from mongodb.ts on client side
export interface Project {
  id: number;
  title: string;
  description: string;
  long_description?: string;
  category: string;
  tech: string[];
  image_url?: string;
  project_url?: string;
  github_url?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectImage {
  id: number;
  project_id: number;
  image_url: string;
  alt_text?: string;
  order_index: number;
  created_at: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch projects");
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, refetch: fetchProjects };
}

export function useProject(id: number) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }
        const data = await response.json();
        setProject(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch project");
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  return { project, loading, error };
}

export function useFeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/projects/featured");
        if (!response.ok) {
          throw new Error("Failed to fetch featured projects");
        }
        const data = await response.json();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch featured projects");
        console.error("Error fetching featured projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return { projects, loading, error };
}

export function useProjectImages(projectId: number) {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${projectId}/images`);
        if (!response.ok) {
          throw new Error("Failed to fetch project images");
        }
        const data = await response.json();
        setImages(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch project images");
        console.error("Error fetching project images:", err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchImages();
    }
  }, [projectId]);

  return { images, loading, error };
}
