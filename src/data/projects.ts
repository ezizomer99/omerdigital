export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  link?: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-handel Plattform",
    description: "Moderne React/Next.js nettbutikk med Stripe integrasjon og admin dashboard",
    image: "/images/project1.jpg",
    tech: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    link: "https://example.com",
    category: "Webutvikling"
  },
  {
    id: 2,
    title: "SaaS Dashboard",
    description: "Analyse dashboard for SaaS bedrifter med sanntids datavisualisering",
    image: "/images/project2.jpg",
    tech: ["React", "TypeScript", "Chart.js", "Node.js"],
    link: "https://example.com",
    category: "Webutvikling"
  },
  {
    id: 3,
    title: "Digital Strategi Konsultasjon",
    description: "Komplett digital transformasjonsstrategi for et tradisjonelt detaljhandelsselskap",
    image: "/images/project3.jpg",
    tech: ["Strategi", "Analyse", "Implementering"],
    category: "Konsultasjon"
  },
  {
    id: 4,
    title: "Mobilapp Utvikling",
    description: "Kryssplattform mobilapplikasjon med React Native",
    image: "/images/project4.jpg",
    tech: ["React Native", "TypeScript", "Firebase"],
    link: "https://example.com",
    category: "Mobilutvikling"
  },
  {
    id: 5,
    title: "Merkevare Nettside Redesign",
    description: "Komplett nettside redesign med fokus på brukeropplevelse og konvertering",
    image: "/images/project5.jpg",
    tech: ["Next.js", "Framer Motion", "Vercel"],
    link: "https://example.com",
    category: "Webutvikling"
  },
  {
    id: 6,
    title: "API Utvikling",
    description: "RESTful API utvikling med dokumentasjon og testsuite",
    image: "/images/project6.jpg",
    tech: ["Node.js", "Express", "PostgreSQL", "Docker"],
    category: "Backend Utvikling"
  }
];
