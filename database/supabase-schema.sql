-- Supabase Database Schema for Portfolio Projects

-- Enable RLS (Row Level Security)
-- This ensures data security

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    category VARCHAR(100) NOT NULL,
    tech TEXT[] NOT NULL, -- Array of technologies
    image_url TEXT,
    project_url TEXT,
    github_url TEXT,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Images Table (for multiple images per project)
CREATE TABLE IF NOT EXISTS project_images (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on project_images" ON project_images FOR SELECT USING (true);

-- Insert sample data (Farsund Grappling project)
INSERT INTO projects (
    title, 
    description, 
    long_description,
    category, 
    tech, 
    project_url, 
    featured
) VALUES (
    'Farsund Grappling',
    'Komplett nettside for kampsportsklubb med CMS integrasjon, treningskalender og medlemsområde',
    'Dette prosjektet omfattet utvikling av en fullstendig nettside for Farsund Grappling klubb. Nettsiden inkluderer en moderne design med animasjoner, treningskalender, medlemsområde og Sanity CMS integrasjon som gjør det enkelt for instruktørene å oppdatere innhold selv.',
    'Webutvikling',
    ARRAY['Next.js', 'TypeScript', 'Framer Motion', 'Sanity CMS', 'Tailwind CSS'],
    'https://farsundgrappling.com',
    true
);

-- Insert more sample projects
INSERT INTO projects (
    title, 
    description, 
    category, 
    tech, 
    featured
) VALUES 
(
    'Digital Portefølje',
    'Moderne porteføljenettside med animasjoner og responsivt design',
    'Webutvikling',
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    true
),
(
    'E-handel Løsning',
    'Fullstack nettbutikk med betalingsintegrasjon og admin dashboard',
    'Webutvikling',
    ARRAY['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    false
),
(
    'Digital Strategi Konsultasjon',
    'Komplett digital transformasjonsstrategi for små og mellomstore bedrifter',
    'Konsultasjon',
    ARRAY['Strategi', 'Analyse', 'Implementering', 'Optimalisering'],
    false
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_order ON project_images(project_id, order_index);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
