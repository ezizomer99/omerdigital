import {
  connectToDatabase,
  ProjectModel,
  ProjectImageModel,
  type Project,
  type ProjectImage,
} from "@/lib/mongodb";

export class ProjectService {
  // Get all projects
  static async getAllProjects(): Promise<Project[]> {
    try {
      await connectToDatabase();
      const projects = await ProjectModel.find({})
        .sort({ created_at: -1 })
        .lean();

      return projects.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        long_description: p.long_description,
        category: p.category,
        tech: p.tech || [],
        image_url: p.image_url,
        project_url: p.project_url,
        github_url: p.github_url,
        featured: p.featured || false,
        created_at: p.created_at?.toISOString() || new Date().toISOString(),
        updated_at: p.updated_at?.toISOString() || new Date().toISOString(),
      })) as Project[];
    } catch (error) {
      console.error("Error in getAllProjects:", error);
      return [];
    }
  }

  // Get featured projects
  static async getFeaturedProjects(): Promise<Project[]> {
    try {
      await connectToDatabase();
      const projects = await ProjectModel.find({ featured: true })
        .sort({ created_at: -1 })
        .lean();

      return projects.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        long_description: p.long_description,
        category: p.category,
        tech: p.tech || [],
        image_url: p.image_url,
        project_url: p.project_url,
        github_url: p.github_url,
        featured: p.featured || false,
        created_at: p.created_at?.toISOString() || new Date().toISOString(),
        updated_at: p.updated_at?.toISOString() || new Date().toISOString(),
      })) as Project[];
    } catch (error) {
      console.error("Error in getFeaturedProjects:", error);
      return [];
    }
  }

  // Get project by ID
  static async getProjectById(id: number): Promise<Project | null> {
    try {
      await connectToDatabase();
      const project = await ProjectModel.findOne({ id }).lean();

      if (!project) {
        return null;
      }

      return {
        id: project.id,
        title: project.title,
        description: project.description,
        long_description: project.long_description,
        category: project.category,
        tech: project.tech || [],
        image_url: project.image_url,
        project_url: project.project_url,
        github_url: project.github_url,
        featured: project.featured || false,
        created_at:
          project.created_at?.toISOString() || new Date().toISOString(),
        updated_at:
          project.updated_at?.toISOString() || new Date().toISOString(),
      } as Project;
    } catch (error) {
      console.error("Error in getProjectById:", error);
      return null;
    }
  }

  // Get project images
  static async getProjectImages(projectId: number): Promise<ProjectImage[]> {
    try {
      await connectToDatabase();
      const images = await ProjectImageModel.find({ project_id: projectId })
        .sort({ order_index: 1 })
        .lean();

      return images.map((img) => ({
        id: img.id,
        project_id: img.project_id,
        image_url: img.image_url,
        alt_text: img.alt_text,
        order_index: img.order_index || 0,
        created_at: img.created_at?.toISOString() || new Date().toISOString(),
      })) as ProjectImage[];
    } catch (error) {
      console.error("Error in getProjectImages:", error);
      return [];
    }
  }

  // Create a new project
  static async createProject(
    projectData: Omit<Project, "created_at" | "updated_at">,
  ): Promise<Project | null> {
    try {
      await connectToDatabase();
      const project = new ProjectModel({
        ...projectData,
        created_at: new Date(),
        updated_at: new Date(),
      });
      await project.save();

      return {
        id: project.id,
        title: project.title,
        description: project.description,
        long_description: project.long_description,
        category: project.category,
        tech: project.tech || [],
        image_url: project.image_url,
        project_url: project.project_url,
        github_url: project.github_url,
        featured: project.featured || false,
        created_at:
          project.created_at?.toISOString() || new Date().toISOString(),
        updated_at:
          project.updated_at?.toISOString() || new Date().toISOString(),
      } as Project;
    } catch (error) {
      console.error("Error in createProject:", error);
      return null;
    }
  }

  // Update a project
  static async updateProject(
    id: number,
    updates: Partial<Project>,
  ): Promise<Project | null> {
    try {
      await connectToDatabase();
      const project = await ProjectModel.findOneAndUpdate(
        { id },
        { ...updates, updated_at: new Date() },
        { new: true },
      ).lean();

      if (!project) {
        return null;
      }

      return {
        id: project.id,
        title: project.title,
        description: project.description,
        long_description: project.long_description,
        category: project.category,
        tech: project.tech || [],
        image_url: project.image_url,
        project_url: project.project_url,
        github_url: project.github_url,
        featured: project.featured || false,
        created_at:
          project.created_at?.toISOString() || new Date().toISOString(),
        updated_at:
          project.updated_at?.toISOString() || new Date().toISOString(),
      } as Project;
    } catch (error) {
      console.error("Error in updateProject:", error);
      return null;
    }
  }

  // Delete a project
  static async deleteProject(id: number): Promise<boolean> {
    try {
      await connectToDatabase();
      const result = await ProjectModel.deleteOne({ id });
      // Also delete associated images
      await ProjectImageModel.deleteMany({ project_id: id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error("Error in deleteProject:", error);
      return false;
    }
  }

  // Add image to project
  static async addProjectImage(
    imageData: Omit<ProjectImage, "created_at">,
  ): Promise<ProjectImage | null> {
    try {
      await connectToDatabase();
      const image = new ProjectImageModel({
        ...imageData,
        created_at: new Date(),
      });
      await image.save();

      return {
        id: image.id,
        project_id: image.project_id,
        image_url: image.image_url,
        alt_text: image.alt_text,
        order_index: image.order_index || 0,
        created_at: image.created_at?.toISOString() || new Date().toISOString(),
      } as ProjectImage;
    } catch (error) {
      console.error("Error in addProjectImage:", error);
      return null;
    }
  }
}
