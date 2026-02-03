import mongoose from "mongoose";

// MongoDB connection URI from environment variable
const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  console.warn(
    "MONGODB_URI is not set. Please set it in your environment variables.",
  );
}

// Global variable to cache the connection in development
declare global {
  // eslint-disable-next-line no-var
  var mongoose:
    | {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
      }
    | undefined;
}

let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Connect to MongoDB
 * Uses cached connection in development to prevent multiple connections
 */
export async function connectToDatabase(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// =============================================================================
// SCHEMAS
// =============================================================================

// Project Schema
const projectSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  long_description: { type: String },
  category: { type: String, required: true },
  tech: [{ type: String }],
  image_url: { type: String },
  project_url: { type: String },
  github_url: { type: String },
  featured: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Project Image Schema
const projectImageSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  project_id: { type: Number, required: true, ref: "Project" },
  image_url: { type: String, required: true },
  alt_text: { type: String },
  order_index: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

// Indexes
projectSchema.index({ featured: 1 });
projectSchema.index({ category: 1 });
projectImageSchema.index({ project_id: 1 });

// =============================================================================
// MODELS
// =============================================================================

// Use existing models if they exist (for hot module replacement in development)
export const ProjectModel =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
export const ProjectImageModel =
  mongoose.models.ProjectImage ||
  mongoose.model("ProjectImage", projectImageSchema);

// =============================================================================
// TYPES
// =============================================================================

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

// Helper type for creating projects (without auto-generated fields)
export interface CreateProjectInput {
  id?: number;
  title: string;
  description: string;
  long_description?: string;
  category: string;
  tech: string[];
  image_url?: string;
  project_url?: string;
  github_url?: string;
  featured?: boolean;
}

export interface CreateProjectImageInput {
  id?: number;
  project_id: number;
  image_url: string;
  alt_text?: string;
  order_index?: number;
}
