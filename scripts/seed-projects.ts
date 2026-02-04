import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set in .env.local");
  process.exit(1);
}

// Project Schema (must match the one in mongodb.ts)
const projectSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  long_description: { type: String },
  category: { type: String, required: true },
  tech: [{ type: String }],
  image_url: { type: String },
  project_url: { type: String },
  featured: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const ProjectModel =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

// Projects to seed
const projects = [
  {
    id: 1,
    title: "Farsund Grappling",
    description:
      "Moderne nettside for en brasiliansk jiu-jitsu klubb med treningsplaner, instruktørprofiler og medlemsinformasjon.",
    long_description: `Beskrivelse

En moderne og brukervennlig nettside for Farsund Grappling Club, en brasiliansk jiu-jitsu klubb i Farsund.

Nettsiden gir klubben en profesjonell tilstedeværelse på nett hvor besøkende enkelt kan finne informasjon om treninger, se hvem instruktørene er, og lese om medlemskap og priser.

Klubbens ledere kan selv oppdatere innholdet på nettsiden – som treningstider, nyheter og instruktørprofiler – uten teknisk kunnskap. Alt administreres gjennom et enkelt innloggingspanel.

Nettsiden er designet for å fungere like godt på mobil som på PC, med raske lastetider og et rent, moderne utseende som reflekterer klubbens identitet.`,
    category: "Webutvikling",
    tech: [
      "Next.js 16",
      "TypeScript",
      "Material-UI",
      "Framer Motion",
      "Payload CMS",
      "MongoDB",
      "Vercel",
    ],
    image_url: "", // Add screenshot URL later via Vercel Blob
    project_url: "https://www.farsundgrappling.com/",
    featured: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function seedProjects() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    for (const project of projects) {
      // Check if project already exists
      const existingProject = await ProjectModel.findOne({ id: project.id });

      if (existingProject) {
        console.log(`Project "${project.title}" already exists, updating...`);
        await ProjectModel.updateOne({ id: project.id }, project);
        console.log(`✅ Updated: ${project.title}`);
      } else {
        await ProjectModel.create(project);
        console.log(`✅ Created: ${project.title}`);
      }
    }

    console.log("\n🎉 Seeding completed successfully!");
    console.log(`Total projects: ${projects.length}`);
  } catch (error) {
    console.error("Error seeding projects:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seedProjects();
