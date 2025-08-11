export interface Service {
  id: number;
  name: string;
  description: string;
  features: string[];
  icon: string;
}

export const services: Service[] = [
  {
    id: 1,
    name: "Webutvikling",
    description: "Tilpassede webapplikasjoner bygget med moderne teknologier og beste praksis",
    features: [
      "React/Next.js Applikasjoner",
      "TypeScript Utvikling",
      "Responsivt Design",
      "Ytelsesoptimalisering",
      "SEO Implementering"
    ],
    icon: "💻"
  },
  {
    id: 2,
    name: "Digital Strategi",
    description: "Strategisk planlegging og konsultasjon for digitale transformasjonsinitiativer",
    features: [
      "Digital Transformasjonsplanlegging",
      "Teknologistakk Vurdering",
      "Brukeropplevelse Strategi",
      "Vekststrategi Utvikling",
      "Konkurranseanalyse"
    ],
    icon: "📈"
  },
  {
    id: 3,
    name: "Konsultasjon",
    description: "Ekspert veiledning på tekniske beslutninger og prosjektimplementering",
    features: [
      "Teknisk Arkitektur Gjennomgang",
      "Kodekvalitet Vurdering",
      "Team Opplæring & Mentoring",
      "Prosjektplanlegging",
      "Teknologivalg"
    ],
    icon: "🎯"
  }
];

export interface Skill {
  name: string;
  category: string;
  level: number; // 1-5
}

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "Frontend", level: 5 },
  { name: "Next.js", category: "Frontend", level: 5 },
  { name: "TypeScript", category: "Frontend", level: 5 },
  { name: "Tailwind CSS", category: "Frontend", level: 5 },
  { name: "JavaScript", category: "Frontend", level: 5 },
  
  // Backend
  { name: "Node.js", category: "Backend", level: 4 },
  { name: "Express", category: "Backend", level: 4 },
  { name: "PostgreSQL", category: "Backend", level: 4 },
  { name: "MongoDB", category: "Backend", level: 3 },
  
  // Tools & Others
  { name: "Git", category: "Verktøy", level: 5 },
  { name: "Docker", category: "Verktøy", level: 3 },
  { name: "AWS", category: "Verktøy", level: 3 },
  { name: "Vercel", category: "Verktøy", level: 5 },
];
